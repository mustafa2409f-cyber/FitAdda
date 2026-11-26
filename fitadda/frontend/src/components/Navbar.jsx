import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  ChevronDown,
  Dumbbell,
  Menu,
  Moon,
  RotateCcw,
  Search,
  Settings,
  Sun,
  User,
  Utensils,
  X
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useFitAdda } from "../context/FitAddaContext";
import { EXERCISES_LIBRARY } from "../data/mockData";
import { getBrowseableMealsForUser } from "../utils/dietEngine";
import { FITADDA_ASSETS, FITADDA_LOGO } from "../data/assets";
import { getCountryByCode } from "../data/countries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SafeImage } from "./SafeImage";
const ROUTE_TITLES = {
  "/": "nav.home",
  "/workouts": "nav.workouts",
  "/diet": "nav.dietPlan",
  "/nutrition": "nav.nutrition",
  "/progress": "nav.progress",
  "/challenges": "nav.challenges",
  "/profile": "nav.profile",
  "/settings": "nav.settings"
};
const Navbar = ({ onOpenMobileMenu }) => {
  const { t, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, notifications, markAllNotificationsRead, resetOnboarding } = useFitAdda();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const pageTitleKey = ROUTE_TITLES[location.pathname] || "nav.home";
  const country = getCountryByCode(user.countryCode);
  const avatarImg = user.avatarUrl || (user.gender === "men" ? FITADDA_ASSETS.maleAthlete : FITADDA_ASSETS.femaleAthlete);
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const workoutMatches = EXERCISES_LIBRARY.map((ex) => ({
      id: ex.id,
      type: "workout",
      title: t(`${ex.titleKey}.title`),
      sub: `${t(`workouts.categories.${ex.category}`)} · ${ex.calories} ${t("common.kcal")}`,
      to: "/workouts"
    })).filter((item) => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q));
    const mealMatches = getBrowseableMealsForUser(user).map((meal) => ({
      id: meal.id,
      type: "meal",
      title: meal.names[language],
      sub: `${t(`diet.categories.${meal.category}`)} · ${meal.calories} ${t("common.kcal")}`,
      to: "/diet"
    })).filter((item) => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q));
    return [...workoutMatches, ...mealMatches].slice(0, 6);
  }, [searchQuery, t, user, language]);
  return <header className="sticky top-0 z-30 border-b border-[#EAE3F8] dark:border-[#2A2E39] bg-white/85 dark:bg-[#181A20]/90 glass-card px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {
    /* Left: Mobile drawer button + Active Page Title */
  }
        <div className="flex items-center gap-3 min-w-0">
          <button
    type="button"
    onClick={onOpenMobileMenu}
    aria-label={t("nav.openMenu")}
    className="lg:hidden p-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-white dark:bg-[#1F222A] text-[#1E1B2E] dark:text-[#F3F4F6]"
  >
            <Menu size={18} />
          </button>

          <div className="lg:hidden rounded-xl bg-white px-1.5 py-0.5 border border-[#EAE3F8] dark:border-[#2E3340] shrink-0">
            <img
    src={FITADDA_LOGO}
    alt={t("brand.name")}
    className="h-9 w-auto object-contain"
  />
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
              {t(pageTitleKey)}
            </h1>
          </div>
        </div>

        {
    /* Middle: Working Global Search */
  }
        <div className="hidden md:block relative flex-1 max-w-md mx-2">
          <Search
    size={15}
    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]"
  />
          <input
    type="text"
    value={searchQuery}
    onFocus={() => setSearchFocused(true)}
    onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder={t("common.search")}
    className="w-full ps-9 pe-8 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] placeholder:text-[#8E84A8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 dark:focus:ring-[#14B8A6]/35"
  />
          {searchQuery && <button
    type="button"
    onClick={() => setSearchQuery("")}
    aria-label={t("common.clearFilters")}
    className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#6E6586] hover:text-[#1E1B2E]"
  >
              <X size={13} />
            </button>}

          {
    /* Instant Search Dropdown */
  }
          <AnimatePresence>
            {searchFocused && searchQuery.trim().length > 0 && <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    className="absolute top-full mt-2 inset-x-0 rounded-2xl border border-[#EAE3F8] dark:border-[#2E3340] bg-white dark:bg-[#181A20] shadow-xl overflow-hidden z-40"
  >
                {searchResults.length === 0 ? <p className="p-4 text-xs text-[#6E6586] dark:text-[#9CA3AF] text-center">
                    {t("nav.searchNoMatch")}
                  </p> : <div className="divide-y divide-[#F3EEFF] dark:divide-[#2A2E39]">
                    {searchResults.map((item) => <button
    key={`${item.type}-${item.id}`}
    type="button"
    onMouseDown={() => {
      navigate(item.to);
      setSearchQuery("");
      setSearchFocused(false);
    }}
    className="w-full px-4 py-2.5 text-start flex items-center gap-3 hover:bg-[#F5F1FE] dark:hover:bg-[#262A34] transition-colors"
  >
                        <span className="w-7 h-7 rounded-lg bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                          {item.type === "workout" ? <Dumbbell size={13} /> : <Utensils size={13} />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF] truncate">
                            {item.sub}
                          </p>
                        </div>
                      </button>)}
                  </div>}
              </motion.div>}
          </AnimatePresence>
        </div>

        {
    /* Right: Language Switcher + Theme Toggle + Notifications + Profile Menu */
  }
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block">
            <LanguageSwitcher compact />
          </div>

          {
    /* Theme Toggle */
  }
          <button
    type="button"
    onClick={toggleTheme}
    aria-label={theme === "light" ? t("common.dark") : t("common.light")}
    className="w-9 h-9 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF] flex items-center justify-center transition-colors"
  >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {
    /* Notifications Dropdown */
  }
          <div className="relative">
            <button
    type="button"
    onClick={() => {
      setNotifOpen((v) => !v);
      setProfileOpen(false);
    }}
    aria-label={t("nav.notifications")}
    className="relative w-9 h-9 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-[#4C4461] dark:text-[#E5E7EB] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF] flex items-center justify-center transition-colors"
  >
              <Bell size={16} />
              {unreadCount > 0 && <span className="absolute -top-1 -end-1 min-w-[16px] h-4 px-1 rounded-full bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {unreadCount}
                </span>}
            </button>

            <AnimatePresence>
              {notifOpen && <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.96 }}
    className="absolute end-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#EAE3F8] dark:border-[#2E3340] bg-white dark:bg-[#181A20] shadow-2xl p-4 space-y-3 z-40"
  >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                      {t("nav.notifications")}
                    </p>
                    <button
    type="button"
    onClick={markAllNotificationsRead}
    className="text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
  >
                      {t("nav.markAllRead")}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {notifications.map((n) => <div
    key={n.id}
    className={`p-3 rounded-xl border text-xs transition-colors ${n.read ? "border-[#F0EBFA] dark:border-[#2A2E39] bg-[#FBF9FF] dark:bg-[#1F222A]" : "border-[#DDD6FE] dark:border-[#4B5563] bg-[#F5F1FE] dark:bg-[#262A34]"}`}
  >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                            {t(n.titleKey)}
                          </p>
                          <span className="text-[10px] text-[#6E6586] dark:text-[#9CA3AF] tabular-nums">
                            {n.timeLabel}
                          </span>
                        </div>
                        <p className="text-[#4C4461] dark:text-[#D1D5DB] mt-1 leading-relaxed">
                          {t(n.bodyKey)}
                        </p>
                      </div>)}
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>

          {
    /* Profile Menu */
  }
          <div className="relative">
            <button
    type="button"
    onClick={() => {
      setProfileOpen((v) => !v);
      setNotifOpen(false);
    }}
    className="flex items-center gap-2 p-1 pe-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] hover:border-[#C4B5FD] transition-colors"
  >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#EDE9FE] shrink-0">
                <SafeImage
    src={avatarImg}
    alt={user.name || t("common.friend")}
    className="w-full h-full object-cover object-top"
    fallbackType="character"
  />
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] max-w-[90px] truncate">
                {user.name || t("common.friend")}
              </span>
              {country && <span className="text-xs leading-none">{country.flag}</span>}
              <ChevronDown size={13} className="text-[#6E6586]" />
            </button>

            <AnimatePresence>
              {profileOpen && <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.96 }}
    className="absolute end-0 mt-2 w-56 rounded-2xl border border-[#EAE3F8] dark:border-[#2E3340] bg-white dark:bg-[#181A20] shadow-2xl p-2 space-y-1 z-40"
  >
                  <div className="px-3 py-2 border-b border-[#F0EBFA] dark:border-[#2A2E39]">
                    <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                      {user.name || t("common.friend")}
                    </p>
                    <p className="text-[11px] text-[#6E6586] dark:text-[#9CA3AF] truncate">
                      {country ? `${country.flag} ${country.name[language]}` : "FitAdda"}
                    </p>
                  </div>

                  <div className="sm:hidden px-2 py-1.5">
                    <LanguageSwitcher compact />
                  </div>

                  <button
    type="button"
    onClick={() => {
      setProfileOpen(false);
      navigate("/profile");
    }}
    className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] hover:bg-[#F5F1FE] dark:hover:bg-[#262A34] flex items-center gap-2"
  >
                    <User size={14} className="text-[#7C3AED]" />
                    {t("nav.profile")}
                  </button>
                  <button
    type="button"
    onClick={() => {
      setProfileOpen(false);
      navigate("/settings");
    }}
    className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] hover:bg-[#F5F1FE] dark:hover:bg-[#262A34] flex items-center gap-2"
  >
                    <Settings size={14} className="text-[#7C3AED]" />
                    {t("nav.settings")}
                  </button>
                  <button
    type="button"
    onClick={() => {
      setProfileOpen(false);
      resetOnboarding();
      navigate("/onboarding");
    }}
    className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#6E6586] dark:text-[#9CA3AF] hover:bg-[#F5F1FE] dark:hover:bg-[#262A34] flex items-center gap-2"
  >
                    <RotateCcw size={14} />
                    {t("nav.replayOnboarding")}
                  </button>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>;
};
export {
  Navbar
};