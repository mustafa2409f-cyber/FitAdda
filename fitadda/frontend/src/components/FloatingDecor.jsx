import { Dumbbell, Heart, Sparkles, Star } from "lucide-react";
const FloatingDecor = ({
  variant = "subtle"
}) => {
  return <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 overflow-hidden z-0"
  >
      {
    /* Ambient atmosphere blobs */
  }
      <div
    className={`absolute -top-28 -left-24 rounded-full blur-3xl transition-opacity duration-500 ${variant === "hero" ? "w-[440px] h-[440px] opacity-65" : "w-[340px] h-[340px] opacity-35"} bg-[#DDD6FE]/60 dark:bg-white/[0.03]`}
  />
      <div
    className={`absolute top-1/3 -right-28 rounded-full blur-3xl transition-opacity duration-500 ${variant === "hero" ? "w-[400px] h-[400px] opacity-55" : "w-[320px] h-[320px] opacity-30"} bg-[#FBCFE8]/50 dark:bg-white/[0.025]`}
  />
      <div
    className={`hidden md:block absolute -bottom-24 left-1/3 rounded-full blur-3xl ${variant === "hero" ? "w-[320px] h-[320px] opacity-45" : "w-[260px] h-[260px] opacity-20"} bg-[#C4B5FD]/45 dark:bg-white/[0.02]`}
  />

      {
    /* Gentle floating decorative particles */
  }
      <div className="hidden md:flex absolute top-20 left-[9%] text-[#A78BFA]/45 dark:text-white/10 animate-float-slow">
        <Sparkles size={20} />
      </div>
      <div className="hidden md:flex absolute top-44 right-[10%] text-[#F472B6]/45 dark:text-white/10 animate-float-reverse">
        <Heart size={18} fill="currentColor" />
      </div>
      <div className="hidden lg:flex absolute bottom-28 left-[14%] text-[#8B5CF6]/35 dark:text-white/10 animate-float-reverse">
        <Star size={17} fill="currentColor" />
      </div>
      {variant === "hero" && <div className="hidden lg:flex absolute bottom-32 right-[13%] text-[#8B5CF6]/40 dark:text-white/10 animate-float-slow">
          <Dumbbell size={20} />
        </div>}
    </div>;
};
export {
  FloatingDecor
};
