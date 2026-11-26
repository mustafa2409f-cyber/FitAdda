// Workout & Challenge Catalog: guided exercises, challenges & badge milestones
import { FITADDA_ASSETS } from "./assets";
const DEFAULT_USER_PROFILE = {
  name: "",
  language: "en",
  countryCode: "",
  gender: "women",
  goal: "stay_active",
  activityLevel: "beginner",
  mealPreference: "Desi Specials",
  foodPreferences: {
    dietType: "any",
    allergies: [],
    customAllergies: [],
    dislikedFoods: [],
    religiousRestriction: "none",
    budget: "affordable",
    cookingStyle: "both",
    preferInternational: false
  },
  age: 25,
  heightCm: 168,
  weightKg: 64,
  dailyCalorieTarget: 1950,
  dailyWaterTargetGlasses: 8,
  dailyMoveMinutesTarget: 30,
  dailyBurnTarget: 320,
  weeklyWorkoutTarget: 4,
  onboarded: false,
  theme: "light",
  notifications: {
    supportiveReminders: true,
    waterNudges: true,
    celebrationAnimations: true,
    weeklyDigest: true
  }
};
const EXERCISES_LIBRARY = [
  // ================= BEGINNER LEVEL =================
  {
    id: "ex-b1",
    titleKey: "workouts.items.ex-b1",
    category: "Cardio",
    difficulty: "Beginner",
    animationPose: "march",
    sets: 3,
    reps: "45 sec",
    durationSec: 45,
    restSec: 20,
    calories: 55,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenCardio,
    imageMen: FITADDA_ASSETS.workoutMenCardio,
    beginnerFriendly: true
  },
  {
    id: "ex-b2",
    titleKey: "workouts.items.ex-b2",
    category: "Arms",
    difficulty: "Beginner",
    animationPose: "arm_circles",
    sets: 3,
    reps: "12 each way",
    durationSec: 40,
    restSec: 20,
    calories: 38,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenStrength,
    imageMen: FITADDA_ASSETS.workoutMenStrength,
    beginnerFriendly: true
  },
  {
    id: "ex-b3",
    titleKey: "workouts.items.ex-b3",
    category: "Chest",
    difficulty: "Beginner",
    animationPose: "wall_pushup",
    sets: 3,
    reps: "8–12",
    durationSec: 45,
    restSec: 25,
    calories: 48,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenWalk,
    imageMen: FITADDA_ASSETS.workoutMenWalk,
    beginnerFriendly: true
  },
  {
    id: "ex-b4",
    titleKey: "workouts.items.ex-b4",
    category: "Legs",
    difficulty: "Beginner",
    animationPose: "squat",
    sets: 3,
    reps: "10–12",
    durationSec: 45,
    restSec: 25,
    calories: 62,
    equipmentKey: "workouts.equipment.bodyweight",
    imageWomen: FITADDA_ASSETS.workoutWomenLegsBack,
    imageMen: FITADDA_ASSETS.workoutMenLegsBack,
    beginnerFriendly: true
  },
  {
    id: "ex-b5",
    titleKey: "workouts.items.ex-b5",
    category: "Full Body",
    difficulty: "Beginner",
    animationPose: "knee_raise",
    sets: 3,
    reps: "12 / side",
    durationSec: 45,
    restSec: 20,
    calories: 56,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenCardio,
    imageMen: FITADDA_ASSETS.workoutMenCardio,
    beginnerFriendly: true
  },
  {
    id: "ex-b6",
    titleKey: "workouts.items.ex-b6",
    category: "Back",
    difficulty: "Beginner",
    animationPose: "stretch",
    sets: 2,
    reps: "40 sec hold",
    durationSec: 40,
    restSec: 15,
    calories: 32,
    equipmentKey: "workouts.equipment.bodyweight",
    imageWomen: FITADDA_ASSETS.workoutWomenLegsBack,
    imageMen: FITADDA_ASSETS.workoutMenLegsBack,
    beginnerFriendly: true
  },
  {
    id: "ex-b7",
    titleKey: "workouts.items.ex-b7",
    category: "Cardio",
    difficulty: "Beginner",
    animationPose: "easy_walk",
    sets: 3,
    reps: "60 sec",
    durationSec: 60,
    restSec: 20,
    calories: 65,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenWalk,
    imageMen: FITADDA_ASSETS.workoutMenCardio,
    beginnerFriendly: true
  },
  // ================= MODERATE LEVEL =================
  {
    id: "ex-m1",
    titleKey: "workouts.items.ex-m1",
    category: "Back",
    difficulty: "Moderate",
    animationPose: "back_cobra",
    sets: 3,
    reps: "10–12",
    durationSec: 45,
    restSec: 20,
    calories: 52,
    equipmentKey: "workouts.equipment.bodyweight",
    imageWomen: FITADDA_ASSETS.workoutWomenLegsBack,
    imageMen: FITADDA_ASSETS.workoutMenLegsBack,
    beginnerFriendly: true
  },
  {
    id: "ex-m2",
    titleKey: "workouts.items.ex-m2",
    category: "Arms",
    difficulty: "Moderate",
    animationPose: "bicep_curl",
    sets: 3,
    reps: "12",
    durationSec: 45,
    restSec: 25,
    calories: 58,
    equipmentKey: "workouts.equipment.dumbbells",
    imageWomen: FITADDA_ASSETS.workoutWomenStrength,
    imageMen: FITADDA_ASSETS.workoutMenStrength,
    beginnerFriendly: true
  },
  {
    id: "ex-m3",
    titleKey: "workouts.items.ex-m3",
    category: "Legs",
    difficulty: "Moderate",
    animationPose: "lunge",
    sets: 3,
    reps: "10 / side",
    durationSec: 50,
    restSec: 25,
    calories: 72,
    equipmentKey: "workouts.equipment.dumbbells",
    imageWomen: FITADDA_ASSETS.workoutWomenLegsBack,
    imageMen: FITADDA_ASSETS.workoutMenLegsBack,
    beginnerFriendly: false
  },
  {
    id: "ex-m4",
    titleKey: "workouts.items.ex-m4",
    category: "Cardio",
    difficulty: "Moderate",
    animationPose: "bhangra_bounce",
    sets: 3,
    reps: "45 sec",
    durationSec: 45,
    restSec: 20,
    calories: 80,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenCardio,
    imageMen: FITADDA_ASSETS.workoutMenCardio,
    beginnerFriendly: true
  },
  // ================= ACTIVE LEVEL =================
  {
    id: "ex-a1",
    titleKey: "workouts.items.ex-a1",
    category: "Full Body",
    difficulty: "Active",
    animationPose: "sun_flow",
    sets: 3,
    reps: "8–10",
    durationSec: 50,
    restSec: 30,
    calories: 85,
    equipmentKey: "workouts.equipment.bodyweight",
    imageWomen: FITADDA_ASSETS.workoutWomenCardio,
    imageMen: FITADDA_ASSETS.workoutMenWalk,
    beginnerFriendly: false
  },
  {
    id: "ex-a2",
    titleKey: "workouts.items.ex-a2",
    category: "Chest",
    difficulty: "Active",
    animationPose: "chest_press",
    sets: 3,
    reps: "10–12",
    durationSec: 50,
    restSec: 30,
    calories: 74,
    equipmentKey: "workouts.equipment.dumbbells",
    imageWomen: FITADDA_ASSETS.workoutWomenStrength,
    imageMen: FITADDA_ASSETS.workoutMenStrength,
    beginnerFriendly: false
  },
  {
    id: "ex-a3",
    titleKey: "workouts.items.ex-a3",
    category: "Legs",
    difficulty: "Active",
    animationPose: "squat_knee",
    sets: 4,
    reps: "14–16",
    durationSec: 55,
    restSec: 25,
    calories: 94,
    equipmentKey: "workouts.equipment.none",
    imageWomen: FITADDA_ASSETS.workoutWomenLegsBack,
    imageMen: FITADDA_ASSETS.workoutMenCardio,
    beginnerFriendly: false
  }
];
function getExerciseImage(exercise, gender) {
  return gender === "men" ? exercise.imageMen : exercise.imageWomen;
}
const MEALS_LIBRARY = [
  {
    id: "meal-1",
    titleKey: "diet.meals.meal-1",
    category: "Breakfast",
    preference: "Desi Specials",
    isDesi: true,
    calories: 340,
    protein: 14,
    carbs: 52,
    fats: 8,
    fiber: 7,
    prepMinutes: 10,
    servingKey: "diet.meals.meal-1.serving",
    image: FITADDA_ASSETS.foodMasalaOatsChai
  },
  {
    id: "meal-2",
    titleKey: "diet.meals.meal-2",
    category: "Breakfast",
    preference: "High-Protein",
    isDesi: true,
    calories: 320,
    protein: 19,
    carbs: 40,
    fats: 9,
    fiber: 6,
    prepMinutes: 15,
    servingKey: "diet.meals.meal-2.serving",
    image: FITADDA_ASSETS.foodBesanChilla
  },
  {
    id: "meal-3",
    titleKey: "diet.meals.meal-3",
    category: "Breakfast",
    preference: "Balanced",
    isDesi: true,
    calories: 310,
    protein: 15,
    carbs: 38,
    fats: 11,
    fiber: 5,
    prepMinutes: 6,
    servingKey: "diet.meals.meal-3.serving",
    image: FITADDA_ASSETS.foodYogurtBerriesNuts
  },
  {
    id: "meal-4",
    titleKey: "diet.meals.meal-4",
    category: "Lunch",
    preference: "Desi Specials",
    isDesi: true,
    calories: 520,
    protein: 28,
    carbs: 58,
    fats: 18,
    fiber: 9,
    prepMinutes: 20,
    servingKey: "diet.meals.meal-4.serving",
    image: FITADDA_ASSETS.foodPaneerCurryRoti
  },
  {
    id: "meal-5",
    titleKey: "diet.meals.meal-5",
    category: "Lunch",
    preference: "High-Protein",
    isDesi: true,
    calories: 480,
    protein: 36,
    carbs: 44,
    fats: 15,
    fiber: 7,
    prepMinutes: 18,
    servingKey: "diet.meals.meal-5.serving",
    image: FITADDA_ASSETS.mealLunch
  },
  {
    id: "meal-6",
    titleKey: "diet.meals.meal-6",
    category: "Lunch",
    preference: "Plant-Forward",
    isDesi: true,
    calories: 440,
    protein: 17,
    carbs: 68,
    fats: 10,
    fiber: 11,
    prepMinutes: 15,
    servingKey: "diet.meals.meal-6.serving",
    image: FITADDA_ASSETS.foodChanaMasalaRice
  },
  {
    id: "meal-7",
    titleKey: "diet.meals.meal-7",
    category: "Dinner",
    preference: "Balanced",
    isDesi: false,
    calories: 460,
    protein: 34,
    carbs: 32,
    fats: 20,
    fiber: 6,
    prepMinutes: 22,
    servingKey: "diet.meals.meal-7.serving",
    image: FITADDA_ASSETS.mealDinner
  },
  {
    id: "meal-8",
    titleKey: "diet.meals.meal-8",
    category: "Dinner",
    preference: "Plant-Forward",
    isDesi: true,
    calories: 410,
    protein: 22,
    carbs: 46,
    fats: 14,
    fiber: 8,
    prepMinutes: 18,
    servingKey: "diet.meals.meal-8.serving",
    image: FITADDA_ASSETS.foodPalakTofuRoti
  },
  {
    id: "meal-9",
    titleKey: "diet.meals.meal-9",
    category: "Snacks",
    preference: "Desi Specials",
    isDesi: true,
    calories: 165,
    protein: 6,
    carbs: 18,
    fats: 8,
    fiber: 3,
    prepMinutes: 5,
    servingKey: "diet.meals.meal-9.serving",
    image: FITADDA_ASSETS.foodMakhanaAlmonds
  },
  {
    id: "meal-10",
    titleKey: "diet.meals.meal-10",
    category: "Snacks",
    preference: "Balanced",
    isDesi: true,
    calories: 180,
    protein: 7,
    carbs: 31,
    fats: 3,
    fiber: 5,
    prepMinutes: 5,
    servingKey: "diet.meals.meal-10.serving",
    image: FITADDA_ASSETS.foodFruitChaat
  }
];
const DEFAULT_PLANNED_MEALS = {
  Breakfast: ["meal-1"],
  Lunch: ["meal-4"],
  Dinner: ["meal-8"],
  Snacks: ["meal-9"]
};
const DEFAULT_FOOD_DIARY = [
  {
    id: "diary-1",
    name: "Masala Oats & Elaichi Chai",
    category: "Breakfast",
    calories: 340,
    protein: 14,
    carbs: 52,
    fats: 8,
    time: "08:30 AM",
    serving: "1 bowl + 1 cup"
  },
  {
    id: "diary-2",
    name: "Grilled Paneer Tikka & Daal Thali",
    category: "Lunch",
    calories: 520,
    protein: 28,
    carbs: 58,
    fats: 18,
    time: "01:15 PM",
    serving: "1 thali"
  },
  {
    id: "diary-3",
    name: "Roasted Makhana & Badam",
    category: "Snacks",
    calories: 165,
    protein: 6,
    carbs: 18,
    fats: 8,
    time: "05:00 PM",
    serving: "1 small bowl"
  }
];
const DEFAULT_WEEKLY_STATS = [
  { dayKey: "Mon", minutes: 25, caloriesBurned: 210, caloriesIntake: 1820, waterGlasses: 7, workouts: 1 },
  { dayKey: "Tue", minutes: 35, caloriesBurned: 295, caloriesIntake: 1910, waterGlasses: 8, workouts: 1 },
  { dayKey: "Wed", minutes: 15, caloriesBurned: 120, caloriesIntake: 1780, waterGlasses: 6, workouts: 0 },
  { dayKey: "Thu", minutes: 40, caloriesBurned: 340, caloriesIntake: 1960, waterGlasses: 8, workouts: 1 },
  { dayKey: "Fri", minutes: 30, caloriesBurned: 260, caloriesIntake: 1890, waterGlasses: 7, workouts: 1 },
  { dayKey: "Sat", minutes: 45, caloriesBurned: 380, caloriesIntake: 2010, waterGlasses: 9, workouts: 1 },
  { dayKey: "Sun", minutes: 20, caloriesBurned: 180, caloriesIntake: 1840, waterGlasses: 6, workouts: 1 }
];
const MONTHLY_PROGRESS_DATA = [
  { weekKey: "W1", minutes: 145, caloriesBurned: 1180 },
  { weekKey: "W2", minutes: 180, caloriesBurned: 1480 },
  { weekKey: "W3", minutes: 195, caloriesBurned: 1610 },
  { weekKey: "W4", minutes: 210, caloriesBurned: 1785 }
];
const DEFAULT_WORKOUT_HISTORY = [
  {
    id: "log-1",
    title: "Desi Bhangra Cardio Bounce",
    date: "Yesterday",
    durationMin: 20,
    calories: 175,
    exercisesCount: 3,
    category: "Cardio",
    mood: "Energized"
  },
  {
    id: "log-2",
    title: "Posture Superman & Cobra Flow",
    date: "2 days ago",
    durationMin: 25,
    calories: 190,
    exercisesCount: 4,
    category: "Back & Chest",
    mood: "Refreshed"
  },
  {
    id: "log-3",
    title: "Sunlit Wall & Floor Push-Ups",
    date: "4 days ago",
    durationMin: 30,
    calories: 240,
    exercisesCount: 4,
    category: "Full Body",
    mood: "Proud"
  }
];
const DEFAULT_CHALLENGES = [
  {
    id: "ch-daily-1",
    titleKey: "challenges.items.ch-daily-1.title",
    type: "daily",
    progress: 6,
    target: 8,
    unitKey: "challenges.items.ch-daily-1.unit",
    completed: false,
    rewardKey: "challenges.items.ch-daily-1.reward"
  },
  {
    id: "ch-daily-2",
    titleKey: "challenges.items.ch-daily-2.title",
    type: "daily",
    progress: 15,
    target: 15,
    unitKey: "challenges.items.ch-daily-2.unit",
    completed: true,
    rewardKey: "challenges.items.ch-daily-2.reward"
  },
  {
    id: "ch-weekly-1",
    titleKey: "challenges.items.ch-weekly-1.title",
    type: "weekly",
    progress: 2,
    target: 3,
    unitKey: "challenges.items.ch-weekly-1.unit",
    completed: false,
    rewardKey: "challenges.items.ch-weekly-1.reward"
  },
  {
    id: "ch-weekly-2",
    titleKey: "challenges.items.ch-weekly-2.title",
    type: "weekly",
    progress: 65,
    target: 90,
    unitKey: "challenges.items.ch-weekly-2.unit",
    completed: false,
    rewardKey: "challenges.items.ch-weekly-2.reward"
  }
];
const DEFAULT_ACHIEVEMENTS = [
  {
    id: "ach-1",
    titleKey: "challenges.badges.ach-1",
    icon: "sparkles",
    unlocked: true,
    unlockedDate: "May 04",
    progressText: "1 / 1"
  },
  {
    id: "ach-2",
    titleKey: "challenges.badges.ach-2",
    icon: "droplets",
    unlocked: true,
    unlockedDate: "May 09",
    progressText: "8 / 8"
  },
  {
    id: "ach-3",
    titleKey: "challenges.badges.ach-3",
    icon: "heart",
    unlocked: true,
    unlockedDate: "May 11",
    progressText: "5 / 5"
  },
  {
    id: "ach-4",
    titleKey: "challenges.badges.ach-4",
    icon: "flame",
    unlocked: false,
    progressText: "3 / 4"
  },
  {
    id: "ach-5",
    titleKey: "challenges.badges.ach-5",
    icon: "sun",
    unlocked: true,
    unlockedDate: "May 12",
    progressText: "3 / 3"
  },
  {
    id: "ach-6",
    titleKey: "challenges.badges.ach-6",
    icon: "trophy",
    unlocked: false,
    progressText: "11 / 15"
  }
];
const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    titleKey: "notifications.n1Title",
    bodyKey: "notifications.n1Body",
    timeLabel: "10m",
    read: false
  },
  {
    id: "notif-2",
    titleKey: "notifications.n2Title",
    bodyKey: "notifications.n2Body",
    timeLabel: "1h",
    read: false
  },
  {
    id: "notif-3",
    titleKey: "notifications.n3Title",
    bodyKey: "notifications.n3Body",
    timeLabel: "3h",
    read: true
  }
];
export {
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_CHALLENGES,
  DEFAULT_FOOD_DIARY,
  DEFAULT_NOTIFICATIONS,
  DEFAULT_PLANNED_MEALS,
  DEFAULT_USER_PROFILE,
  DEFAULT_WEEKLY_STATS,
  DEFAULT_WORKOUT_HISTORY,
  EXERCISES_LIBRARY,
  MEALS_LIBRARY,
  MONTHLY_PROGRESS_DATA,
  getExerciseImage
};
