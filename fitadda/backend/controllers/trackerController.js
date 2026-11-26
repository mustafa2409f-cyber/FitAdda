const User = require("../models/User");

const getWorkouts = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.workouts || []);
};

const createWorkout = async (req, res) => {
  const user = await User.findById(req.user._id);
  const item = { id: Date.now().toString(), ...req.body };
  user.workouts.unshift(item);
  await user.save();
  res.status(201).json(item);
};

const updateWorkout = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.workouts = user.workouts.map((w) => (w.id === req.params.id ? { ...w, ...req.body } : w));
  await user.save();
  res.json(req.body);
};

const deleteWorkout = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.workouts = user.workouts.filter((w) => w.id !== req.params.id);
  await user.save();
  res.json({ message: "Deleted" });
};

const getNutrition = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.meals || []);
};

const createNutrition = async (req, res) => {
  const user = await User.findById(req.user._id);
  const meal = { id: Date.now().toString(), ...req.body };
  user.meals.unshift(meal);
  await user.save();
  res.status(201).json(meal);
};

const deleteNutrition = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.meals = user.meals.filter((m) => m.id !== req.params.id);
  await user.save();
  res.json({ message: "Deleted" });
};

const getProgress = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    workouts: user.workouts || [],
    meals: user.meals || [],
    waterGlassesToday: user.waterGlassesToday || 0
  });
};

const createProgress = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
  res.status(201).json(user);
};

const getDashboard = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

const exportCsv = async (req, res) => {
  const user = await User.findById(req.user._id);
  const rows = ["type,name,calories"];
  (user.workouts || []).forEach((w) => rows.push(`workout,${w.title || "Workout"},${w.calories || 0}`));
  (user.meals || []).forEach((m) => rows.push(`meal,${m.name || "Meal"},${m.calories || 0}`));
  res.send(rows.join("\n"));
};

const submitSupport = async (req, res) => res.json({ message: "Support message received" });

module.exports = {
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
};