import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
const AnimatedCheckmark = ({
  checked,
  size = "md",
  tone = "purple"
}) => {
  const dim = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const iconSize = size === "sm" ? 12 : 14;
  const activeBg = tone === "pink" ? "bg-[#EC4899] border-[#EC4899] shadow-[#EC4899]/30" : "bg-[#7C3AED] dark:bg-[#0D9488] border-[#7C3AED] dark:border-[#14B8A6] shadow-[#7C3AED]/30 dark:shadow-[#0D9488]/30";
  return <div
    className={`${dim} rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 ${checked ? `${activeBg} text-white shadow-md` : "border-[#D8CEF2] dark:border-[#363B48] bg-white dark:bg-[#1F222A]"}`}
  >
      <AnimatePresence mode="wait">
        {checked && <motion.span
    key="check"
    initial={{ scale: 0.2, rotate: -25, opacity: 0 }}
    animate={{ scale: 1, rotate: 0, opacity: 1 }}
    exit={{ scale: 0.2, opacity: 0 }}
    transition={{ type: "spring", stiffness: 520, damping: 22 }}
    className="flex items-center justify-center"
  >
            <Check size={iconSize} strokeWidth={3} />
          </motion.span>}
      </AnimatePresence>
    </div>;
};
export {
  AnimatedCheckmark
};
