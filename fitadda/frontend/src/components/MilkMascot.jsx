import { useState } from "react";
import { motion } from "motion/react";
const SIZE_MAP = {
  sm: 56,
  md: 88,
  lg: 128,
  xl: 168,
  trainer: 224
};
function getPoseMotion(pose, mood) {
  if (mood === "paused" || pose === "paused") {
    return {
      bodyY: [0, -2, 0],
      bodyRotate: [-2, 2, -2],
      leftArmRotate: [-35, -35, -35],
      rightArmRotate: [-12, -22, -12],
      // hand resting thoughtfully near chin
      leftLegY: [0, 0, 0],
      leftLegRotate: [0, 0, 0],
      rightLegY: [0, 0, 0],
      rightLegRotate: [0, 0, 0],
      duration: 2.8
    };
  }
  if (mood === "celebrate" || pose === "celebrate") {
    return {
      bodyY: [0, -14, 0, -10, 0],
      bodyRotate: [-4, 4, -4, 3, 0],
      leftArmRotate: [48, 72, 48, 70, 48],
      rightArmRotate: [-48, -72, -48, -70, -48],
      leftLegY: [0, -4, 0, -3, 0],
      leftLegRotate: [0, 10, 0, 8, 0],
      rightLegY: [0, -4, 0, -3, 0],
      rightLegRotate: [0, -10, 0, -8, 0],
      duration: 1.5
    };
  }
  switch (pose) {
    case "march":
      return {
        bodyY: [0, -6, 0, -6, 0],
        bodyRotate: [-3, 3, -3, 3, -3],
        leftArmRotate: [-35, 38, -35, 38, -35],
        rightArmRotate: [-38, 35, -38, 35, -38],
        leftLegY: [0, -11, 0, 0, 0],
        leftLegRotate: [0, 14, 0, -4, 0],
        rightLegY: [0, 0, 0, -11, 0],
        rightLegRotate: [0, 4, 0, -14, 0],
        duration: 1.2
      };
    case "easy_walk":
      return {
        bodyY: [0, -4, 0, -4, 0],
        bodyRotate: [-2, 2, -2, 2, -2],
        leftArmRotate: [-22, 22, -22, 22, -22],
        rightArmRotate: [-22, 22, -22, 22, -22],
        leftLegY: [0, -6, 0, 0, 0],
        leftLegRotate: [-6, 10, -6, 0, -6],
        rightLegY: [0, 0, 0, -6, 0],
        rightLegRotate: [6, 0, 6, -10, 6],
        duration: 1.5
      };
    case "arm_circles":
      return {
        bodyY: [0, -3, 0],
        bodyRotate: [0, 0, 0],
        leftArmRotate: [0, 42, 0, -35, 0],
        rightArmRotate: [0, -42, 0, 35, 0],
        leftLegY: [0, 0, 0],
        leftLegRotate: [0, 0, 0],
        rightLegY: [0, 0, 0],
        rightLegRotate: [0, 0, 0],
        duration: 1.8
      };
    case "wall_pushup":
    case "pushup_floor":
      return {
        bodyY: [0, 4, 0],
        bodyX: [0, 6, 0],
        bodyRotate: [5, 13, 5],
        leftArmRotate: [10, 26, 10],
        rightArmRotate: [-12, 18, -12],
        leftLegY: [0, 0, 0],
        leftLegRotate: [8, 12, 8],
        rightLegY: [0, 0, 0],
        rightLegRotate: [8, 12, 8],
        duration: 1.8,
        showWallLine: pose === "wall_pushup"
      };
    case "squat":
      return {
        bodyY: [0, 14, 14, 0],
        bodyRotate: [0, -3, -3, 0],
        bodyScaleY: [1, 0.94, 0.94, 1],
        leftArmRotate: [-20, 18, 18, -20],
        rightArmRotate: [20, -18, -18, 20],
        leftLegY: [0, -2, -2, 0],
        leftLegRotate: [0, 16, 16, 0],
        rightLegY: [0, -2, -2, 0],
        rightLegRotate: [0, -16, -16, 0],
        duration: 2
      };
    case "knee_raise":
    case "squat_knee":
      return {
        bodyY: [0, 6, -4, 6, -4, 0],
        bodyRotate: [0, -4, 4, -4, 4, 0],
        leftArmRotate: [28, -20, 45, -20, 28],
        rightArmRotate: [-28, 20, -45, 20, -28],
        leftLegY: [0, 0, -14, 0, 0, 0],
        leftLegRotate: [0, 8, 22, 0, 0, 0],
        rightLegY: [0, 0, 0, 0, -14, 0],
        rightLegRotate: [0, -8, 0, 0, -22, 0],
        duration: 2.2
      };
    case "stretch":
    case "back_cobra":
      return {
        bodyY: [0, -4, 0, -4, 0],
        bodyRotate: [-7, 0, 7, 0, -7],
        leftArmRotate: [40, 64, 15, 40, 40],
        rightArmRotate: [-15, -64, -40, -15, -15],
        leftLegY: [0, 0, 0],
        leftLegRotate: [4, 4, 4],
        rightLegY: [0, 0, 0],
        rightLegRotate: [-4, -4, -4],
        duration: 2.8
      };
    case "bicep_curl":
      return {
        bodyY: [0, -2, 0],
        bodyRotate: [0, 0, 0],
        leftArmRotate: [-35, 34, -35],
        rightArmRotate: [35, -34, 35],
        leftLegY: [0, 0, 0],
        leftLegRotate: [0, 0, 0],
        rightLegY: [0, 0, 0],
        rightLegRotate: [0, 0, 0],
        duration: 1.6,
        showDumbbells: true
      };
    case "chest_press":
      return {
        bodyY: [0, -3, 0],
        bodyRotate: [0, 0, 0],
        leftArmRotate: [8, 52, 8],
        rightArmRotate: [-8, -52, -8],
        leftLegY: [0, 0, 0],
        leftLegRotate: [0, 0, 0],
        rightLegY: [0, 0, 0],
        rightLegRotate: [0, 0, 0],
        duration: 1.7,
        showDumbbells: true
      };
    case "lunge":
      return {
        bodyY: [0, 11, 0, 11, 0],
        bodyRotate: [0, 3, 0, -3, 0],
        leftArmRotate: [-18, 22, -18, 22, -18],
        rightArmRotate: [18, -22, 18, -22, 18],
        leftLegY: [0, -3, 0, 2, 0],
        leftLegRotate: [0, 22, 0, -14, 0],
        rightLegY: [0, 2, 0, -3, 0],
        rightLegRotate: [0, 14, 0, -22, 0],
        duration: 2.2
      };
    case "bhangra_bounce":
      return {
        bodyY: [0, -10, 0, -10, 0],
        bodyRotate: [-6, 6, -6, 6, -6],
        leftArmRotate: [50, 72, 42, 70, 50],
        rightArmRotate: [-50, -72, -42, -70, -50],
        leftLegY: [0, -10, 0, -2, 0],
        leftLegRotate: [0, 18, 0, 6, 0],
        rightLegY: [0, -2, 0, -10, 0],
        rightLegRotate: [0, -6, 0, -18, 0],
        duration: 1.15
      };
    case "sun_flow":
      return {
        bodyY: [0, -7, 8, -4, 0],
        bodyRotate: [0, 0, 6, 0, 0],
        leftArmRotate: [-15, 70, 10, 40, -15],
        rightArmRotate: [15, -70, -10, -40, 15],
        leftLegY: [0, 0, 0, 0, 0],
        leftLegRotate: [0, 0, 6, 0, 0],
        rightLegY: [0, 0, 0, 0, 0],
        rightLegRotate: [0, 0, -6, 0, 0],
        duration: 2.6
      };
    case "chef_prep":
      return {
        bodyY: [0, -4, 0, -4, 0],
        bodyRotate: [-3, 2, -3, 2, -3],
        leftArmRotate: [-12, 18, -12, 18, -12],
        rightArmRotate: [12, -26, 12, -26, 12],
        leftLegY: [0, 0, 0, 0, 0],
        leftLegRotate: [0, 0, 0, 0, 0],
        rightLegY: [0, 0, 0, 0, 0],
        rightLegRotate: [0, 0, 0, 0, 0],
        duration: 1.6,
        showChefSpoon: false
      };
    case "chef_cook":
      return {
        bodyY: [0, -5, 0, -5, 0],
        bodyRotate: [-4, 4, -4, 4, -4],
        leftArmRotate: [-15, 10, -15, 10, -15],
        rightArmRotate: [-18, -58, -12, -56, -18],
        // lively wooden-spoon stirring motion
        leftLegY: [0, -2, 0, 0, 0],
        leftLegRotate: [0, 4, 0, 0, 0],
        rightLegY: [0, 0, 0, -2, 0],
        rightLegRotate: [0, 0, 0, -4, 0],
        duration: 1.4,
        showChefSpoon: true
      };
    case "wave":
      return {
        bodyY: [0, -5, 0],
        bodyRotate: [-2, 3, -2],
        leftArmRotate: [-25, -20, -25],
        rightArmRotate: [-42, -74, -42],
        leftLegY: [0, 0, 0],
        leftLegRotate: [0, 0, 0],
        rightLegY: [0, 0, 0],
        rightLegRotate: [0, 0, 0],
        duration: 1.5
      };
    case "idle":
    default:
      return {
        bodyY: [0, -4, 0],
        bodyRotate: mood === "workout" ? [-1.5, 1.5, -1.5] : [-1, 1, -1],
        leftArmRotate: [-20, -8, -20],
        rightArmRotate: mood === "workout" ? [-30, -48, -30] : [20, 8, 20],
        leftLegY: [0, 0, 0],
        leftLegRotate: [0, 0, 0],
        rightLegY: [0, 0, 0],
        rightLegRotate: [0, 0, 0],
        duration: 2.8,
        showDumbbells: mood === "workout"
      };
  }
}
const MilkMascot = ({
  mood = "happy",
  pose = "idle",
  size = "md",
  interactive = true,
  className = ""
}) => {
  const [giggleCount, setGiggleCount] = useState(0);
  const px = SIZE_MAP[size];
  const cfg = getPoseMotion(pose, mood);
  const isCelebratory = mood === "celebrate" || mood === "welcome" || pose === "celebrate";
  const isPaused = mood === "paused" || pose === "paused";
  const isWarning = mood === "warning";
  const isHydrate = mood === "hydrate";
  const isChef = mood === "chef" || pose === "chef_prep" || pose === "chef_cook";
  return <motion.div
    role={interactive ? "button" : void 0}
    tabIndex={interactive ? 0 : void 0}
    aria-label="MilkMate coach"
    onClick={() => interactive && setGiggleCount((c) => c + 1)}
    onKeyDown={(e) => {
      if (interactive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setGiggleCount((c) => c + 1);
      }
    }}
    key={giggleCount}
    initial={giggleCount > 0 ? { scale: 0.9, rotate: -6 } : false}
    animate={{ scale: 1 }}
    transition={{ scale: { type: "spring", stiffness: 420, damping: 16 } }}
    whileHover={interactive ? { scale: 1.06, rotate: 2 } : void 0}
    whileTap={interactive ? { scale: 0.93 } : void 0}
    className={`relative inline-flex items-center justify-center select-none ${interactive ? "cursor-pointer" : ""} ${className}`}
    style={{ width: px, height: Math.round(px * 1.08) }}
  >
      {
    /* Floating celebratory sparkles */
  }
      {isCelebratory && <>
          <motion.span
    animate={{ y: [-2, -10, -2], opacity: [0.5, 1, 0.5], scale: [0.85, 1.2, 0.85] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute -top-1 right-1 text-[#7C3AED] dark:text-[#2DD4BF] text-xs pointer-events-none"
    aria-hidden="true"
  >
            ✦
          </motion.span>
          <motion.span
    animate={{ y: [0, -9, 0], opacity: [0.45, 1, 0.45] }}
    transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
    className="absolute top-3 left-0 text-[#EC4899] text-xs pointer-events-none"
    aria-hidden="true"
  >
            ♥
          </motion.span>
        </>}

      {
    /* Paused thinking dots */
  }
      {isPaused && <motion.div
    animate={{ y: [0, -5, 0], opacity: [0.65, 1, 0.65] }}
    transition={{ duration: 1.8, repeat: Infinity }}
    className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-white/95 dark:bg-[#262A34] border border-[#DDD6FE] dark:border-[#4B5563] text-[10px] font-extrabold text-[#7C3AED] dark:text-[#2DD4BF] shadow-sm pointer-events-none"
    aria-hidden="true"
  >
          • • •
        </motion.div>}

      {
    /* Hydration droplet badge */
  }
      {isHydrate && <motion.span
    animate={{ y: [0, -6, 0], scale: [0.95, 1.12, 0.95] }}
    transition={{ duration: 2.1, repeat: Infinity }}
    className="absolute -top-1 right-1 text-[#38BDF8] text-sm pointer-events-none"
    aria-hidden="true"
  >
          💧
        </motion.span>}

      {
    /* Gentle form warning indicator */
  }
      {isWarning && <motion.span
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 1.4, repeat: Infinity }}
    className="absolute -top-1 right-1 w-5 h-5 rounded-full bg-[#F59E0B] text-white text-[11px] font-black flex items-center justify-center shadow pointer-events-none"
    aria-hidden="true"
  >
          !
        </motion.span>}

      {
    /* Animated cozy aroma steam swirls when Chef MilkMate is cooking */
  }
      {isChef && cfg.showChefSpoon && <>
          <motion.span
    animate={{ y: [2, -10], opacity: [0, 0.9, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
    className="absolute top-2 right-0 text-xs font-bold text-[#F59E0B] pointer-events-none"
    aria-hidden="true"
  >
            ~
          </motion.span>
          <motion.span
    animate={{ y: [4, -12], opacity: [0, 0.8, 0] }}
    transition={{ duration: 2.1, repeat: Infinity, delay: 0.6, ease: "easeOut" }}
    className="absolute top-4 -right-2 text-xs font-bold text-[#14B8A6] pointer-events-none"
    aria-hidden="true"
  >
            ~
          </motion.span>
        </>}

      <svg
    viewBox="0 0 160 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-[0_12px_20px_rgba(124,58,237,0.2)]"
  >
        <defs>
          <linearGradient id="mmCartonFront" x1="44" y1="30" x2="104" y2="132" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FAF8FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <linearGradient id="mmCartonSide" x1="104" y1="36" x2="122" y2="126" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>
          <linearGradient id="mmRoofFront" x1="50" y1="26" x2="102" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <linearGradient id="mmHeadband" x1="42" y1="54" x2="120" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
          <linearGradient id="mmShoeGrad" x1="0" y1="0" x2="20" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>

        {
    /* Optional subtle wall line when demonstrating wall push-up */
  }
        {cfg.showWallLine && <g opacity="0.65">
            <line
    x1="142"
    y1="26"
    x2="142"
    y2="156"
    stroke="#A78BFA"
    strokeWidth="4"
    strokeLinecap="round"
    strokeDasharray="6 5"
  />
            <rect x="139" y="54" width="6" height="46" rx="3" fill="#DDD6FE" />
          </g>}

        {
    /* Soft Floor Shadow */
  }
        <motion.ellipse
    cx="80"
    cy="161"
    rx="36"
    ry="5.5"
    fill="rgba(124, 58, 237, 0.16)"
    animate={{ rx: [36, 31, 36] }}
    transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut" }}
  />

        {
    /* LEFT LEG + SPORTS SHOE */
  }
        <g transform="translate(64, 128)">
          <motion.g
    animate={{
      y: cfg.leftLegY,
      rotate: cfg.leftLegRotate
    }}
    transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut" }}
  >
            {
    /* Leg */
  }
            <path
    d="M0 -2 L-2 17"
    stroke="#6D28D9"
    strokeWidth="5"
    strokeLinecap="round"
  />
            {
    /* Purple Sock Cuff */
  }
            <rect x="-5.5" y="13" width="7" height="4" rx="2" fill="#DDD6FE" />
            {
    /* Cute Purple & White Sports Shoe */
  }
            <path
    d="M-13 21 C-13 17, -9 15, -3 15 L4 15 C6 15, 7 17, 7 21 L7 24 L-13 24 Z"
    fill="url(#mmShoeGrad)"
    stroke="#4C1D95"
    strokeWidth="1.6"
    strokeLinejoin="round"
  />
            {
    /* White sneaker sole + accent stripe */
  }
            <rect x="-13.5" y="22.5" width="21" height="3.2" rx="1.6" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="1.2" />
            <path d="M-7 18.5 L-1 18.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        </g>

        {
    /* RIGHT LEG + SPORTS SHOE */
  }
        <g transform="translate(94, 128)">
          <motion.g
    animate={{
      y: cfg.rightLegY,
      rotate: cfg.rightLegRotate
    }}
    transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut" }}
  >
            {
    /* Leg */
  }
            <path
    d="M0 -2 L2 17"
    stroke="#6D28D9"
    strokeWidth="5"
    strokeLinecap="round"
  />
            {
    /* Sock Cuff */
  }
            <rect x="-1.5" y="13" width="7" height="4" rx="2" fill="#DDD6FE" />
            {
    /* Cute Purple & White Sports Shoe */
  }
            <path
    d="M-6 21 C-6 17, -5 15, -2 15 L5 15 C11 15, 15 17, 15 21 L15 24 L-6 24 Z"
    fill="url(#mmShoeGrad)"
    stroke="#4C1D95"
    strokeWidth="1.6"
    strokeLinejoin="round"
  />
            <rect x="-6.5" y="22.5" width="22" height="3.2" rx="1.6" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="1.2" />
            <path d="M2 18.5 L8 18.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        </g>

        {
    /* MAIN TORSO + ARMS (Carton Body) */
  }
        <g transform="translate(80, 92)">
          <motion.g
    animate={{
      y: cfg.bodyY,
      x: cfg.bodyX ?? 0,
      rotate: cfg.bodyRotate,
      scaleY: cfg.bodyScaleY ?? 1
    }}
    transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut" }}
  >
            {
    /* Back/Left Headband Ribbon Tails */
  }
            <motion.path
    d="M-36 -33 Q-46 -37 -49 -30 Q-43 -27 -36 -29 Z"
    fill="#8B5CF6"
    animate={{ rotate: [-6, 8, -6] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
  />
            <motion.path
    d="M-36 -30 Q-47 -28 -48 -21 Q-41 -21 -35 -26 Z"
    fill="#6D28D9"
    animate={{ rotate: [5, -7, 5] }}
    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
  />

            {
    /* LEFT ARM (pivot at left shoulder -36, -6) */
  }
            <g transform="translate(-36, -6)">
              <motion.g
    animate={{ rotate: cfg.leftArmRotate }}
    transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut" }}
  >
                <path
    d="M0 0 Q-12 2 -21 -1"
    stroke="#6D28D9"
    strokeWidth="5"
    strokeLinecap="round"
    fill="none"
  />
                {
    /* Purple Wristband */
  }
                <rect x="-18" y="-4" width="5" height="6" rx="2" fill="#A78BFA" stroke="#5B21B6" strokeWidth="1" />
                {
    /* Hand */
  }
                <circle cx="-23" cy="-1" r="4.8" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="2.2" />
                {cfg.showDumbbells && <g transform="translate(-28, -9) rotate(12)">
                    <rect x="0" y="5" width="12" height="3" rx="1.5" fill="#4C4461" />
                    <rect x="-2" y="1" width="4" height="10" rx="1.8" fill="#7C3AED" />
                    <rect x="10" y="1" width="4" height="10" rx="1.8" fill="#7C3AED" />
                  </g>}
              </motion.g>
            </g>

            {
    /* 3D MILK CARTON BODY (Centered at 0,0 -> Front x:-36..24, 3D side x:24..40) */
  }
            {
    /* Top Sealed Ridge */
  }
            <rect
    x="-28"
    y="-70"
    width="52"
    height="8"
    rx="3"
    fill="#EDE9FE"
    stroke="#6D28D9"
    strokeWidth="2.4"
  />
            {
    /* Front Slanted Gable Roof */
  }
            <path
    d="M-36 -44 L-28 -62 L24 -62 L24 -44 Z"
    fill="url(#mmRoofFront)"
    stroke="#6D28D9"
    strokeWidth="2.4"
    strokeLinejoin="round"
  />
            {
    /* 3D Side Gable Triangle */
  }
            <path
    d="M24 -62 L40 -48 L24 -44 Z"
    fill="#DDD6FE"
    stroke="#6D28D9"
    strokeWidth="2.4"
    strokeLinejoin="round"
  />
            {
    /* Carton Cap on 3D roof */
  }
            <ellipse cx="14" cy="-54" rx="5.5" ry="3.2" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1.6" />
            <rect x="9.5" y="-57.5" width="9" height="3.5" rx="1.5" fill="#A78BFA" stroke="#5B21B6" strokeWidth="1.4" />

            {
    /* Fluffy White Chef Hat (Toque) when MilkMate is teaching a recipe */
  }
            {isChef && <g transform="translate(-4, -71)">
                <path
    d="M-21 4 C-27 -6, -18 -18, -7 -15 C-3 -23, 11 -23, 15 -15 C26 -17, 32 -5, 25 4 Z"
    fill="#FFFFFF"
    stroke="#6D28D9"
    strokeWidth="2.2"
    strokeLinejoin="round"
  />
                <rect
    x="-19"
    y="2"
    width="42"
    height="9"
    rx="3"
    fill="#F5F3FF"
    stroke="#6D28D9"
    strokeWidth="2"
  />
                <line x1="-10" y1="-10" x2="-8" y2="1" stroke="#DDD6FE" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="3" y1="-12" x2="3" y2="1" stroke="#DDD6FE" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="15" y1="-10" x2="13" y2="1" stroke="#DDD6FE" strokeWidth="1.8" strokeLinecap="round" />
              </g>}

            {
    /* Front White Carton Panel */
  }
            <path
    d="M-36 -44 L24 -44 L24 34 C24 38, 21 41, 17 41 L-29 41 C-33 41, -36 38, -36 34 Z"
    fill="url(#mmCartonFront)"
    stroke="#6D28D9"
    strokeWidth="2.6"
    strokeLinejoin="round"
  />
            {
    /* 3D Lavender Right Side Panel */
  }
            <path
    d="M24 -44 L40 -48 L40 27 C40 31, 38 33, 35 35 L24 40 Z"
    fill="url(#mmCartonSide)"
    stroke="#6D28D9"
    strokeWidth="2.5"
    strokeLinejoin="round"
  />
            {
    /* Subtle carton highlight */
  }
            <rect x="-30" y="-22" width="4" height="52" rx="2" fill="rgba(255,255,255,0.85)" />

            {
    /* Subtle Milk Drop & FitAdda Label on lower carton */
  }
            <path
    d="M-6 17 C-6 17, -11 23.5, -11 27 A5 5 0 0 0 -1 27 C-1 23.5, -6 17, -6 17 Z"
    fill="#DDD6FE"
    stroke="#8B5CF6"
    strokeWidth="1.3"
  />
            <rect x="-18" y="34" width="24" height="3" rx="1.5" fill="#EDE9FE" />

            {
    /* PURPLE FITNESS HEADBAND across forehead */
  }
            <path
    d="M-37 -37 L25 -37 L41 -41 L41 -33 L25 -29 L-37 -29 Z"
    fill="url(#mmHeadband)"
    stroke="#4C1D95"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
            {
    /* Golden Star Crest on Headband */
  }
            <circle cx="-6" cy="-33" r="4.2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
            <circle cx="-6" cy="-33" r="1.8" fill="#F59E0B" />

            {
    /* EXPRESSIVE ANIME FACE (centered around x = -6) */
  }
            {isCelebratory ? <g>
                {
    /* Happy curved anime eyes ^ ^ */
  }
                <path
    d="M-24 -12 Q-19 -18 -14 -12"
    stroke="#1E1B2E"
    strokeWidth="2.8"
    strokeLinecap="round"
    fill="none"
  />
                <path
    d="M2 -12 Q7 -18 12 -12"
    stroke="#1E1B2E"
    strokeWidth="2.8"
    strokeLinecap="round"
    fill="none"
  />
              </g> : isPaused ? <g>
                {
    /* Thoughtful looking-up eyes */
  }
                <ellipse cx="-19" cy="-13" rx="4.2" ry="4.4" fill="#1E1B2E" />
                <circle cx="-17.5" cy="-15" r="1.6" fill="#FFFFFF" />
                <ellipse cx="7" cy="-13" rx="4.2" ry="4.4" fill="#1E1B2E" />
                <circle cx="8.5" cy="-15" r="1.6" fill="#FFFFFF" />
                {
    /* Cute thinking eyebrow */
  }
                <path d="M-24 -20 Q-19 -22 -14 -19.5" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M2 -21 Q7 -24 12 -21" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" />
              </g> : <motion.g
    animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
    transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.46, 0.49, 0.53, 1] }}
    style={{ transformOrigin: "-6px -13px" }}
  >
                {
    /* Left Anime Eye */
  }
                <ellipse cx="-19" cy="-13" rx="4.4" ry="5.6" fill="#1E1B2E" />
                <circle cx="-17.3" cy="-15" r="1.8" fill="#FFFFFF" />
                <circle cx="-20.2" cy="-10.8" r="1" fill="#DDD6FE" />

                {
    /* Right Anime Eye */
  }
                <ellipse cx="7" cy="-13" rx="4.4" ry="5.6" fill="#1E1B2E" />
                <circle cx="8.7" cy="-15" r="1.8" fill="#FFFFFF" />
                <circle cx="5.8" cy="-10.8" r="1" fill="#DDD6FE" />

                {
    /* Energetic brows in workout / warning */
  }
                {mood === "workout" && <>
                    <path d="M-23 -20.5 L-15 -19" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M11 -20.5 L3 -19" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" />
                  </>}
                {isWarning && <>
                    <path d="M-24 -20 Q-19 -24 -14 -20" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                    <path d="M2 -20 Q7 -24 12 -20" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                  </>}
              </motion.g>}

            {
    /* Rosy Anime Cheeks */
  }
            <ellipse cx="-26" cy="-5" rx="4.6" ry="2.6" fill="#F9A8D4" opacity="0.78" />
            <ellipse cx="14" cy="-5" rx="4.6" ry="2.6" fill="#F9A8D4" opacity="0.78" />

            {
    /* Expressive Mouth */
  }
            {isCelebratory || mood === "workout" ? <path
    d="M-12 -3 Q-6 7 0 -3 Z"
    fill="#EC4899"
    stroke="#1E1B2E"
    strokeWidth="1.9"
    strokeLinejoin="round"
  /> : isHydrate ? <circle cx="-6" cy="-1" r="3.2" fill="#F472B6" stroke="#1E1B2E" strokeWidth="1.7" /> : isPaused || isWarning ? <path
    d="M-10 -2 Q-8 1 -6 -1 Q-4 -3 -2 -1"
    stroke="#1E1B2E"
    strokeWidth="2"
    strokeLinecap="round"
    fill="none"
  /> : <path
    d="M-12 -3 Q-6 3.5 0 -3"
    stroke="#1E1B2E"
    strokeWidth="2.3"
    strokeLinecap="round"
    fill="none"
  />}

            {
    /* RIGHT ARM (pivot at right shoulder 34, -6 on 3D side edge) */
  }
            <g transform="translate(34, -6)">
              <motion.g
    animate={{ rotate: cfg.rightArmRotate }}
    transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut" }}
  >
                <path
    d="M0 0 Q11 2 20 -1"
    stroke="#6D28D9"
    strokeWidth="5"
    strokeLinecap="round"
    fill="none"
  />
                {
    /* Purple Wristband */
  }
                <rect x="12" y="-4" width="5" height="6" rx="2" fill="#A78BFA" stroke="#5B21B6" strokeWidth="1" />
                {
    /* Hand */
  }
                <circle cx="22" cy="-1" r="4.8" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="2.2" />
                {cfg.showDumbbells && <g transform="translate(15, -9) rotate(-12)">
                    <rect x="0" y="5" width="12" height="3" rx="1.5" fill="#4C4461" />
                    <rect x="-2" y="1" width="4" height="10" rx="1.8" fill="#7C3AED" />
                    <rect x="10" y="1" width="4" height="10" rx="1.8" fill="#7C3AED" />
                  </g>}
                {cfg.showChefSpoon && <g transform="translate(18, -22) rotate(22)">
                    {
    /* Cute wooden stirring spoon */
  }
                    <rect x="0" y="4" width="4" height="22" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1.3" />
                    <ellipse cx="2" cy="1" rx="5.5" ry="7" fill="#F59E0B" stroke="#78350F" strokeWidth="1.4" />
                  </g>}
              </motion.g>
            </g>
          </motion.g>
        </g>
      </svg>
    </motion.div>;
};
const MilkMateCharacter = MilkMascot;
export {
  MilkMascot,
  MilkMateCharacter
};
