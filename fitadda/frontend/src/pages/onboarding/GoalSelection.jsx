import { Dumbbell, Flame, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { TiltCard } from "../../components/TiltCard";
import { AnimatedCheckmark } from "../../components/AnimatedCheckmark";
const GOAL_ITEMS = [
  {
    id: "stay_active",
    titleKey: "onboarding.goalStayActive",
    descKey: "onboarding.goalStayActiveDesc",
    icon: Sparkles,
    tone: "bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]"
  },
  {
    id: "build_strength",
    titleKey: "onboarding.goalBuildStrength",
    descKey: "onboarding.goalBuildStrengthDesc",
    icon: Dumbbell,
    tone: "bg-[#FCE7F3] dark:bg-[#2A2228] text-[#DB2777] dark:text-[#F472B6]"
  },
  {
    id: "improve_stamina",
    titleKey: "onboarding.goalImproveStamina",
    descKey: "onboarding.goalImproveStaminaDesc",
    icon: Flame,
    tone: "bg-[#FEF3C7] dark:bg-[#3A2B14] text-[#D97706] dark:text-[#FBBF24]"
  },
  {
    id: "healthy_lifestyle",
    titleKey: "onboarding.goalHealthyLifestyle",
    descKey: "onboarding.goalHealthyLifestyleDesc",
    icon: Heart,
    tone: "bg-[#ECFDF5] dark:bg-[#143329] text-[#059669] dark:text-[#34D399]"
  }
];
const GoalSelection = ({
  selected,
  onSelect,
  onBack,
  onNext
}) => {
  const { t } = useLanguage();
  return <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("onboarding.step4Title")}
        </h2>
        <p className="text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-xl mx-auto">
          {t("onboarding.step4Subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOAL_ITEMS.map((item) => {
    const Icon = item.icon;
    const isSelected = selected === item.id;
    return <TiltCard
      key={item.id}
      selected={isSelected}
      onClick={() => onSelect(item.id)}
      className="p-5 cursor-pointer flex items-start justify-between gap-4"
    >
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.tone}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
              <AnimatedCheckmark checked={isSelected} />
            </TiltCard>;
  })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
    type="button"
    onClick={onBack}
    className="btn-3d-secondary px-5 py-3 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] text-xs sm:text-sm font-semibold"
  >
          {t("common.back")}
        </button>
        <button
    type="button"
    onClick={onNext}
    className="btn-3d-primary px-7 py-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold"
  >
          {t("common.next")}
        </button>
      </div>
    </div>;
};
export {
  GoalSelection
};
