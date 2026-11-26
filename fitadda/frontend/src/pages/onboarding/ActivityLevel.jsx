import { Coffee, Footprints, Zap } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { TiltCard } from "../../components/TiltCard";
import { AnimatedCheckmark } from "../../components/AnimatedCheckmark";
const LEVELS = [
  {
    id: "beginner",
    titleKey: "onboarding.levelBeginner",
    descKey: "onboarding.levelBeginnerDesc",
    icon: Coffee
  },
  {
    id: "moderate",
    titleKey: "onboarding.levelModerate",
    descKey: "onboarding.levelModerateDesc",
    icon: Footprints
  },
  {
    id: "active",
    titleKey: "onboarding.levelActive",
    descKey: "onboarding.levelActiveDesc",
    icon: Zap
  }
];
const ActivityLevel = ({
  selected,
  onSelect,
  onBack,
  onNext
}) => {
  const { t } = useLanguage();
  return <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("onboarding.step5Title")}
        </h2>
        <p className="text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-xl mx-auto">
          {t("onboarding.step5Subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LEVELS.map((lvl) => {
    const Icon = lvl.icon;
    const isSelected = selected === lvl.id;
    return <TiltCard
      key={lvl.id}
      selected={isSelected}
      onClick={() => onSelect(lvl.id)}
      className="p-5 cursor-pointer flex flex-col justify-between gap-4"
    >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF] flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <AnimatedCheckmark checked={isSelected} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {t(lvl.titleKey)}
                </h3>
                <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-1.5 leading-relaxed">
                  {t(lvl.descKey)}
                </p>
              </div>
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
  ActivityLevel
};
