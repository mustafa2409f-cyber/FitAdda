import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { MilkMascot } from "./MilkMascot";
const CelebrationToast = () => {
  const { celebration, dismissCelebration } = useFitAdda();
  return <div className="fixed bottom-5 right-5 z-50 pointer-events-none max-w-sm w-[calc(100%-2.5rem)] sm:w-auto">
      <AnimatePresence>
        {celebration && <motion.div
    key={celebration.id}
    initial={{ opacity: 0, y: 24, scale: 0.92 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 16, scale: 0.94 }}
    transition={{ type: "spring", stiffness: 380, damping: 26 }}
    className="pointer-events-auto flex items-center gap-3.5 rounded-2xl bg-white/95 dark:bg-[#1F222A]/95 glass-card border border-[#DDD6FE] dark:border-[#363B48] p-3.5 shadow-[0_18px_40px_-14px_rgba(124,58,237,0.32)]"
  >
            <MilkMascot mood="celebrate" size="sm" interactive={false} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-snug">
                {celebration.title}
              </p>
              <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-0.5 leading-relaxed">
                {celebration.subtitle}
              </p>
            </div>
            <button
    onClick={dismissCelebration}
    aria-label="Close notification"
    className="p-1.5 rounded-lg text-[#6E6586] hover:text-[#1E1B2E] dark:hover:text-white hover:bg-[#F3EEFF] dark:hover:bg-[#2D323E] transition-colors"
  >
              <X size={15} />
            </button>
          </motion.div>}
      </AnimatePresence>
    </div>;
};
export {
  CelebrationToast
};
