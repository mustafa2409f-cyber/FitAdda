import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { FITADDA_ASSETS } from "../../data/assets";
import { TiltCard } from "../../components/TiltCard";
import { AnimatedCheckmark } from "../../components/AnimatedCheckmark";
import { SafeImage } from "../../components/SafeImage";
const GenderSelection = ({
  selected,
  onSelect,
  onBack,
  onNext
}) => {
  const { t } = useLanguage();
  const cards = [
    {
      id: "women",
      title: t("onboarding.genderWomen"),
      desc: t("onboarding.genderWomenDesc"),
      image: FITADDA_ASSETS.femaleAthlete
    },
    {
      id: "men",
      title: t("onboarding.genderMen"),
      desc: t("onboarding.genderMenDesc"),
      image: FITADDA_ASSETS.maleAthlete
    }
  ];
  return <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("onboarding.step3Title")}
        </h2>
        <p className="text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-lg mx-auto">
          {t("onboarding.step3Subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {cards.map((card) => {
    const isSelected = selected === card.id;
    return <TiltCard
      key={card.id}
      selected={isSelected}
      onClick={() => onSelect(card.id)}
      className="p-5 cursor-pointer flex flex-col justify-between gap-4"
    >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {card.title}
                </h3>
                <AnimatedCheckmark checked={isSelected} />
              </div>

              <motion.div
      animate={isSelected ? { y: [0, -6, 0] } : { y: 0 }}
      transition={{ duration: 0.65 }}
      className="aspect-[3/4] w-full max-h-64 rounded-2xl overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]"
    >
                <SafeImage
      src={card.image}
      alt={card.title}
      className="w-full h-full object-cover object-top"
      fallbackType="character"
    />
              </motion.div>

              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] leading-relaxed">
                {card.desc}
              </p>
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
  GenderSelection
};
