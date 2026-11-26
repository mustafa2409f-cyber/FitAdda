import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Dumbbell, Heart, Play, Sparkles } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { EXERCISES_LIBRARY } from "../data/mockData";
import { WorkoutCard } from "../components/WorkoutCard";
import { WorkoutTimerModal } from "../components/WorkoutTimerModal";
import { MilkMascot } from "../components/MilkMascot";
const CATEGORIES = [
  "All",
  "Chest",
  "Back",
  "Arms",
  "Legs",
  "Cardio",
  "Full Body"
];
const DIFFICULTIES = [
  "All",
  "Beginner",
  "Moderate",
  "Active"
];
const Workouts = () => {
  const { t } = useLanguage();
  const {
    selectedExerciseIds,
    favoriteExerciseIds,
    toggleSelectExercise,
    toggleFavoriteExercise
  } = useFitAdda();
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [timerOpen, setTimerOpen] = useState(false);
  const [activeExercises, setActiveExercises] = useState([]);
  const filteredExercises = useMemo(() => {
    return EXERCISES_LIBRARY.filter((ex) => {
      if (category !== "All" && ex.category !== category) return false;
      if (difficulty !== "All" && ex.difficulty !== difficulty) return false;
      if (beginnerOnly && !ex.beginnerFriendly) return false;
      if (favoritesOnly && !favoriteExerciseIds.includes(ex.id)) return false;
      return true;
    });
  }, [category, difficulty, beginnerOnly, favoritesOnly, favoriteExerciseIds]);
  const handleStartSelected = () => {
    const selected = EXERCISES_LIBRARY.filter((ex) => selectedExerciseIds.includes(ex.id));
    if (selected.length === 0) {
      setErrorMsg(t("workouts.selectAtLeastOneError"));
      return;
    }
    setErrorMsg("");
    setActiveExercises(selected);
    setTimerOpen(true);
  };
  const handleStartSingle = (ex) => {
    setErrorMsg("");
    setActiveExercises([ex]);
    setTimerOpen(true);
  };
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6"
  >
      {
    /* MilkMate Coach Intro Strip */
  }
      <section className="rounded-3xl border border-[#E5DDF7] dark:border-[#2E3340] bg-gradient-to-br from-white via-[#FAF7FF] to-[#F3EEFF] dark:from-[#181A20] dark:via-[#1B1E25] dark:to-[#1F222A] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <MilkMascot mood="workout" pose="wave" size="md" className="shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-[#7C3AED] dark:text-[#2DD4BF]">
              {t("brand.mascotName")} · {t("workouts.coach.badge")}
            </p>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("workouts.title")}
            </h2>
            <p className="text-xs sm:text-sm text-[#4C4461] dark:text-[#D1D5DB] max-w-xl">
              “{t("workouts.coach.introGreeting")}”
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <span className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums">
            {t("workouts.selectedCount", { count: selectedExerciseIds.length })}
          </span>
          <button
    type="button"
    onClick={handleStartSelected}
    className="btn-3d-primary px-5 py-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap"
  >
            <Play size={14} fill="currentColor" />
            {t("workouts.startSelected")}
          </button>
        </div>
      </section>

      {
    /* Filters Toolbar */
  }
      <section className="rounded-3xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-5 sm:p-6 space-y-4">
        <p className="text-xs sm:text-sm text-[#6E6586] dark:text-[#9CA3AF]">
          {t("workouts.subtitle")}
        </p>

        {errorMsg && <p className="text-xs font-semibold text-[#DC2626] dark:text-[#FCA5A5]">{errorMsg}</p>}

        {
    /* Categories */
  }
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => <button
    key={cat}
    type="button"
    onClick={() => setCategory(cat)}
    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${category === cat ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white" : "bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#D1D5DB] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF]"}`}
  >
              {t(`workouts.categories.${cat}`)}
            </button>)}
        </div>

        {
    /* Difficulty + Beginner-Friendly + Favorites */
  }
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0EBFA] dark:border-[#2A2E39]">
          <div className="flex flex-wrap items-center gap-1.5">
            {DIFFICULTIES.map((diff) => <button
    key={diff}
    type="button"
    onClick={() => setDifficulty(diff)}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${difficulty === diff ? "bg-[#EDE9FE] dark:bg-[#262A34] text-[#6D28D9] dark:text-[#E5E7EB]" : "text-[#6E6586] dark:text-[#9CA3AF] hover:bg-[#F5F1FE] dark:hover:bg-[#262A34]"}`}
  >
                {t(`workouts.difficulties.${diff}`)}
              </button>)}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
    type="button"
    onClick={() => setBeginnerOnly((v) => !v)}
    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${beginnerOnly ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]" : "border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
              <Sparkles size={13} />
              {t("workouts.beginnerFriendlyOnly")}
            </button>

            <button
    type="button"
    onClick={() => setFavoritesOnly((v) => !v)}
    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${favoritesOnly ? "border-[#EC4899] bg-[#FCE7F3] dark:bg-[#2A2228] text-[#DB2777] dark:text-[#F472B6]" : "border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
              <Heart size={13} fill={favoritesOnly ? "currentColor" : "none"} />
              {t("workouts.favoritesOnly")}
            </button>
          </div>
        </div>
      </section>

      {
    /* Exercises Grid */
  }
      {filteredExercises.length === 0 ? <div className="rounded-3xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-10 text-center space-y-3">
          <Dumbbell size={32} className="mx-auto text-[#A78BFA]" />
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("common.noResults")}
          </h3>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            {t("common.tryAnotherSearch")}
          </p>
          <button
    type="button"
    onClick={() => {
      setCategory("All");
      setDifficulty("All");
      setBeginnerOnly(false);
      setFavoritesOnly(false);
    }}
    className="btn-3d-secondary px-4 py-2 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] text-xs font-semibold"
  >
            {t("common.clearFilters")}
          </button>
        </div> : <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExercises.map((ex) => <WorkoutCard
    key={ex.id}
    exercise={ex}
    selected={selectedExerciseIds.includes(ex.id)}
    favorite={favoriteExerciseIds.includes(ex.id)}
    onToggleSelect={() => {
      toggleSelectExercise(ex.id);
      setErrorMsg("");
    }}
    onToggleFavorite={() => toggleFavoriteExercise(ex.id)}
    onStartSingle={() => handleStartSingle(ex)}
  />)}
        </section>}

      <WorkoutTimerModal
    open={timerOpen}
    exercises={activeExercises}
    onClose={() => setTimerOpen(false)}
  />
    </motion.div>;
};
export {
  Workouts
};
