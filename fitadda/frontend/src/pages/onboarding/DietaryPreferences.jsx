import { Utensils } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { DietaryPreferencesForm } from "../../components/DietaryPreferencesForm";
const DietaryPreferences = ({
  value,
  onChange,
  onBack,
  onNext
}) => {
  const { t } = useLanguage();
  return <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
          <Utensils size={24} />
        </div>
        <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
          {t("dietPrefs.badge")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("dietPrefs.title")}
        </h2>
        <p className="text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
          {t("dietPrefs.subtitle")}
        </p>
      </div>

      <DietaryPreferencesForm value={value} onChange={onChange} />

      <p className="text-[11px] text-center text-[#6E6586] dark:text-[#9CA3AF]">
        {t("dietPrefs.skipNote")}
      </p>

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
  DietaryPreferences
};
