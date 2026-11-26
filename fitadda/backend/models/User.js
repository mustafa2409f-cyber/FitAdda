const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    gender: { type: String, default: "men" },
    goal: { type: String, default: "stay_active" },
    activityLevel: { type: String, default: "beginner" },
    countryCode: { type: String, default: "PK" },
    language: { type: String, default: "en" },
    age: { type: Number, default: 24 },
    heightCm: { type: Number, default: 172 },
    weightKg: { type: Number, default: 68 },
    dailyCalorieTarget: { type: Number, default: 2000 },
    dailyWaterTargetGlasses: { type: Number, default: 8 },
    dailyMoveMinutesTarget: { type: Number, default: 30 },
    waterGlassesToday: { type: Number, default: 0 },
    todayBurnedCalories: { type: Number, default: 0 },
    todayActiveMinutes: { type: Number, default: 0 },
    workoutHistory: { type: Array, default: [] },
    foodDiary: { type: Array, default: [] },
    thirtyDayCompletedDays: { type: Array, default: [] },
    workouts: { type: Array, default: [] },
    meals: { type: Array, default: [] },
    resetCode: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);