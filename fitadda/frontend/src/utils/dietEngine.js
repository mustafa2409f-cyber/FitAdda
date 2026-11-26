// Smart Diet Engine: filters daily meals by country, preferences, allergies & halal rules
import { SMART_MEALS_DATABASE } from "../data/smartMealsData";
const SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const SOUTH_ASIAN_COUNTRIES = /* @__PURE__ */ new Set(["PK", "IN", "BD"]);
function isSouthAsianCountry(countryCode) {
  if (!countryCode) return false;
  return SOUTH_ASIAN_COUNTRIES.has(countryCode.toUpperCase());
}
function isSouthAsianOnlyMeal(meal) {
  return !meal.regions.includes("INTL") && meal.regions.every((r) => SOUTH_ASIAN_COUNTRIES.has(r));
}
function getMealSearchableText(meal) {
  return [
    ...meal.tags,
    meal.names.en,
    meal.names.ur,
    meal.names.roman,
    meal.descriptions.en,
    meal.descriptions.ur,
    meal.descriptions.roman,
    ...meal.ingredients.en,
    ...meal.ingredients.ur,
    ...meal.ingredients.roman
  ].join(" ").toLowerCase();
}
function isMealSafeForUser(meal, user) {
  const fp = user.foodPreferences;
  const searchText = getMealSearchableText(meal);
  for (const allergen of fp.allergies) {
    if (meal.allergens.includes(allergen)) {
      return false;
    }
  }
  for (const custom of fp.customAllergies) {
    const clean = custom.trim().toLowerCase();
    if (!clean) continue;
    if (searchText.includes(clean)) return false;
  }
  if (fp.religiousRestriction === "halal" && !meal.isHalalFriendly) {
    return false;
  }
  if (fp.religiousRestriction === "vegetarian_mindful" && !meal.isVegetarian) {
    return false;
  }
  if (fp.religiousRestriction === "lactose_friendly" && meal.allergens.includes("dairy")) {
    return false;
  }
  if (fp.dietType === "vegetarian" && !meal.isVegetarian) {
    return false;
  }
  for (const dislike of fp.dislikedFoods) {
    const clean = dislike.trim().toLowerCase();
    if (!clean) continue;
    if (searchText.includes(clean)) return false;
  }
  return true;
}
function isMealCulturallyCompatible(meal, countryCode, preferInternational) {
  const country = (countryCode || "PK").toUpperCase();
  if (preferInternational) {
    if (isSouthAsianCountry(country)) {
      return meal.regions.includes("INTL") || !isSouthAsianOnlyMeal(meal);
    }
    return meal.regions.includes("INTL");
  }
  return meal.regions.includes(country) || meal.regions.includes("INTL");
}
function scoreMealForUser(meal, user, forceInternational) {
  let score = 0;
  const reasons = [];
  const fp = user.foodPreferences;
  const country = (user.countryCode || "PK").toUpperCase();
  if (forceInternational) {
    if (meal.regions.includes("INTL") && !meal.regions.includes(country)) {
      score += 50;
      reasons.push("diet.reasonInternational");
    } else if (meal.regions.includes("INTL")) {
      score += 30;
      reasons.push("diet.reasonInternational");
    }
  } else if (meal.regions.includes(country)) {
    score += 75;
    reasons.push("diet.reasonCountryMatch");
  } else if (meal.regions.includes("INTL")) {
    score += 18;
  }
  if (fp.dietType === "non_vegetarian" && !meal.isVegetarian) {
    score += 12;
  }
  if (fp.budget === "affordable") {
    if (meal.budget === "affordable") {
      score += 18;
      reasons.push("diet.reasonBudget");
    } else if (meal.budget === "moderate") {
      score += 6;
    }
  } else if (fp.budget === "moderate") {
    score += meal.budget === "moderate" || meal.budget === "affordable" ? 12 : 4;
  } else {
    score += 10;
  }
  if (fp.cookingStyle !== "both" && meal.cookingStyle === fp.cookingStyle) {
    score += 15;
    reasons.push(
      fp.cookingStyle === "quick" ? "diet.reasonQuickPrep" : "diet.reasonHomemade"
    );
  }
  const goal = user.goal;
  const activity = user.activityLevel;
  if (goal === "build_strength" || activity === "active") {
    score += Math.min(20, Math.round(meal.protein * 0.6));
    if (meal.protein >= 18) reasons.push("diet.reasonProteinSupport");
  } else if (goal === "improve_stamina") {
    score += Math.min(16, Math.round((meal.carbs + meal.protein) * 0.2));
  } else {
    score += meal.calories >= 130 && meal.calories <= 530 ? 12 : 5;
  }
  if (user.age >= 50 && meal.tags.includes("light")) {
    score += 8;
  }
  return { score, reasons: Array.from(new Set(reasons)) };
}
function getSmartMealRecommendations(user, swapOffsets = {}) {
  const result = {};
  const country = (user.countryCode || "PK").toUpperCase();
  const forceIntl = Boolean(user.foodPreferences.preferInternational);
  for (const slot of SLOTS) {
    const slotMeals = SMART_MEALS_DATABASE.filter((m) => m.category === slot);
    const culturalMeals = slotMeals.filter(
      (m) => isMealCulturallyCompatible(m, country, forceIntl)
    );
    const regionalPool = culturalMeals.length > 0 ? culturalMeals : slotMeals.filter((m) => m.regions.includes("INTL"));
    let safeMeals = regionalPool.filter((m) => isMealSafeForUser(m, user));
    let usedFallback = false;
    if (safeMeals.length === 0) {
      usedFallback = true;
      safeMeals = slotMeals.filter(
        (m) => m.regions.includes("INTL") && m.allergens.length === 0
      );
      if (safeMeals.length === 0) {
        safeMeals = regionalPool.filter((m) => m.allergens.length === 0);
      }
      if (safeMeals.length === 0) {
        safeMeals = regionalPool.length > 0 ? regionalPool.slice(0, 1) : slotMeals.slice(0, 1);
      }
    }
    const ranked = safeMeals.map((meal) => {
      const { score, reasons } = scoreMealForUser(meal, user, forceIntl);
      return { meal, score, reasons };
    }).sort((a, b) => b.score - a.score);
    const offset = Math.abs(swapOffsets[slot] || 0) % ranked.length;
    const chosen = ranked[offset];
    result[slot] = {
      meal: chosen.meal,
      alternativesCount: ranked.length,
      usedInternationalFallback: usedFallback || !forceIntl && !chosen.meal.regions.includes(country),
      reasonKeys: chosen.reasons.slice(0, 2)
    };
  }
  return result;
}
function getBrowseableMealsForUser(user, options = {}) {
  const country = (user.countryCode || "PK").toUpperCase();
  const forceIntl = Boolean(user.foodPreferences.preferInternational);
  let pool = SMART_MEALS_DATABASE.filter((meal) => {
    if (options.desiOnly) {
      return isSouthAsianOnlyMeal(meal) || meal.regions.some((r) => SOUTH_ASIAN_COUNTRIES.has(r));
    }
    if (options.localOnly) {
      return meal.regions.includes(country);
    }
    return isMealCulturallyCompatible(meal, country, forceIntl);
  });
  if (pool.length === 0) {
    pool = SMART_MEALS_DATABASE.filter((m) => m.regions.includes("INTL"));
  }
  const safePool = pool.filter((m) => isMealSafeForUser(m, user));
  const finalPool = safePool.length > 0 ? safePool : pool;
  return finalPool.map((meal) => ({
    meal,
    score: scoreMealForUser(meal, user, forceIntl).score
  })).sort((a, b) => b.score - a.score).map((item) => item.meal);
}
function getDefaultDiaryAndPlanForCountry(countryCode, language = "en") {
  const country = (countryCode || "PK").toUpperCase();
  const pickForSlot = (slot) => {
    const slotMeals = SMART_MEALS_DATABASE.filter((m) => m.category === slot);
    return slotMeals.find((m) => m.regions.includes(country)) || slotMeals.find((m) => m.regions.includes("INTL")) || slotMeals[0];
  };
  const b = pickForSlot("Breakfast");
  const l = pickForSlot("Lunch");
  const d = pickForSlot("Dinner");
  const s = pickForSlot("Snacks");
  return {
    plannedMeals: {
      Breakfast: [b.id],
      Lunch: [l.id],
      Dinner: [d.id],
      Snacks: [s.id]
    },
    foodDiary: [
      {
        id: "diary-1",
        name: b.names[language],
        category: "Breakfast",
        calories: b.calories,
        protein: b.protein,
        carbs: b.carbs,
        fats: b.fats,
        time: "08:30 AM",
        serving: b.serving[language]
      },
      {
        id: "diary-2",
        name: l.names[language],
        category: "Lunch",
        calories: l.calories,
        protein: l.protein,
        carbs: l.carbs,
        fats: l.fats,
        time: "01:15 PM",
        serving: l.serving[language]
      },
      {
        id: "diary-3",
        name: s.names[language],
        category: "Snacks",
        calories: s.calories,
        protein: s.protein,
        carbs: s.carbs,
        fats: s.fats,
        time: "05:00 PM",
        serving: s.serving[language]
      }
    ]
  };
}
export {
  getBrowseableMealsForUser,
  getDefaultDiaryAndPlanForCountry,
  getSmartMealRecommendations,
  isMealCulturallyCompatible,
  isMealSafeForUser,
  isSouthAsianCountry,
  isSouthAsianOnlyMeal
};
