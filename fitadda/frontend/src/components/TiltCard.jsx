import { useState } from "react";
import { motion } from "motion/react";
const TiltCard = ({
  children,
  className = "",
  selected = false,
  onClick,
  tiltStrength = 5
}) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * tiltStrength).toFixed(2)),
      rotateY: Number((x * tiltStrength).toFixed(2))
    });
  };
  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };
  return <motion.div
    onMouseMove={handleMouseMove}
    onMouseLeave={resetTilt}
    onClick={onClick}
    animate={{
      rotateX: tilt.rotateX,
      rotateY: tilt.rotateY,
      scale: selected ? 1.015 : 1
    }}
    whileTap={onClick ? { scale: 0.985 } : void 0}
    transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.6 }}
    style={{ transformStyle: "preserve-3d", perspective: 900 }}
    className={`rounded-2xl border transition-all duration-200 ${selected ? "border-[#7C3AED] dark:border-[#14B8A6] bg-white dark:bg-[#162726] ring-2 ring-[#7C3AED]/20 dark:ring-[#14B8A6]/30 shadow-[0_12px_28px_-10px_rgba(124,58,237,0.28)] dark:shadow-[0_12px_28px_-10px_rgba(20,184,166,0.22)]" : "border-[#EAE3F8] dark:border-[#2A2E39] bg-white/95 dark:bg-[#181A20]/95 shadow-[0_6px_20px_-8px_rgba(124,58,237,0.1)] hover:border-[#C4B5FD] dark:hover:border-[#4B5563] hover:shadow-[0_12px_24px_-10px_rgba(124,58,237,0.18)]"} ${className}`}
  >
      {children}
    </motion.div>;
};
export {
  TiltCard
};
