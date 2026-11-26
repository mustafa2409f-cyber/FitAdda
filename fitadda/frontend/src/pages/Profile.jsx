import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Settings, Camera, Check } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { FITADDA_ASSETS } from "../data/assets";
import { getCountryByCode } from "../data/countries";
import { TiltCard } from "../components/TiltCard";
import { SafeImage } from "../components/SafeImage";
const GOAL_KEY_MAP = {
  stay_active: "onboarding.goalStayActive",
  build_strength: "onboarding.goalBuildStrength",
  improve_stamina: "onboarding.goalImproveStamina",
  healthy_lifestyle: "onboarding.goalHealthyLifestyle"
};
const LEVEL_KEY_MAP = {
  beginner: "onboarding.levelBeginner",
  moderate: "onboarding.levelModerate",
  active: "onboarding.levelActive"
};
const LANG_LABEL = {
  en: "English",
  ur: "اردو",
  roman: "Roman Urdu"
};
const Profile = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user, updateProfile } = useFitAdda();
  const fileInputRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const country = getCountryByCode(user.countryCode);
  const avatarImg = selectedPhoto || user.avatarUrl || (user.gender === "men" ? FITADDA_ASSETS.maleAthlete : FITADDA_ASSETS.femaleAthlete);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (selectedPhoto) {
      updateProfile({ avatarUrl: selectedPhoto });
      setSelectedPhoto(null);
    }
  };

  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6 max-w-4xl mx-auto"
  >
      {
    /* Profile Header */
  }
      <TiltCard className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
        <div
          onClick={handlePhotoClick}
          className="relative group w-32 h-36 rounded-3xl overflow-hidden border border-[#EAE3F8] dark:border-[#2E3340] bg-[#F5F1FE] dark:bg-[#1F222A] shrink-0 shadow-md cursor-pointer"
        >
          <SafeImage
    src={avatarImg}
    alt={user.name || t("common.friend")}
    className="w-full h-full object-cover object-top"
    fallbackType="character"
  />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg">
              <Camera size={22} />
            </div>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-start space-y-2">
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {user.name || t("common.friend")}
          </h2>
          <p className="text-sm font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
            {t(GOAL_KEY_MAP[user.goal])} · {t(LEVEL_KEY_MAP[user.activityLevel])}
          </p>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            {t("profile.subtitle")}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <button
    type="button"
    onClick={() => navigate("/settings")}
    className="btn-3d-primary px-5 py-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold inline-flex items-center gap-2"
  >
              <Settings size={14} />
              {t("profile.editInSettings")}
            </button>
            <button
    type="button"
    onClick={handleSavePhoto}
    className="px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-colors"
  >
              <Check size={14} />
              Save Photo
            </button>
          </div>
        </div>
      </TiltCard>

      {
    /* Details Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TiltCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("profile.title")}
          </h3>

          <div className="space-y-3">
            {[
    {
      label: t("profile.countryLabel"),
      val: country ? `${country.flag} ${country.name[language]}` : "🌍"
    },
    {
      label: t("profile.languageLabel"),
      val: LANG_LABEL[language]
    },
    {
      label: t("profile.goalLabel"),
      val: t(GOAL_KEY_MAP[user.goal])
    },
    {
      label: t("profile.activityLabel"),
      val: t(LEVEL_KEY_MAP[user.activityLevel])
    },
    {
      label: t("profile.mealPrefLabel"),
      val: user.mealPreference
    }
  ].map((row) => <div
    key={row.label}
    className="p-3 rounded-xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] flex items-center justify-between gap-3"
  >
                <span className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">{row.label}</span>
                <span className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {row.val}
                </span>
              </div>)}
          </div>
        </TiltCard>

        <TiltCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("profile.statsSnapshot")}
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-[#F5F1FE] dark:bg-[#1F222A]">
              <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">{t("profile.age")}</p>
              <p className="text-lg font-extrabold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6] mt-1">
                {user.age} {t("profile.years")}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F1FE] dark:bg-[#1F222A]">
              <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">{t("profile.height")}</p>
              <p className="text-lg font-extrabold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6] mt-1">
                {user.heightCm} {t("profile.cm")}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F1FE] dark:bg-[#1F222A]">
              <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">{t("profile.weight")}</p>
              <p className="text-lg font-extrabold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6] mt-1">
                {user.weightKg} {t("profile.kg")}
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2.5">
            <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
              {t("profile.foodPrefsSummary")}
            </p>
            <div className="space-y-2">
              {[
    {
      label: t("dietPrefs.dietTypeLabel"),
      val: t(`dietPrefs.dietTypes.${user.foodPreferences.dietType}`)
    },
    {
      label: t("dietPrefs.budgetLabel"),
      val: t(`dietPrefs.budgets.${user.foodPreferences.budget}`)
    },
    {
      label: t("dietPrefs.cookingStyleLabel"),
      val: t(`dietPrefs.cookingStyles.${user.foodPreferences.cookingStyle}`)
    },
    {
      label: t("dietPrefs.restrictionsLabel"),
      val: t(`dietPrefs.restrictions.${user.foodPreferences.religiousRestriction}`)
    }
  ].map((item) => <div
    key={item.label}
    className="px-3 py-2 rounded-xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] flex items-center justify-between gap-2"
  >
                  <span className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">{item.label}</span>
                  <span className="text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
                    {item.val}
                  </span>
                </div>)}
            </div>
          </div>
        </TiltCard>
      </div>
    </motion.div>;
};
export {
  Profile
};