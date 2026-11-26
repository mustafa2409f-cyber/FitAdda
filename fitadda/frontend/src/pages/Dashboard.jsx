import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  ArrowRight,
  Award,
  Droplets,
  Dumbbell,
  Flame,
  Heart,
  Minus,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Sun,
  Timer,
  Trophy
} from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getCulturalGreeting } from "../data/countries";
import { EXERCISES_LIBRARY, getExerciseImage } from "../data/mockData";
import { getSmartMealRecommendations, isSouthAsianCountry } from "../utils/dietEngine";
import { MilkMascot } from "../components/MilkMascot";
import { StatCard } from "../components/StatCard";
import { TiltCard } from "../components/TiltCard";
import { ProgressRing } from "../components/ProgressRing";
import { SafeImage } from "../components/SafeImage";
import { WorkoutTimerModal } from "../components/WorkoutTimerModal";
const BADGE_ICONS = {
  flame: Flame,
  heart: Heart,
  droplets: Droplets,
  trophy: Trophy,
  sparkles: Sparkles,
  sun: Sun
};
const Dashboard = () => {
  const navigate = useNavigate();
  const { t, tList, language } = useLanguage();
  const { theme } = useTheme();
  const {
    user,
    todayBurnedCalories,
    todayActiveMinutes,
    waterGlasses,
    adjustWater,
    foodDiary,
    weeklyStats,
    workoutHistory,
    achievements,
    mealSwapOffsets,
    swapMealSlot
  } = useFitAdda();
  const [timerOpen, setTimerOpen] = useState(false);
  const [modalExercises, setModalExercises] = useState([]);
  const greeting = getCulturalGreeting(user.countryCode, language);
  const quotes = tList("dashboard.motivationQuotes");
  const todayQuote = quotes[(/* @__PURE__ */ new Date()).getDate() % Math.max(1, quotes.length)] || t("brand.tagline");
  const diaryTotals = useMemo(
    () => foodDiary.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fats: acc.fats + item.fats
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    ),
    [foodDiary]
  );
  const recommendedExercises = useMemo(() => {
    const levelMatch = user.activityLevel === "beginner" ? EXERCISES_LIBRARY.filter((e) => e.beginnerFriendly) : EXERCISES_LIBRARY;
    return (levelMatch.length >= 2 ? levelMatch : EXERCISES_LIBRARY).slice(0, 2);
  }, [user.activityLevel]);
  const smartMeals = useMemo(
    () => getSmartMealRecommendations(user, mealSwapOffsets),
    [user, mealSwapOffsets]
  );
  const suggestedSlots = ["Breakfast", "Lunch"];
  const chartData = useMemo(
    () => weeklyStats.map((d) => ({
      day: t(`progress.daysShort.${d.dayKey}`),
      minutes: d.minutes,
      caloriesBurned: d.caloriesBurned
    })),
    [weeklyStats, t]
  );
  const handleStartSingle = (ex) => {
    setModalExercises([ex]);
    setTimerOpen(true);
  };
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6"
  >
      {
    /* Hero Greeting + Motivational Message + Cute Milk Mascot */
  }
      <section className="rounded-3xl border border-[#E5DDF7] dark:border-[#2E3340] bg-gradient-to-br from-white via-[#FAF7FF] to-[#F3EEFF] dark:from-[#181A20] dark:via-[#1B1E25] dark:to-[#1F222A] p-6 sm:p-7 shadow-[0_14px_34px_-16px_rgba(124,58,237,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] inline-flex items-center gap-1.5">
            <Sparkles size={13} />
            {t("dashboard.dailyMotivationLabel")} · {greeting.countryFlag} {greeting.countryName}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6] leading-tight">
            {greeting.salutation} {user.name || t("common.friend")}!
          </h2>
          <p className="text-sm text-[#4C4461] dark:text-[#D1D5DB] leading-relaxed">
            {todayQuote}
          </p>
        </div>

        {
    /* Mascot & Speech Bubble */
  }
        <div className="flex items-center gap-4 bg-white/85 dark:bg-[#181A20]/80 border border-[#EAE3F8] dark:border-[#2E3340] rounded-2xl p-4 shrink-0 max-w-xs">
          <MilkMascot mood="happy" size="md" />
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-[#7C3AED] dark:text-[#2DD4BF]">
              {t("brand.mascotName")}
            </p>
            <p className="text-xs text-[#4C4461] dark:text-[#D1D5DB] leading-relaxed">
              {t("dashboard.mascotBubble")}
            </p>
          </div>
        </div>
      </section>

      {
    /* Daily Activity Summary Row */
  }
      <section aria-label={t("dashboard.activitySummaryTitle")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
    title={t("dashboard.caloriesBurned")}
    value={`${todayBurnedCalories} ${t("common.kcal")}`}
    subtitle={`${t("dashboard.dailyTarget")}: ${user.dailyBurnTarget}`}
    icon={Flame}
    tone="pink"
  />
          <StatCard
    title={t("dashboard.activeMinutes")}
    value={`${todayActiveMinutes} ${t("common.minutes")}`}
    subtitle={`${t("dashboard.dailyTarget")}: ${user.dailyMoveMinutesTarget}`}
    icon={Timer}
    tone="purple"
  />
          <StatCard
    title={t("dashboard.workoutsDone")}
    value={workoutHistory.length}
    subtitle={t("brand.tagline")}
    icon={Dumbbell}
    tone="emerald"
  />
          <StatCard
    title={t("dashboard.waterTrackerTitle")}
    value={`${waterGlasses} / ${user.dailyWaterTargetGlasses}`}
    subtitle={`${waterGlasses * 250} ml`}
    icon={Droplets}
    tone="amber"
  />
        </div>
      </section>

      {
    /* Movement Goals + Water Tracker + Nutrition Overview */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {
    /* Daily Movement Goals */
  }
        <TiltCard className="lg:col-span-4 p-6 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("dashboard.dailyGoalProgress")}
            </h3>
            <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
              {t("dashboard.moveTimeLabel")} · {t("dashboard.burnGoalLabel")}
            </p>
          </div>

          <div className="flex items-center justify-around py-2">
            <div className="text-center space-y-2">
              <ProgressRing
    value={todayActiveMinutes}
    max={user.dailyMoveMinutesTarget}
    size={96}
    strokeWidth={9}
    color="#7C3AED"
    label={`${todayActiveMinutes}`}
    sublabel={t("common.minutes")}
  />
              <p className="text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB]">
                {t("dashboard.moveTimeLabel")}
              </p>
            </div>

            <div className="text-center space-y-2">
              <ProgressRing
    value={todayBurnedCalories}
    max={user.dailyBurnTarget}
    size={96}
    strokeWidth={9}
    color="#EC4899"
    label={`${todayBurnedCalories}`}
    sublabel={t("common.kcal")}
  />
              <p className="text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB]">
                {t("dashboard.burnGoalLabel")}
              </p>
            </div>
          </div>
        </TiltCard>

        {
    /* Water Tracker */
  }
        <TiltCard className="lg:col-span-4 p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("dashboard.waterTrackerTitle")}
              </h3>
              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] tabular-nums mt-0.5">
                {t("dashboard.waterTargetText", {
    current: waterGlasses,
    target: user.dailyWaterTargetGlasses
  })}
              </p>
            </div>
            <MilkMascot mood="hydrate" size="sm" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {Array.from({ length: user.dailyWaterTargetGlasses }).map((_, idx) => {
    const filled = idx < waterGlasses;
    return <div
      key={idx}
      className={`h-7 flex-1 min-w-[18px] rounded-lg transition-all duration-300 ${filled ? "bg-gradient-to-t from-[#7C3AED] to-[#A78BFA] dark:from-[#0D9488] dark:to-[#2DD4BF] shadow-sm" : "bg-[#F3EEFF] dark:bg-[#262A34]"}`}
    />;
  })}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
    type="button"
    onClick={() => adjustWater(-1)}
    disabled={waterGlasses === 0}
    className="btn-3d-secondary px-4 py-2.5 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] text-xs font-semibold disabled:opacity-40 inline-flex items-center gap-1"
  >
              <Minus size={14} />
              {t("dashboard.removeGlass")}
            </button>
            <button
    type="button"
    onClick={() => adjustWater(1)}
    className="btn-3d-primary flex-1 py-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5"
  >
              <Plus size={14} />
              {t("dashboard.addGlass")}
            </button>
          </div>
        </TiltCard>

        {
    /* Nutrition Overview */
  }
        <TiltCard className="lg:col-span-4 p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("dashboard.nutritionOverviewTitle")}
              </h3>
              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] tabular-nums mt-0.5">
                {diaryTotals.calories} / {user.dailyCalorieTarget} {t("common.kcal")}
              </p>
            </div>
            <button
    type="button"
    onClick={() => navigate("/nutrition")}
    className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
  >
              {t("nav.nutrition")}
            </button>
          </div>

          <div className="space-y-2.5">
            {[
    { label: t("common.protein"), val: diaryTotals.protein, target: 90, color: "bg-[#7C3AED] dark:bg-[#0D9488]" },
    { label: t("common.carbs"), val: diaryTotals.carbs, target: 220, color: "bg-[#EC4899]" },
    { label: t("common.fats"), val: diaryTotals.fats, target: 65, color: "bg-[#10B981]" }
  ].map((m) => <div key={m.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs tabular-nums">
                  <span className="font-medium text-[#4C4461] dark:text-[#D1D5DB]">{m.label}</span>
                  <span className="font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                    {m.val}g / {m.target}g
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#F3EEFF] dark:bg-[#262A34] overflow-hidden">
                  <div
    className={`h-full rounded-full ${m.color} transition-all duration-500`}
    style={{ width: `${Math.min(100, Math.round(m.val / m.target * 100))}%` }}
  />
                </div>
              </div>)}
          </div>
        </TiltCard>
      </section>

      {
    /* Recommended Workouts + Balanced Desi Meals */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {
    /* Workout Recommendations */
  }
        <div className="lg:col-span-6 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("dashboard.recommendedWorkouts")}
            </h3>
            <button
    type="button"
    onClick={() => navigate("/workouts")}
    className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline inline-flex items-center gap-1"
  >
              {t("dashboard.viewAllWorkouts")}
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedExercises.map((ex) => {
    const title = t(`${ex.titleKey}.title`);
    return <div
      key={ex.id}
      className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-[#FBF9FF] dark:bg-[#1F222A] overflow-hidden flex flex-col"
    >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <SafeImage
      src={getExerciseImage(ex, user.gender)}
      alt={title}
      className="w-full h-full object-cover object-top"
      fallbackType="workout"
    />
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
                        {t(`workouts.categories.${ex.category}`)} · {ex.calories} {t("common.kcal")}
                      </p>
                      <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] line-clamp-1 mt-0.5">
                        {title}
                      </p>
                    </div>
                    <button
      type="button"
      onClick={() => handleStartSingle(ex)}
      className="btn-3d-primary w-full py-2 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
    >
                      <Play size={12} fill="currentColor" />
                      {t("dashboard.startSession")}
                    </button>
                  </div>
                </div>;
  })}
          </div>
        </div>

        {
    /* Smart Country-Based Kitchen Preview */
  }
        <div className="lg:col-span-6 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {greeting.countryFlag}{" "}
                {isSouthAsianCountry(user.countryCode) ? t("diet.localKitchenTitle") : t("diet.localKitchenTitleLocal")}
              </h3>
            </div>
            <button
    type="button"
    onClick={() => navigate("/diet")}
    className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline inline-flex items-center gap-1 shrink-0"
  >
              {t("dashboard.viewDietPlan")}
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedSlots.map((slot) => {
    const meal = smartMeals[slot].meal;
    const title = meal.names[language];
    const summary = meal.descriptions[language];
    return <div
      key={slot}
      className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-[#FBF9FF] dark:bg-[#1F222A] overflow-hidden flex flex-col hover:border-[#C4B5FD] transition-colors"
    >
                  <div
      onClick={() => navigate("/diet")}
      className="cursor-pointer aspect-[4/3] w-full overflow-hidden"
    >
                    <SafeImage
      src={meal.image}
      alt={title}
      className="w-full h-full object-cover"
      fallbackType="meal"
    />
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                    <div onClick={() => navigate("/diet")} className="cursor-pointer space-y-1">
                      <p className="text-[11px] font-semibold text-[#EC4899] tabular-nums">
                        {t(`diet.categories.${meal.category}`)} · {meal.calories} {t("common.kcal")}
                      </p>
                      <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] line-clamp-1">
                        {title}
                      </p>
                      <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] line-clamp-2">
                        {summary}
                      </p>
                    </div>
                    <button
      type="button"
      onClick={() => swapMealSlot(slot)}
      className="btn-3d-secondary w-full py-1.5 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#E5E7EB] text-xs font-semibold inline-flex items-center justify-center gap-1.5"
    >
                      <RefreshCw size={12} />
                      {t("diet.swapMeal")}
                    </button>
                  </div>
                </div>;
  })}
          </div>
        </div>
      </section>

      {
    /* Weekly Progress Chart + Achievements Shelf */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("dashboard.weeklyOverviewTitle")}
            </h3>
            <button
    type="button"
    onClick={() => navigate("/progress")}
    className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
  >
              {t("nav.progress")}
            </button>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.14)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#7B6F99" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#7B6F99" }} axisLine={false} tickLine={false} />
                <Tooltip
    contentStyle={{
      borderRadius: "14px",
      border: "1px solid #DDD6FE",
      backgroundColor: theme === "dark" ? "#1C172B" : "#FFFFFF",
      color: theme === "dark" ? "#F4F1FF" : "#1E1B2E",
      fontSize: "12px"
    }}
  />
                <Bar
    dataKey="minutes"
    name={t("progress.activeMinsLegend")}
    fill="#7C3AED"
    radius={[8, 8, 0, 0]}
  />
                <Bar
    dataKey="caloriesBurned"
    name={t("progress.caloriesLegend")}
    fill="#F472B6"
    radius={[8, 8, 0, 0]}
  />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {
    /* Achievements */
  }
        <div className="lg:col-span-5 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award size={17} className="text-[#7C3AED]" />
              <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("dashboard.achievementsTitle")}
              </h3>
            </div>
            <button
    type="button"
    onClick={() => navigate("/challenges")}
    className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
  >
              {t("nav.challenges")}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.slice(0, 4).map((badge) => {
    const Icon = BADGE_ICONS[badge.icon];
    return <div
      key={badge.id}
      className={`p-3.5 rounded-2xl border flex items-center gap-3 ${badge.unlocked ? "border-[#DDD6FE] dark:border-[#4B5563] bg-[#F5F1FE] dark:bg-[#262A34]" : "border-[#EAE3F8] dark:border-[#2A2E39] bg-[#FBF9FF] dark:bg-[#1F222A] opacity-70"}`}
    >
                  <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${badge.unlocked ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "bg-[#EDE9FE] dark:bg-[#262A34] text-[#6E6586]"}`}
    >
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                      {t(badge.titleKey)}
                    </p>
                    <p className="text-[11px] text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
                      {badge.unlocked ? t("dashboard.unlockedLabel") : badge.progressText}
                    </p>
                  </div>
                </div>;
  })}
          </div>
        </div>
      </section>

      <WorkoutTimerModal
    open={timerOpen}
    exercises={modalExercises}
    onClose={() => setTimerOpen(false)}
  />
    </motion.div>;
};
export {
  Dashboard
};
