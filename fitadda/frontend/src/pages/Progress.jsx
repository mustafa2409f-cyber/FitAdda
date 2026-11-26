import { useMemo, useState } from "react";
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
  Calendar,
  Check,
  Droplets,
  Flame,
  Heart,
  Sparkles,
  Sun,
  Trophy
} from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { MONTHLY_PROGRESS_DATA } from "../data/mockData";
import { TiltCard } from "../components/TiltCard";
const BADGE_ICONS = {
  flame: Flame,
  heart: Heart,
  droplets: Droplets,
  trophy: Trophy,
  sparkles: Sparkles,
  sun: Sun
};
const Progress = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const {
    user,
    weeklyStats,
    workoutHistory,
    achievements,
    updateProfile,
    triggerCelebration
  } = useFitAdda();
  const [period, setPeriod] = useState("weekly");
  const [editingGoals, setEditingGoals] = useState(false);
  const [moveTarget, setMoveTarget] = useState(user.dailyMoveMinutesTarget);
  const [burnTarget, setBurnTarget] = useState(user.dailyBurnTarget);
  const [waterTarget, setWaterTarget] = useState(user.dailyWaterTargetGlasses);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(user.weeklyWorkoutTarget);
  const weeklyTotals = useMemo(
    () => weeklyStats.reduce(
      (acc, d) => ({
        minutes: acc.minutes + d.minutes,
        caloriesBurned: acc.caloriesBurned + d.caloriesBurned,
        workouts: acc.workouts + d.workouts
      }),
      { minutes: 0, caloriesBurned: 0, workouts: 0 }
    ),
    [weeklyStats]
  );
  const chartData = useMemo(() => {
    if (period === "weekly") {
      return weeklyStats.map((d) => ({
        label: t(`progress.daysShort.${d.dayKey}`),
        minutes: d.minutes,
        caloriesBurned: d.caloriesBurned
      }));
    }
    return MONTHLY_PROGRESS_DATA.map((w) => ({
      label: t(`progress.weeksShort.${w.weekKey}`),
      minutes: w.minutes,
      caloriesBurned: w.caloriesBurned
    }));
  }, [period, weeklyStats, t]);
  const handleSaveGoals = (e) => {
    e.preventDefault();
    updateProfile({
      dailyMoveMinutesTarget: moveTarget,
      dailyBurnTarget: burnTarget,
      dailyWaterTargetGlasses: waterTarget,
      weeklyWorkoutTarget: weeklyWorkouts
    });
    setEditingGoals(false);
    triggerCelebration(t("progress.goalsUpdatedToast"), t("brand.tagline"));
  };
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6"
  >
      {
    /* Top Statistics Summary */
  }
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TiltCard className="p-5">
          <p className="text-xs font-medium text-[#6E6586] dark:text-[#9CA3AF]">
            {t("progress.weeklyActiveTime")}
          </p>
          <p className="text-2xl font-bold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6] mt-1">
            {weeklyTotals.minutes} {t("common.minutes")}
          </p>
        </TiltCard>

        <TiltCard className="p-5">
          <p className="text-xs font-medium text-[#6E6586] dark:text-[#9CA3AF]">
            {t("progress.weeklyEnergyBurned")}
          </p>
          <p className="text-2xl font-bold tabular-nums text-[#7C3AED] dark:text-[#2DD4BF] mt-1">
            {weeklyTotals.caloriesBurned.toLocaleString()} {t("common.kcal")}
          </p>
        </TiltCard>

        <TiltCard className="p-5">
          <p className="text-xs font-medium text-[#6E6586] dark:text-[#9CA3AF]">
            {t("progress.milestonesEarned")}
          </p>
          <p className="text-2xl font-bold tabular-nums text-[#EC4899] mt-1">
            {achievements.filter((a) => a.unlocked).length} / {achievements.length}
          </p>
        </TiltCard>
      </section>

      {
    /* Weekly / Monthly Charts + Goal Completion */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {period === "weekly" ? t("progress.chartTitleWeekly") : t("progress.chartTitleMonthly")}
              </h2>
              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
                {t("progress.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A]">
              <button
    type="button"
    onClick={() => setPeriod("weekly")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${period === "weekly" ? "bg-white dark:bg-[#262A34] text-[#7C3AED] dark:text-[#F3F4F6] shadow-sm" : "text-[#6E6586] dark:text-[#9CA3AF]"}`}
  >
                {t("common.weekly")}
              </button>
              <button
    type="button"
    onClick={() => setPeriod("monthly")}
    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${period === "monthly" ? "bg-white dark:bg-[#262A34] text-[#7C3AED] dark:text-[#F3F4F6] shadow-sm" : "text-[#6E6586] dark:text-[#9CA3AF]"}`}
  >
                {t("common.monthly")}
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.14)" />
                <XAxis
    dataKey="label"
    tick={{ fontSize: 12, fill: "#7B6F99" }}
    axisLine={false}
    tickLine={false}
  />
                <YAxis
    tick={{ fontSize: 12, fill: "#7B6F99" }}
    axisLine={false}
    tickLine={false}
  />
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
    /* Goal Completion Card */
  }
        <div className="lg:col-span-4 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("progress.goalCompletionTitle")}
            </h3>
            <button
    type="button"
    onClick={() => setEditingGoals((v) => !v)}
    className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
  >
              {editingGoals ? t("common.cancel") : t("progress.adjustGoals")}
            </button>
          </div>

          {editingGoals ? <form onSubmit={handleSaveGoals} className="space-y-3">
              <div>
                <label className="block text-xs text-[#6E6586] dark:text-[#9CA3AF] mb-1 tabular-nums">
                  {t("settings.moveTargetLabel")}: {moveTarget}
                </label>
                <input
    type="range"
    min={15}
    max={90}
    step={5}
    value={moveTarget}
    onChange={(e) => setMoveTarget(Number(e.target.value))}
    className="w-full accent-[#7C3AED]"
  />
              </div>
              <div>
                <label className="block text-xs text-[#6E6586] dark:text-[#9CA3AF] mb-1 tabular-nums">
                  {t("dashboard.burnGoalLabel")}: {burnTarget} {t("common.kcal")}
                </label>
                <input
    type="range"
    min={150}
    max={800}
    step={25}
    value={burnTarget}
    onChange={(e) => setBurnTarget(Number(e.target.value))}
    className="w-full accent-[#7C3AED]"
  />
              </div>
              <div>
                <label className="block text-xs text-[#6E6586] dark:text-[#9CA3AF] mb-1 tabular-nums">
                  {t("settings.waterTargetLabel")}: {waterTarget}
                </label>
                <input
    type="range"
    min={4}
    max={12}
    step={1}
    value={waterTarget}
    onChange={(e) => setWaterTarget(Number(e.target.value))}
    className="w-full accent-[#7C3AED]"
  />
              </div>
              <div>
                <label className="block text-xs text-[#6E6586] dark:text-[#9CA3AF] mb-1 tabular-nums">
                  {t("common.sessions")}: {weeklyWorkouts}
                </label>
                <input
    type="range"
    min={1}
    max={7}
    step={1}
    value={weeklyWorkouts}
    onChange={(e) => setWeeklyWorkouts(Number(e.target.value))}
    className="w-full accent-[#7C3AED]"
  />
              </div>
              <button
    type="submit"
    className="btn-3d-primary w-full py-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center gap-1.5"
  >
                <Check size={14} />
                {t("progress.saveGoals")}
              </button>
            </form> : <div className="space-y-3">
              {[
    { label: t("dashboard.moveTimeLabel"), val: `${user.dailyMoveMinutesTarget} ${t("common.minutes")}` },
    { label: t("dashboard.burnGoalLabel"), val: `${user.dailyBurnTarget} ${t("common.kcal")}` },
    { label: t("settings.waterTargetLabel"), val: `${user.dailyWaterTargetGlasses} ${t("common.glasses")}` },
    { label: t("common.sessions"), val: `${user.weeklyWorkoutTarget} / ${t("common.weekly")}` }
  ].map((item) => <div
    key={item.label}
    className="p-3 rounded-xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] flex items-center justify-between"
  >
                  <span className="text-xs text-[#4C4461] dark:text-[#D1D5DB]">{item.label}</span>
                  <span className="text-xs font-bold tabular-nums text-[#7C3AED] dark:text-[#2DD4BF]">
                    {item.val}
                  </span>
                </div>)}
            </div>}
        </div>
      </section>

      {
    /* Personal Achievements */
  }
      <section className="space-y-3">
        <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("dashboard.achievementsTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((badge) => {
    const Icon = BADGE_ICONS[badge.icon];
    return <TiltCard
      key={badge.id}
      selected={badge.unlocked}
      className={`p-5 flex items-center gap-4 ${badge.unlocked ? "" : "opacity-70"}`}
    >
                <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${badge.unlocked ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white shadow-md shadow-[#7C3AED]/25 dark:shadow-[#0D9488]/30" : "bg-[#F3EEFF] dark:bg-[#1F222A] text-[#8E84A8]"}`}
    >
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                    {t(badge.titleKey)}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF] mt-1 tabular-nums">
                    {badge.unlocked ? t("dashboard.unlockedLabel") : badge.progressText}
                  </p>
                </div>
              </TiltCard>;
  })}
        </div>
      </section>

      {
    /* Workout History */
  }
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={17} className="text-[#7C3AED]" />
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("progress.historyTitle")}
          </h3>
        </div>

        {workoutHistory.length === 0 ? <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] py-6 text-center">
            {t("progress.emptyHistory")}
          </p> : <div className="space-y-3">
            {workoutHistory.map((item, idx) => <div
    key={item.id}
    className="flex items-start gap-4 p-4 rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]"
  >
                <div className="w-9 h-9 rounded-full bg-[#7C3AED] dark:bg-[#0D9488] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                  {workoutHistory.length - idx}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                      {item.title}
                    </p>
                    <span className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
                      {item.durationMin} {t("common.minutes")} · {item.calories} {t("common.kcal")}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-1">
                    {item.date} · {item.category} · {t(`workouts.moods.${item.mood}`)}
                  </p>
                </div>
              </div>)}
          </div>}
      </section>
    </motion.div>;
};
export {
  Progress
};
