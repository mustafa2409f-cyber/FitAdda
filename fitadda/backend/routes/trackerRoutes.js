const express = require("express");
const {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getNutrition,
  createNutrition,
  deleteNutrition,
  getProgress,
  createProgress,
  getDashboard,
  exportCsv,
  submitSupport
} = require("../controllers/trackerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/workouts", protect, getWorkouts);
router.post("/workouts", protect, createWorkout);
router.put("/workouts/:id", protect, updateWorkout);
router.delete("/workouts/:id", protect, deleteWorkout);

router.get("/nutrition", protect, getNutrition);
router.post("/nutrition", protect, createNutrition);
router.delete("/nutrition/:id", protect, deleteNutrition);

router.get("/progress", protect, getProgress);
router.post("/progress", protect, createProgress);

router.get("/dashboard", protect, getDashboard);
router.get("/export/csv", protect, exportCsv);
router.post("/support", submitSupport);

module.exports = router;