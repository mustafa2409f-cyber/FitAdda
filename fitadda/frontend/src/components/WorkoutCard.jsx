import { Clock, Flame, Heart, Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useFitAdda } from "../context/FitAddaContext";
import { getExerciseImage } from "../data/mockData";
import { TiltCard } from "./TiltCard";
import { SafeImage } from "./SafeImage";
import { AnimatedCheckmark } from "./AnimatedCheckmark";
const WorkoutCard = ({
  exercise,
  selected,
  favorite,
  onToggleSelect,
  onToggleFavorite,
  onStartSingle
}) => {
  const { t } = useLanguage();
  const { user } = useFitAdda();
  const title = t(`${exercise.titleKey}.title`);
  const desc = t(`${exercise.titleKey}.desc`);
  const categoryLabel = t(`workouts.categories.${exercise.category}`);
  const difficultyLabel = t(`workouts.difficulties.${exercise.difficulty}`);
  const equipmentLabel = t(exercise.equipmentKey);
  const imageSrc = getExerciseImage(exercise, user.gender);
  return <TiltCard selected={selected} className="overflow-hidden flex flex-col">
      {
    /* Uncropped realistic studio photo */
  }
      <div
    onClick={onToggleSelect}
    className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A] cursor-pointer group"
  >
        <SafeImage
    src={imageSrc}
    alt={title}
    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
    fallbackType="workout"
  />

        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onToggleFavorite();
    }}
    aria-label={t("workouts.favoritesOnly")}
    className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors ${favorite ? "bg-[#EC4899] text-white" : "bg-white/95 dark:bg-[#181A20]/95 text-[#6E6586] hover:text-[#EC4899]"}`}
  >
            <Heart size={15} fill={favorite ? "currentColor" : "none"} />
          </button>

          <div className="pointer-events-auto shadow-sm rounded-full">
            <AnimatedCheckmark checked={selected} />
          </div>
        </div>
      </div>

      {
    /* Card Body */
  }
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
            {categoryLabel} · {difficultyLabel} · {equipmentLabel}
          </p>
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-snug">
            {title}
          </h3>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-[#F0EBFA] dark:border-[#2A2E39]">
          <div className="flex items-center justify-between text-xs text-[#4C4461] dark:text-[#D1D5DB] tabular-nums">
            <span>
              {exercise.sets} {t("common.sets")} · {exercise.reps} {t("common.reps")}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} className="text-[#7C3AED]" />
                {exercise.durationSec} {t("common.seconds")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Flame size={12} className="text-[#EC4899]" />
                {exercise.calories} {t("common.kcal")}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
    type="button"
    onClick={onStartSingle}
    className="btn-3d-primary flex-1 py-2.5 px-4 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
  >
              <Play size={13} fill="currentColor" />
              {t("common.start")}
            </button>
          </div>
        </div>
      </div>
    </TiltCard>;
};
export {
  WorkoutCard
};
