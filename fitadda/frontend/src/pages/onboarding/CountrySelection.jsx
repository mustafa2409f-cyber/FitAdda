import { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { CountrySelector } from "../../components/CountrySelector";
const CountrySelection = ({
  selectedCode,
  onSelect,
  onBack,
  onNext
}) => {
  const { t } = useLanguage();
  const [error, setError] = useState("");
  const handleContinue = () => {
    if (!selectedCode) {
      setError(t("onboarding.countryRequiredError"));
      return;
    }
    setError("");
    onNext();
  };
  return <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
          <Globe size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("onboarding.step2Title")}
        </h2>
        <p className="text-sm text-[#6E6586] dark:text-[#9CA3AF] max-w-xl mx-auto">
          {t("onboarding.step2Subtitle")}
        </p>
      </div>

      <CountrySelector
    selectedCode={selectedCode}
    onSelect={(code) => {
      onSelect(code);
      setError("");
    }}
  />

      {error && <p className="text-xs font-semibold text-[#DC2626] dark:text-[#FCA5A5] text-center">
          {error}
        </p>}

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
    onClick={handleContinue}
    className="btn-3d-primary px-7 py-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold"
  >
          {t("common.next")}
        </button>
      </div>
    </div>;
};
export {
  CountrySelection
};
