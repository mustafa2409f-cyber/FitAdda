import { TiltCard } from "./TiltCard";
const TONE_CLASSES = {
  purple: "bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]",
  pink: "bg-[#FCE7F3] dark:bg-[#2A2228] text-[#DB2777] dark:text-[#F472B6]",
  emerald: "bg-[#ECFDF5] dark:bg-[#143329] text-[#059669] dark:text-[#34D399]",
  amber: "bg-[#FEF3C7] dark:bg-[#3A2B14] text-[#D97706] dark:text-[#FBBF24]"
};
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "purple"
}) => {
  return <TiltCard className="p-5 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#6E6586] dark:text-[#9CA3AF] truncate">
          {title}
        </p>
        <p className="text-2xl font-bold tabular-nums text-[#1E1B2E] dark:text-[#F3F4F6] mt-1">
          {value}
        </p>
        {subtitle && <p className="text-xs font-medium text-[#7C3AED] dark:text-[#2DD4BF] mt-1 truncate">
            {subtitle}
          </p>}
      </div>
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${TONE_CLASSES[tone]}`}>
        <Icon size={20} />
      </div>
    </TiltCard>;
};
export {
  StatCard
};
