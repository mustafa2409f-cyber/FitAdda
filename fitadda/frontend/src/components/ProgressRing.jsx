import { motion } from "motion/react";
const ProgressRing = ({
  value,
  max,
  size = 92,
  strokeWidth = 8,
  color = "#7C3AED",
  trackColor,
  label,
  sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const strokeDashoffset = circumference * (1 - pct);
  return <div
    className="relative inline-flex items-center justify-center shrink-0"
    style={{ width: size, height: size }}
  >
      <svg width={size} height={size} className="-rotate-90">
        <circle
    cx={size / 2}
    cy={size / 2}
    r={radius}
    fill="none"
    stroke={trackColor || "currentColor"}
    className={trackColor ? "" : "text-[#EDE9FE] dark:text-[#2A2E39]"}
    strokeWidth={strokeWidth}
  />
        <motion.circle
    cx={size / 2}
    cy={size / 2}
    r={radius}
    fill="none"
    stroke={color === "#7C3AED" ? "currentColor" : color}
    className={color === "#7C3AED" ? "text-[#7C3AED] dark:text-[#14B8A6]" : ""}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeDasharray={circumference}
    initial={{ strokeDashoffset: circumference }}
    animate={{ strokeDashoffset }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  />
      </svg>
      {(label || sublabel) && <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {label && <span className="text-sm font-bold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6] leading-none">
              {label}
            </span>}
          {sublabel && <span className="text-[10px] font-medium text-[#6E6586] dark:text-[#9CA3AF] mt-0.5 leading-none">
              {sublabel}
            </span>}
        </div>}
    </div>;
};
export {
  ProgressRing
};
