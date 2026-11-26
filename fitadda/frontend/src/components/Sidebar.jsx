import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Apple,
  Dumbbell,
  Flame,
  Home,
  LogOut,
  RotateCcw,
  Settings,
  TrendingUp,
  Trophy,
  User,
  X
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useFitAdda } from "../context/FitAddaContext";
import { FITADDA_LOGO } from "../data/assets";
const NAV_ITEMS = [
  { to: "/", labelKey: "nav.home", icon: Home },
  { to: "/workouts", labelKey: "nav.workouts", icon: Dumbbell },
  { to: "/diet", labelKey: "nav.dietPlan", icon: Apple },
  { to: "/nutrition", labelKey: "nav.nutrition", icon: Flame },
  { to: "/progress", labelKey: "nav.progress", icon: TrendingUp },
  { to: "/challenges", labelKey: "nav.challenges", icon: Trophy },
  { to: "/profile", labelKey: "nav.profile", icon: User },
  { to: "/settings", labelKey: "nav.settings", icon: Settings }
];
const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const { t, isRTL } = useLanguage();
  const { resetOnboarding, logoutUser } = useFitAdda();
  const navigate = useNavigate();
  const handleReplayOnboarding = () => {
    resetOnboarding();
    onCloseMobile();
    navigate("/onboarding");
  };
  const handleLogout = () => {
    logoutUser();
    onCloseMobile();
    navigate("/auth?mode=login");
  };
  const navContent = <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        {
    /* Brand Logo */
  }
        <div className="flex items-center justify-between gap-2 px-1 pt-1">
          <div className="flex-1 flex items-center justify-center rounded-2xl bg-white p-2 border border-[#EAE3F8] dark:border-[#2E3340] shadow-xs">
            <img
    src={FITADDA_LOGO}
    alt={t("brand.name")}
    className="w-full max-w-[176px] h-auto max-h-28 object-contain"
  />
          </div>

          <button
    type="button"
    onClick={onCloseMobile}
    aria-label={t("nav.closeMenu")}
    className="lg:hidden p-2 rounded-xl text-[#6E6586] hover:bg-[#F3EEFF] dark:hover:bg-[#262A34]"
  >
            <X size={18} />
          </button>
        </div>

        {
    /* Navigation Links */
  }
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
    const Icon = item.icon;
    return <NavLink
      key={item.to}
      to={item.to}
      end={item.to === "/"}
      onClick={onCloseMobile}
      className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${isActive ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white shadow-[0_6px_16px_-4px_rgba(124,58,237,0.4)] dark:shadow-[0_6px_16px_-4px_rgba(13,148,136,0.45)]" : "text-[#4C4461] dark:text-[#D1D5DB] hover:bg-[#F3EEFF] dark:hover:bg-[#262A34] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF]"}`}
    >
                <Icon size={17} className="shrink-0" />
                <span className="truncate">{t(item.labelKey)}</span>
              </NavLink>;
  })}
        </nav>
      </div>

      {
    /* Bottom Mascot Quick Replay Onboarding & Logout */
  }
      <div className="pt-4 border-t border-[#EAE3F8] dark:border-[#2A2E39] space-y-1">
        <button
    type="button"
    onClick={handleReplayOnboarding}
    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#6E6586] dark:text-[#9CA3AF] hover:bg-[#F3EEFF] dark:hover:bg-[#262A34] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF] transition-colors"
  >
          <RotateCcw size={15} className="shrink-0" />
          <span className="truncate">{t("nav.replayOnboarding")}</span>
        </button>

        <button
    type="button"
    onClick={handleLogout}
    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
  >
          <LogOut size={15} className="shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </div>;
  return <>
      {
    /* Desktop Permanent Sidebar */
  }
      <aside className="hidden lg:block w-64 shrink-0 border-e border-[#EAE3F8] dark:border-[#2A2E39] bg-white/90 dark:bg-[#181A20]/95 glass-card sticky top-0 h-screen">
        {navContent}
      </aside>

      {
    /* Mobile Animated Navigation Drawer */
  }
      <AnimatePresence>
        {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onCloseMobile}
    className="fixed inset-0 bg-[#1E1B2E]/50 backdrop-blur-xs"
  />
            <motion.aside
    initial={{ x: isRTL ? 280 : -280 }}
    animate={{ x: 0 }}
    exit={{ x: isRTL ? 280 : -280 }}
    transition={{ type: "spring", stiffness: 360, damping: 32 }}
    className={`fixed top-0 bottom-0 ${isRTL ? "right-0 border-s" : "left-0 border-e"} w-72 bg-white dark:bg-[#181A20] border-[#EAE3F8] dark:border-[#2A2E39] shadow-2xl z-10`}
  >
              {navContent}
            </motion.aside>
          </div>}
      </AnimatePresence>
    </>;
};
export {
  Sidebar
};