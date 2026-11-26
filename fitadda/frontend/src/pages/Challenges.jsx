import { motion } from "motion/react";
import {
  Award,
  CalendarDays,
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
import { TiltCard } from "../components/TiltCard";
import { AnimatedCheckmark } from "../components/AnimatedCheckmark";
import { ProgressRing } from "../components/ProgressRing";
const BADGE_ICONS = {
  flame: Flame,
  heart: Heart,
  droplets: Droplets,
  trophy: Trophy,
  sparkles: Sparkles,
  sun: Sun
};
const Challenges = () => {
  const { t } = useLanguage();
  const {
    challenges,
    thirtyDayCompletedDays,
    achievements,
    toggleChallengeProgress,
    toggleThirtyDay
  } = useFitAdda();
  const dailyChallenges = challenges.filter((c) => c.type === "daily");
  const weeklyChallenges = challenges.filter((c) => c.type === "weekly");
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6"
  >
      {
    /* 30-Day Khushi & Movement Calendar */
  }
      <section className="rounded-3xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-gradient-to-br from-white via-[#FAF7FF] to-[#F3EEFF] dark:from-[#181A20] dark:via-[#1B1E25] dark:to-[#1F222A] p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="space-y-1.5 max-w-xl">
            <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              {t("challenges.title")}
            </p>
            <h2 className="text-2xl font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("challenges.thirtyDayTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6586] dark:text-[#9CA3AF] leading-relaxed">
              {t("challenges.thirtyDayDesc")}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <ProgressRing
    value={thirtyDayCompletedDays.length}
    max={30}
    size={94}
    strokeWidth={9}
    color="#7C3AED"
    label={`${thirtyDayCompletedDays.length}/30`}
    sublabel={t("common.days")}
  />
            <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] tabular-nums">
              {t("challenges.percentComplete", {
    pct: Math.round(thirtyDayCompletedDays.length / 30 * 100)
  })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
          {Array.from({ length: 30 }).map((_, idx) => {
    const dayNum = idx + 1;
    const done = thirtyDayCompletedDays.includes(dayNum);
    return <motion.button
      key={dayNum}
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={() => toggleThirtyDay(dayNum)}
      className={`h-11 rounded-xl border text-xs font-bold tabular-nums flex items-center justify-center transition-all ${done ? "bg-[#7C3AED] dark:bg-[#0D9488] border-[#7C3AED] dark:border-[#14B8A6] text-white shadow-md shadow-[#7C3AED]/25 dark:shadow-[#0D9488]/30" : "bg-white/90 dark:bg-[#1F222A] border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB] hover:border-[#A78BFA]"}`}
    >
                {done ? <Check size={14} strokeWidth={3} /> : <span>{dayNum}</span>}
              </motion.button>;
  })}
        </div>
      </section>

      {
    /* Daily & Weekly Challenges */
  }
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("challenges.dailyTitle")}
            </h3>
            <span className="text-xs text-[#6E6586] dark:text-[#9CA3AF] tabular-nums">
              {dailyChallenges.filter((c) => c.completed).length} / {dailyChallenges.length}
            </span>
          </div>

          <div className="space-y-3">
            {dailyChallenges.map((ch) => {
    const title = t(ch.titleKey);
    const pct = Math.min(100, Math.round(ch.progress / ch.target * 100));
    return <TiltCard
      key={ch.id}
      selected={ch.completed}
      onClick={() => toggleChallengeProgress(ch.id, title)}
      className="cursor-pointer p-5 space-y-3"
    >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
                        {t(ch.rewardKey)}
                      </p>
                      <h4 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6] mt-0.5">
                        {title}
                      </h4>
                    </div>
                    <AnimatedCheckmark checked={ch.completed} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs tabular-nums text-[#6E6586] dark:text-[#9CA3AF]">
                      <span>
                        {ch.completed ? t("challenges.celebrated") : t("challenges.tapToComplete")}
                      </span>
                      <span className="font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
                        {ch.progress} / {ch.target} {t(ch.unitKey)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EDE9FE] dark:bg-[#262A34] overflow-hidden">
                      <div
      className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] dark:from-[#0D9488] dark:to-[#38BDF8] transition-all duration-500"
      style={{ width: `${pct}%` }}
    />
                    </div>
                  </div>
                </TiltCard>;
  })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("challenges.weeklyTitle")}
            </h3>
            <span className="text-xs text-[#6E6586] dark:text-[#9CA3AF] tabular-nums">
              {weeklyChallenges.filter((c) => c.completed).length} / {weeklyChallenges.length}
            </span>
          </div>

          <div className="space-y-3">
            {weeklyChallenges.map((ch) => {
    const title = t(ch.titleKey);
    const pct = Math.min(100, Math.round(ch.progress / ch.target * 100));
    return <TiltCard
      key={ch.id}
      selected={ch.completed}
      onClick={() => toggleChallengeProgress(ch.id, title)}
      className="cursor-pointer p-5 space-y-3"
    >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#EC4899]">
                        {t(ch.rewardKey)}
                      </p>
                      <h4 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6] mt-0.5">
                        {title}
                      </h4>
                    </div>
                    <AnimatedCheckmark checked={ch.completed} tone="pink" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs tabular-nums text-[#6E6586] dark:text-[#9CA3AF]">
                      <span>
                        {ch.completed ? t("challenges.celebrated") : t("challenges.tapToComplete")}
                      </span>
                      <span className="font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
                        {ch.progress} / {ch.target} {t(ch.unitKey)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EDE9FE] dark:bg-[#262A34] overflow-hidden">
                      <div
      className="h-full rounded-full bg-gradient-to-r from-[#EC4899] to-[#7C3AED] transition-all duration-500"
      style={{ width: `${pct}%` }}
    />
                    </div>
                  </div>
                </TiltCard>;
  })}
          </div>
        </div>
      </section>

      {
    /* Achievement Rewards */
  }
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-[#7C3AED]" />
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("challenges.rewardsShelf")}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((badge) => {
    const Icon = BADGE_ICONS[badge.icon];
    return <TiltCard
      key={badge.id}
      selected={badge.unlocked}
      className={`p-5 flex items-center gap-4 ${badge.unlocked ? "" : "opacity-70"}`}
    >
                <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${badge.unlocked ? "bg-gradient-to-br from-[#7C3AED] to-[#EC4899] dark:from-[#0D9488] dark:to-[#38BDF8] text-white shadow-md" : "bg-[#F3EEFF] dark:bg-[#1F222A] text-[#8E84A8]"}`}
    >
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                    {t(badge.titleKey)}
                  </p>
                  <p className="text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF] mt-1 tabular-nums">
                    {badge.unlocked ? t("dashboard.unlockedLabel") : badge.progressText}
                  </p>
                </div>
              </TiltCard>;
  })}
        </div>
      </section>
    </motion.div>;
};
export {
  Challenges
};
