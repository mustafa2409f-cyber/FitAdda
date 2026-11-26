import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Bell, Check, Globe, KeyRound, LogOut, Moon, RotateCcw, Save, Sparkles, Sun, Trash2, User, Utensils } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { CountrySelector } from "../components/CountrySelector";
import { DietaryPreferencesForm } from "../components/DietaryPreferencesForm";
const GOAL_ITEMS = [
  { id: "stay_active", key: "onboarding.goalStayActive" },
  { id: "build_strength", key: "onboarding.goalBuildStrength" },
  { id: "improve_stamina", key: "onboarding.goalImproveStamina" },
  { id: "healthy_lifestyle", key: "onboarding.goalHealthyLifestyle" }
];
const LEVEL_ITEMS = [
  { id: "beginner", key: "onboarding.levelBeginner" },
  { id: "moderate", key: "onboarding.levelModerate" },
  { id: "active", key: "onboarding.levelActive" }
];
const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const {
    user,
    updateProfile,
    updateFoodPreferences,
    resetOnboarding,
    logoutUser,
    resetDemoData,
    triggerCelebration
  } = useFitAdda();
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [goal, setGoal] = useState(user.goal);
  const [activityLevel, setActivityLevel] = useState(user.activityLevel);
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState(user.dailyCalorieTarget);
  const [dailyWaterTarget, setDailyWaterTarget] = useState(user.dailyWaterTargetGlasses);
  const [dailyMoveTarget, setDailyMoveTarget] = useState(user.dailyMoveMinutesTarget);
  const [age, setAge] = useState(user.age);
  const [heightCm, setHeightCm] = useState(user.heightCm);
  const [weightKg, setWeightKg] = useState(user.weightKg);
  const [nameError, setNameError] = useState("");
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    updateProfile({ language: lang });
  };
  const handleCountrySelect = (code) => {
    updateProfile({ countryCode: code });
  };
  const toggleNotification = (key) => {
    updateProfile({
      notifications: {
        ...user.notifications,
        [key]: !user.notifications[key]
      }
    });
  };
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(t("settings.nameValidationError"));
      return;
    }
    setNameError("");
    updateProfile({
      name: name.trim(),
      gender,
      goal,
      activityLevel,
      dailyCalorieTarget,
      dailyWaterTargetGlasses: dailyWaterTarget,
      dailyMoveMinutesTarget: dailyMoveTarget,
      age,
      heightCm,
      weightKg
    });
    triggerCelebration(t("settings.profileSavedToast"), t("brand.tagline"));
  };
  return <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.24 }}
    className="space-y-6 max-w-5xl mx-auto"
  >
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
          {t("settings.title")}
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6586] dark:text-[#9CA3AF]">
          {t("settings.subtitle")}
        </p>
      </div>

      {
    /* Language + Theme Row */
  }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {
    /* Language Preferences */
  }
        <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-[#7C3AED]" />
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("settings.languageSection")}
            </h3>
          </div>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            {t("settings.languageDesc")}
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {[
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ur", label: "اردو", flag: "🇵🇰" },
    { code: "roman", label: "Roman Urdu", flag: "🇵🇰" }
  ].map((opt) => {
    const active = language === opt.code;
    return <button
      key={opt.code}
      type="button"
      onClick={() => handleLanguageChange(opt.code)}
      className={`p-3 rounded-xl border text-center space-y-1 transition-all ${active ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] ring-2 ring-[#7C3AED]/20 dark:ring-[#14B8A6]/25" : "border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A]"}`}
    >
                  <span className="text-xl block">{opt.flag}</span>
                  <span className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] block">
                    {opt.label}
                  </span>
                </button>;
  })}
          </div>
        </section>

        {
    /* Theme Settings */
  }
        <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("settings.themeSection")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
    type="button"
    onClick={() => setTheme("light")}
    className={`p-4 rounded-2xl border text-start transition-all space-y-2 ${theme === "light" ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#FAF7FF] ring-2 ring-[#7C3AED]/20 dark:ring-[#14B8A6]/25" : "border-[#EAE3F8] dark:border-[#2E3340]"}`}
  >
              <div className="flex items-center justify-between">
                <Sun size={18} className="text-[#7C3AED]" />
                {theme === "light" && <Check size={15} className="text-[#7C3AED]" />}
              </div>
              <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("common.light")}
              </p>
              <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
                {t("settings.themeLightDesc")}
              </p>
            </button>

            <button
    type="button"
    onClick={() => setTheme("dark")}
    className={`p-4 rounded-2xl border text-start transition-all space-y-2 ${theme === "dark" ? "border-[#14B8A6] bg-[#162726] ring-2 ring-[#14B8A6]/30" : "border-[#EAE3F8] dark:border-[#2E3340]"}`}
  >
              <div className="flex items-center justify-between">
                <Moon size={18} className="text-[#0D9488] dark:text-[#2DD4BF]" />
                {theme === "dark" && <Check size={15} className="text-[#2DD4BF]" />}
              </div>
              <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("common.dark")}
              </p>
              <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF]">
                {t("settings.themeDarkDesc")}
              </p>
            </button>
          </div>
        </section>
      </div>

      {
    /* Country Selector */
  }
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-3">
        <div>
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {t("settings.countrySection")}
          </h3>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
            {t("settings.countryDesc")}
          </p>
        </div>
        <CountrySelector
    selectedCode={user.countryCode}
    onSelect={handleCountrySelect}
    maxHeightClass="max-h-[250px]"
  />
      </section>

      {
    /* Food & Kitchen Personalization (Updates Recommendations Dynamically) */
  }
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Utensils size={18} className="text-[#7C3AED]" />
              <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                {t("dietPrefs.badge")}
              </h3>
            </div>
            <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5">
              {t("dietPrefs.subtitle")}
            </p>
          </div>
          <button
    type="button"
    onClick={() => triggerCelebration(t("dietPrefs.savedToast"), t("diet.localKitchenTitle"))}
    className="btn-3d-secondary px-4 py-2 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#E5E7EB] text-xs font-bold self-start"
  >
            {t("common.save")}
          </button>
        </div>

        <DietaryPreferencesForm
    compact
    value={user.foodPreferences}
    onChange={(next) => updateFoodPreferences(next)}
  />
      </section>

      {
    /* Notifications + Edit Profile */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4 self-start">
          <div className="flex items-center gap-2">
            <Bell size={17} className="text-[#7C3AED]" />
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("settings.notificationsSection")}
            </h3>
          </div>

          <div className="space-y-3">
            {[
    { key: "supportiveReminders", label: t("settings.notifSupportive") },
    { key: "waterNudges", label: t("settings.notifWater") },
    { key: "celebrationAnimations", label: t("settings.notifCelebration") },
    { key: "weeklyDigest", label: t("settings.notifDigest") }
  ].map((item) => {
    const enabled = user.notifications[item.key];
    return <div key={item.key} className="flex items-center justify-between gap-3 py-1">
                  <span className="text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6]">
                    {item.label}
                  </span>
                  <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => toggleNotification(item.key)}
      className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${enabled ? "bg-[#7C3AED] dark:bg-[#0D9488]" : "bg-[#DDD6FE] dark:bg-[#2A2E39]"}`}
    >
                    <span
      className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"}`}
    />
                  </button>
                </div>;
  })}
          </div>
        </section>

        {
    /* Edit Profile Form */
  }
        <form
    onSubmit={handleSaveProfile}
    className="lg:col-span-7 rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-5"
  >
          <div className="flex items-center gap-2">
            <User size={18} className="text-[#7C3AED]" />
            <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
              {t("settings.editProfileSection")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
                {t("settings.displayNameLabel")}
              </label>
              <input
    type="text"
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      if (nameError) setNameError("");
    }}
    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-sm"
  />
              {nameError && <p className="text-xs font-semibold text-[#DC2626] mt-1">{nameError}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
                {t("settings.calorieGuideLabel")}
              </label>
              <input
    type="number"
    value={dailyCalorieTarget}
    onChange={(e) => setDailyCalorieTarget(Number(e.target.value))}
    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-sm tabular-nums"
  />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
                {t("settings.waterTargetLabel")}
              </label>
              <input
    type="number"
    min={1}
    max={16}
    value={dailyWaterTarget}
    onChange={(e) => setDailyWaterTarget(Number(e.target.value))}
    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-sm tabular-nums"
  />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
                {t("settings.moveTargetLabel")}
              </label>
              <input
    type="number"
    min={10}
    max={120}
    value={dailyMoveTarget}
    onChange={(e) => setDailyMoveTarget(Number(e.target.value))}
    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-sm tabular-nums"
  />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:col-span-2">
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("profile.age")}
                </label>
                <input
    type="number"
    value={age}
    onChange={(e) => setAge(Number(e.target.value))}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("profile.height")} ({t("profile.cm")})
                </label>
                <input
    type="number"
    value={heightCm}
    onChange={(e) => setHeightCm(Number(e.target.value))}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
              <div>
                <label className="block text-[11px] text-[#6E6586] dark:text-[#9CA3AF] mb-1">
                  {t("profile.weight")} ({t("profile.kg")})
                </label>
                <input
    type="number"
    value={weightKg}
    onChange={(e) => setWeightKg(Number(e.target.value))}
    className="w-full px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs tabular-nums"
  />
              </div>
            </div>
          </div>

          {
    /* Gender + Goal + Level selectors */
  }
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {["women", "men"].map((g) => <button
    key={g}
    type="button"
    onClick={() => setGender(g)}
    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors ${gender === g ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]" : "border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                  {g === "women" ? t("onboarding.genderWomen") : t("onboarding.genderMen")}
                </button>)}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {GOAL_ITEMS.map((g) => <button
    key={g.id}
    type="button"
    onClick={() => setGoal(g.id)}
    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors ${goal === g.id ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]" : "border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                  {t(g.key)}
                </button>)}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {LEVEL_ITEMS.map((lvl) => <button
    key={lvl.id}
    type="button"
    onClick={() => setActivityLevel(lvl.id)}
    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors ${activityLevel === lvl.id ? "border-[#7C3AED] dark:border-[#14B8A6] bg-[#F5F1FE] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]" : "border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                  {t(lvl.key)}
                </button>)}
            </div>
          </div>

          <button
    type="submit"
    className="btn-3d-primary px-6 py-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold inline-flex items-center gap-2"
  >
            <Save size={15} />
            {t("common.save")}
          </button>
        </form>
      </div>

      {/* Security: Change Password & Delete Account */}
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <KeyRound size={18} className="text-[#7C3AED] dark:text-[#2DD4BF]" />
          <h3 className="text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
            Account Security & Password
          </h3>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const currentPassword = e.target.currentPassword.value;
            const newPassword = e.target.newPassword.value;
            const token = localStorage.getItem("fitadda_token");
            const res = await fetch("http://localhost:5000/api/auth/change-password", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ currentPassword, newPassword })
            });
            const data = await res.json();
            alert(data.message);
            if (res.ok) e.target.reset();
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
        >
          <div>
            <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4C4461] dark:text-[#D1D5DB] mb-1">
              New Password (min 6 chars)
            </label>
            <input
              type="password"
              name="newPassword"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs"
            />
          </div>
          <button
            type="submit"
            className="btn-3d-primary px-4 py-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] text-white text-xs font-bold"
          >
            Update Password
          </button>
        </form>

        <div className="pt-3 border-t border-[#EAE3F8] dark:border-[#2A2E39] flex items-center justify-between">
          <span className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            Permanently delete your account & all MongoDB data
          </span>
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm("Are you sure you want to permanently delete your FitAdda account?")) return;
              const token = localStorage.getItem("fitadda_token");
              await fetch("http://localhost:5000/api/auth/delete-account", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
              });
              logoutUser();
              navigate("/onboarding");
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Trash2 size={14} />
            Delete Account
          </button>
        </div>
      </section>

      {
    /* Onboarding & Demo Data */
  }
      <section className="rounded-2xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
          {t("settings.accountActions")}
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
    type="button"
    onClick={() => {
      resetOnboarding();
      navigate("/onboarding");
    }}
    className="btn-3d-secondary px-4 py-2.5 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#E5E7EB] text-xs font-semibold inline-flex items-center gap-1.5"
  >
            <Sparkles size={14} />
            {t("settings.replayBtn")}
          </button>

          <button
    type="button"
    onClick={() => resetDemoData(t("settings.resetToast"))}
    className="px-4 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB] hover:bg-[#FBF9FF] dark:hover:bg-[#262A34] inline-flex items-center gap-1.5"
  >
            <RotateCcw size={14} />
            {t("settings.resetBtn")}
          </button>

          <button
    type="button"
    onClick={() => {
      logoutUser();
      navigate("/auth?mode=login");
    }}
    className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
  >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </section>
    </motion.div>;
};
export {
  Settings
};