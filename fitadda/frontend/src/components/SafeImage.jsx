import { useState } from "react";
import { Dumbbell, Sparkles, Utensils } from "lucide-react";
const SafeImage = ({
  src,
  alt,
  className = "",
  fallbackType = "workout"
}) => {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    const Icon = fallbackType === "meal" ? Utensils : fallbackType === "character" ? Sparkles : Dumbbell;
    return <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3EEFF] via-[#FAF7FF] to-[#FCE7F3] dark:from-[#1A1C23] dark:via-[#181A20] dark:to-[#1F222A] text-[#7C3AED] dark:text-[#2DD4BF] p-4 text-center ${className}`}
    >
        <Icon size={28} className="mb-1.5 opacity-80" />
        <span className="text-xs font-medium opacity-75 line-clamp-2">{alt}</span>
      </div>;
  }
  return <img
    src={src}
    alt={alt}
    referrerPolicy="no-referrer"
    onError={() => setFailed(true)}
    className={className}
  />;
};
export {
  SafeImage
};
