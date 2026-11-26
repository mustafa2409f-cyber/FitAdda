// Central FitAdda State: manages user profile, workouts, meals, hydration & streaks
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config/api";
import {
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_CHALLENGES,
  DEFAULT_FOOD_DIARY,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_PLANNED_MEALS,
  DEFAULT_USER_PROFILE,
  DEFAULT_WEEKLY_STATS,
  DEFAULT_WORKOUT_HISTORY,
  EXERCISES_LIBRARY
} from "../data/mockData";
import {
  getDefaultDiaryAndPlanForCountry,
  isSouthAsianCountry
} from "../utils/dietEngine";

const STORAGE_KEY = "fitadda_app_state_v1";

const syncTrackerToCloud = (payload) => {
  const token = localStorage.getItem("fitadda_token");
  if (!token) return;
  fetch(`${API_URL}/api/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }).catch(() => {});
};

const createInitialState = () => ({
  user: DEFAULT_USER_PROFILE,
  selectedExerciseIds: ["ex-b1", "ex-b3", "ex-b4"],
  favoriteExerciseIds: ["ex-b1", "ex-b4", "ex-m4"],
  plannedMeals: DEFAULT_PLANNED_MEALS,
  foodDiary: DEFAULT_FOOD_DIARY,
  waterGlasses: 5,
  todayBurnedCalories: 235,
  todayActiveMinutes: 25,
  workoutHistory: DEFAULT_WORKOUT_HISTORY,
  challenges: DEFAULT_CHALLENGES,
  thirtyDayCompletedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  achievements: DEFAULT_ACHIEVEMENTS,
  weeklyStats: DEFAULT_WEEKLY_STATS,
  notifications: DEFAULT_NOTIFICATIONS,
  mealSwapOffsets: {
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Snacks: 0
  }
});

const FitAddaContext = createContext(null);

const FitAddaProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const base = createInitialState();
        const validIds = new Set(EXERCISES_LIBRARY.map((e) => e.id));
        const filteredSelected = (parsed.selectedExerciseIds || []).filter(
          (id) => validIds.has(id)
        );
        const filteredFavs = (parsed.favoriteExerciseIds || []).filter(
          (id) => validIds.has(id)
        );
        const hydratedUser = {
          ...base.user,
          ...(parsed.user || {}),
          foodPreferences: {
            ...base.user.foodPreferences,
            ...(parsed.user?.foodPreferences || {})
          },
          notifications: {
            ...base.user.notifications,
            ...(parsed.user?.notifications || {})
          }
        };
        let hydratedDiary = parsed.foodDiary || base.foodDiary;
        let hydratedPlanned = parsed.plannedMeals || base.plannedMeals;
        if (hydratedUser.countryCode && !isSouthAsianCountry(hydratedUser.countryCode)) {
          const isLegacyDesiDiary =
            hydratedDiary.length === 3 &&
            hydratedDiary.some((d) => d.id === "diary-1" && d.name.includes("Masala Oats"));
          const isLegacyDesiPlan =
            hydratedPlanned.Breakfast?.includes("meal-1") &&
            hydratedPlanned.Lunch?.includes("meal-4");
          const countryDefaults = getDefaultDiaryAndPlanForCountry(
            hydratedUser.countryCode,
            hydratedUser.language || "en"
          );
          if (isLegacyDesiDiary) {
            hydratedDiary = countryDefaults.foodDiary;
          }
          if (isLegacyDesiPlan) {
            hydratedPlanned = countryDefaults.plannedMeals;
          }
          if (hydratedUser.mealPreference === "Desi Specials") {
            hydratedUser.mealPreference = "Balanced";
          }
        }
        return {
          ...base,
          ...parsed,
          foodDiary: hydratedDiary,
          plannedMeals: hydratedPlanned,
          selectedExerciseIds: filteredSelected.length > 0 ? filteredSelected : base.selectedExerciseIds,
          favoriteExerciseIds: filteredFavs.length > 0 ? filteredFavs : base.favoriteExerciseIds,
          mealSwapOffsets: {
            ...base.mealSwapOffsets,
            ...(parsed.mealSwapOffsets || {})
          },
          user: hydratedUser
        };
      }
    } catch {}
    return createInitialState();
  });

  const [celebration, setCelebration] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  useEffect(() => {
    const token = localStorage.getItem("fitadda_token");
    if (!token) return;
    fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((dbUser) => {
        if (!dbUser || !dbUser.email) return;
        setState((prev) => ({
          ...prev,
          waterGlasses: typeof dbUser.waterGlassesToday === "number" ? dbUser.waterGlassesToday : prev.waterGlasses,
          todayBurnedCalories:
            typeof dbUser.todayBurnedCalories === "number" && dbUser.todayBurnedCalories > 0
              ? dbUser.todayBurnedCalories
              : prev.todayBurnedCalories,
          todayActiveMinutes:
            typeof dbUser.todayActiveMinutes === "number" && dbUser.todayActiveMinutes > 0
              ? dbUser.todayActiveMinutes
              : prev.todayActiveMinutes,
          workoutHistory:
            Array.isArray(dbUser.workoutHistory) && dbUser.workoutHistory.length > 0
              ? dbUser.workoutHistory
              : prev.workoutHistory,
          foodDiary:
            Array.isArray(dbUser.foodDiary) && dbUser.foodDiary.length > 0
              ? dbUser.foodDiary
              : prev.foodDiary,
          thirtyDayCompletedDays:
            Array.isArray(dbUser.thirtyDayCompletedDays) && dbUser.thirtyDayCompletedDays.length > 0
              ? dbUser.thirtyDayCompletedDays
              : prev.thirtyDayCompletedDays,
          user: {
            ...prev.user,
            name: dbUser.name || prev.user.name,
            email: dbUser.email || prev.user.email,
            avatarUrl: typeof dbUser.avatarUrl === "string" ? dbUser.avatarUrl : prev.user.avatarUrl,
            gender: dbUser.gender || prev.user.gender,
            goal: dbUser.goal || prev.user.goal,
            activityLevel: dbUser.activityLevel || prev.user.activityLevel,
            countryCode: dbUser.countryCode || prev.user.countryCode,
            age: dbUser.age || prev.user.age,
            heightCm: dbUser.heightCm || prev.user.heightCm,
            weightKg: dbUser.weightKg || prev.user.weightKg,
            dailyCalorieTarget: dbUser.dailyCalorieTarget || prev.user.dailyCalorieTarget,
            dailyWaterTargetGlasses: dbUser.dailyWaterTargetGlasses || prev.user.dailyWaterTargetGlasses,
            dailyMoveMinutesTarget: dbUser.dailyMoveMinutesTarget || prev.user.dailyMoveMinutesTarget,
            onboarded: true
          }
        }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!celebration) return;
    const timer = window.setTimeout(() => setCelebration(null), 4200);
    return () => window.clearTimeout(timer);
  }, [celebration]);

  const triggerCelebration = (title, subtitle) => {
    if (!state.user.notifications.celebrationAnimations) return;
    setCelebration({ id: Date.now(), title, subtitle });
  };

  const dismissCelebration = () => setCelebration(null);

  const updateProfile = (patch) => {
    setState((prev) => {
      const nextCountry = patch.countryCode || prev.user.countryCode;
      const countryChanged = Boolean(patch.countryCode && patch.countryCode !== prev.user.countryCode);
      const nextLang = patch.language || prev.user.language;
      let nextMealPref = patch.mealPreference ?? prev.user.mealPreference;
      if (countryChanged) {
        nextMealPref = isSouthAsianCountry(nextCountry) ? "Desi Specials" : "Balanced";
      }
      let nextPlanned = prev.plannedMeals;
      let nextDiary = prev.foodDiary;
      if (countryChanged && nextCountry) {
        const defaults = getDefaultDiaryAndPlanForCountry(nextCountry, nextLang);
        nextPlanned = defaults.plannedMeals;
        const hasOnlySeedDiary = prev.foodDiary.every((e) => e.id.startsWith("diary-") && e.id.length <= 7);
        if (hasOnlySeedDiary) {
          nextDiary = defaults.foodDiary;
        }
      }
      return {
        ...prev,
        plannedMeals: nextPlanned,
        foodDiary: nextDiary,
        mealSwapOffsets: countryChanged ? { Breakfast: 0, Lunch: 0, Dinner: 0, Snacks: 0 } : prev.mealSwapOffsets,
        user: {
          ...prev.user,
          ...patch,
          mealPreference: nextMealPref,
          foodPreferences: patch.foodPreferences
            ? { ...prev.user.foodPreferences, ...patch.foodPreferences }
            : prev.user.foodPreferences
        }
      };
    });

    if (patch && patch.onboarded !== false) {
      syncTrackerToCloud(patch);
    }
  };

  const updateFoodPreferences = (patch) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        foodPreferences: {
          ...prev.user.foodPreferences,
          ...patch
        }
      }
    }));
  };

  const swapMealSlot = (category) => {
    setState((prev) => ({
      ...prev,
      mealSwapOffsets: {
        ...prev.mealSwapOffsets,
        [category]: (prev.mealSwapOffsets[category] || 0) + 1
      }
    }));
  };

  const resetMealSwaps = () => {
    setState((prev) => ({
      ...prev,
      mealSwapOffsets: {
        Breakfast: 0,
        Lunch: 0,
        Dinner: 0,
        Snacks: 0
      }
    }));
  };

  const completeOnboarding = (patch) => {
    setState((prev) => {
      const nextCountry = patch.countryCode || prev.user.countryCode || "PK";
      const nextLang = patch.language || prev.user.language || "en";
      const defaults = getDefaultDiaryAndPlanForCountry(nextCountry, nextLang);
      const nextMealPref = patch.mealPreference || (isSouthAsianCountry(nextCountry) ? "Desi Specials" : "Balanced");
      return {
        ...prev,
        plannedMeals: defaults.plannedMeals,
        foodDiary: defaults.foodDiary,
        mealSwapOffsets: {
          Breakfast: 0,
          Lunch: 0,
          Dinner: 0,
          Snacks: 0
        },
        user: {
          ...prev.user,
          ...patch,
          mealPreference: nextMealPref,
          foodPreferences: patch.foodPreferences
            ? { ...prev.user.foodPreferences, ...patch.foodPreferences }
            : prev.user.foodPreferences,
          onboarded: true
        }
      };
    });
  };

  const toggleFavoriteExercise = (id) => {
    setState((prev) => {
      const exists = prev.favoriteExerciseIds.includes(id);
      return {
        ...prev,
        favoriteExerciseIds: exists
          ? prev.favoriteExerciseIds.filter((x) => x !== id)
          : [...prev.favoriteExerciseIds, id]
      };
    });
  };

  const toggleSelectExercise = (id) => {
    setState((prev) => {
      const exists = prev.selectedExerciseIds.includes(id);
      return {
        ...prev,
        selectedExerciseIds: exists
          ? prev.selectedExerciseIds.filter((x) => x !== id)
          : [...prev.selectedExerciseIds, id]
      };
    });
  };

  const setSelectedExerciseIds = (ids) => {
    setState((prev) => ({ ...prev, selectedExerciseIds: ids }));
  };

  const completeWorkout = (exerciseIds, durationMin, mood, celebrationTitle = "Shabash!", celebrationSubtitle = "") => {
    const exercises = EXERCISES_LIBRARY.filter((ex) => exerciseIds.includes(ex.id));
    const burned = exercises.reduce((sum, ex) => sum + ex.calories, 0) || Math.max(85, durationMin * 7);
    const categories = Array.from(new Set(exercises.map((ex) => ex.category))).slice(0, 2).join(" & ") || "Full Body";
    const newLog = {
      id: `log-${Date.now()}`,
      title: `${categories} (${exercises.length})`,
      date: "Today",
      durationMin,
      calories: burned,
      exercisesCount: exercises.length,
      category: categories,
      mood
    };
    setState((prev) => {
      const nextBurned = prev.todayBurnedCalories + burned;
      const nextMinutes = prev.todayActiveMinutes + durationMin;
      const nextHistory = [newLog, ...prev.workoutHistory];

      syncTrackerToCloud({
        todayBurnedCalories: nextBurned,
        todayActiveMinutes: nextMinutes,
        workoutHistory: nextHistory
      });

      const updatedWeekly = prev.weeklyStats.map((d, idx) =>
        idx === prev.weeklyStats.length - 1
          ? {
              ...d,
              minutes: d.minutes + durationMin,
              caloriesBurned: d.caloriesBurned + burned,
              workouts: d.workouts + 1
            }
          : d
      );
      const updatedChallenges = prev.challenges.map((c) => {
        if (c.id === "ch-weekly-1") {
          const nextProg = Math.min(c.target, c.progress + 1);
          return { ...c, progress: nextProg, completed: nextProg >= c.target };
        }
        if (c.id === "ch-weekly-2") {
          const nextProg = Math.min(c.target, c.progress + durationMin);
          return { ...c, progress: nextProg, completed: nextProg >= c.target };
        }
        return c;
      });
      const updatedAchievements = prev.achievements.map((a) =>
        a.id === "ach-4" ? { ...a, unlocked: true, unlockedDate: "Today", progressText: "4 / 4" } : a
      );
      return {
        ...prev,
        todayBurnedCalories: nextBurned,
        todayActiveMinutes: nextMinutes,
        workoutHistory: nextHistory,
        weeklyStats: updatedWeekly,
        challenges: updatedChallenges,
        achievements: updatedAchievements
      };
    });
    triggerCelebration(celebrationTitle, celebrationSubtitle || `${exercises.length} · ${burned} kcal`);
  };

  const addMealToPlan = (mealId, category, toastTitle = "Meal Added") => {
    setState((prev) => {
      const existing = prev.plannedMeals[category] || [];
      if (existing.includes(mealId)) return prev;
      return {
        ...prev,
        plannedMeals: {
          ...prev.plannedMeals,
          [category]: [...existing, mealId]
        }
      };
    });
    triggerCelebration(toastTitle, category);
  };

  const removeMealFromPlan = (mealId, category) => {
    setState((prev) => ({
      ...prev,
      plannedMeals: {
        ...prev.plannedMeals,
        [category]: (prev.plannedMeals[category] || []).filter((id) => id !== mealId)
      }
    }));
  };

  const logMealToDiary = (meal, resolvedName, toastTitle = "Food Logged") => {
    const nowLabel = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const entry = {
      id: `diary-${Date.now()}`,
      name: resolvedName,
      category: meal.category,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      time: nowLabel,
      serving: "1 serving"
    };
    setState((prev) => {
      const nextDiary = [entry, ...prev.foodDiary];
      syncTrackerToCloud({ foodDiary: nextDiary });
      return {
        ...prev,
        foodDiary: nextDiary
      };
    });
    triggerCelebration(toastTitle, `${resolvedName} (${meal.calories} kcal)`);
  };

  const logSmartMealToDiary = (meal, resolvedName, resolvedServing, toastTitle = "Food Logged") => {
    const nowLabel = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const entry = {
      id: `diary-${Date.now()}`,
      name: resolvedName,
      category: meal.category,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      time: nowLabel,
      serving: resolvedServing
    };
    setState((prev) => {
      const nextDiary = [entry, ...prev.foodDiary];
      syncTrackerToCloud({ foodDiary: nextDiary });
      return {
        ...prev,
        foodDiary: nextDiary
      };
    });
    triggerCelebration(toastTitle, `${resolvedName} (${meal.calories} kcal)`);
  };

  const addCustomDiaryEntry = (entry, toastTitle = "Food Logged") => {
    const newEntry = {
      ...entry,
      id: `diary-${Date.now()}`
    };
    setState((prev) => {
      const nextDiary = [newEntry, ...prev.foodDiary];
      syncTrackerToCloud({ foodDiary: nextDiary });
      return {
        ...prev,
        foodDiary: nextDiary
      };
    });
    triggerCelebration(toastTitle, entry.name);
  };

  const removeDiaryEntry = (id) => {
    setState((prev) => {
      const nextDiary = prev.foodDiary.filter((e) => e.id !== id);
      syncTrackerToCloud({ foodDiary: nextDiary });
      return {
        ...prev,
        foodDiary: nextDiary
      };
    });
  };

  const adjustWater = (delta) => {
    setState((prev) => {
      const next = Math.max(0, Math.min(16, prev.waterGlasses + delta));
      const updatedChallenges = prev.challenges.map((c) =>
        c.id === "ch-daily-1" ? { ...c, progress: Math.min(c.target, next), completed: next >= c.target } : c
      );
      if (next >= prev.user.dailyWaterTargetGlasses && prev.waterGlasses < prev.user.dailyWaterTargetGlasses) {
        triggerCelebration("Hydration Hero!", `${next} / ${prev.user.dailyWaterTargetGlasses}`);
      }
      syncTrackerToCloud({ waterGlassesToday: next });
      return {
        ...prev,
        waterGlasses: next,
        challenges: updatedChallenges
      };
    });
  };

  const toggleChallengeProgress = (challengeId, resolvedTitle = "Challenge") => {
    setState((prev) => {
      let didComplete = false;
      const updated = prev.challenges.map((c) => {
        if (c.id !== challengeId) return c;
        const nextCompleted = !c.completed;
        if (nextCompleted) didComplete = true;
        return {
          ...c,
          completed: nextCompleted,
          progress: nextCompleted ? c.target : Math.max(0, c.target - 1)
        };
      });
      if (didComplete) {
        triggerCelebration("Shabash!", resolvedTitle);
      }
      return { ...prev, challenges: updated };
    });
  };

  const toggleThirtyDay = (dayNumber) => {
    setState((prev) => {
      const exists = prev.thirtyDayCompletedDays.includes(dayNumber);
      const nextDays = exists
        ? prev.thirtyDayCompletedDays.filter((d) => d !== dayNumber)
        : [...prev.thirtyDayCompletedDays, dayNumber].sort((a, b) => a - b);
      syncTrackerToCloud({ thirtyDayCompletedDays: nextDays });
      const updatedAchievements = prev.achievements.map((a) =>
        a.id === "ach-6"
          ? {
              ...a,
              unlocked: nextDays.length >= 15,
              unlockedDate: nextDays.length >= 15 ? "Today" : a.unlockedDate,
              progressText: `${Math.min(15, nextDays.length)} / 15`
            }
          : a
      );
      if (!exists) {
        triggerCelebration(`Day ${dayNumber}`, "15 / 30");
      }
      return {
        ...prev,
        thirtyDayCompletedDays: nextDays,
        achievements: updatedAchievements
      };
    });
  };

  const markAllNotificationsRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true }))
    }));
  };

  const resetOnboarding = () => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, onboarded: false }
    }));
  };

  const logoutUser = () => {
    localStorage.removeItem("fitadda_token");
    localStorage.removeItem(STORAGE_KEY);
    setState(createInitialState());
  };

  const resetDemoData = (toastTitle = "Refreshed!") => {
    const fresh = createInitialState();
    const country = state.user.countryCode || "PK";
    const defaults = getDefaultDiaryAndPlanForCountry(country, state.user.language || "en");
    fresh.plannedMeals = defaults.plannedMeals;
    fresh.foodDiary = defaults.foodDiary;
    fresh.user = {
      ...state.user,
      onboarded: true
    };
    setState(fresh);
    triggerCelebration(toastTitle, "FitAdda");
  };

  return (
    <FitAddaContext.Provider
      value={{
        ...state,
        celebration,
        dismissCelebration,
        triggerCelebration,
        updateProfile,
        updateFoodPreferences,
        swapMealSlot,
        resetMealSwaps,
        completeOnboarding,
        toggleFavoriteExercise,
        toggleSelectExercise,
        setSelectedExerciseIds,
        completeWorkout,
        addMealToPlan,
        removeMealFromPlan,
        logMealToDiary,
        logSmartMealToDiary,
        addCustomDiaryEntry,
        removeDiaryEntry,
        adjustWater,
        toggleChallengeProgress,
        toggleThirtyDay,
        markAllNotificationsRead,
        resetOnboarding,
        logoutUser,
        resetDemoData
      }}
    >
      {children}
    </FitAddaContext.Provider>
  );
};

const useFitAdda = () => {
  const ctx = useContext(FitAddaContext);
  if (!ctx) throw new Error("useFitAdda must be used within FitAddaProvider");
  return ctx;
};

export { FitAddaProvider, useFitAdda };