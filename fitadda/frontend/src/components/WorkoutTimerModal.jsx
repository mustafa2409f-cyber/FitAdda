// Guided Workout Timer: step-by-step instructions with MilkMate coach & pose guides
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  Flame,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { useLanguage } from "../context/LanguageContext";
import { getExerciseImage } from "../data/mockData";
import { playCoachSound } from "../utils/coachAudio";
import { SafeImage } from "./SafeImage";
import { MilkMascot } from "./MilkMascot";
const STEP_KEYS = ["start", "move", "next", "mistake", "safety"];
const MOODS = ["Energized", "Proud", "Steady", "Refreshed"];
const WorkoutTimerModal = ({
  open,
  exercises,
  onClose
}) => {
  const { user, completeWorkout } = useFitAdda();
  const { t, tList, isRTL } = useLanguage();
  const [stage, setStage] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [running, setRunning] = useState(false);
  const [elapsedTotalSec, setElapsedTotalSec] = useState(0);
  const [selectedMood, setSelectedMood] = useState("Energized");
  const [muted, setMuted] = useState(false);
  const [celebratingStep, setCelebratingStep] = useState(null);
  const activeExercise = exercises[currentIndex];
  useEffect(() => {
    if (open && exercises.length > 0) {
      setStage("intro");
      setCurrentIndex(0);
      setStepIndex(0);
      setSecondsLeft(exercises[0].durationSec);
      setRunning(false);
      setElapsedTotalSec(0);
      setCelebratingStep(null);
    }
  }, [open, exercises]);
  useEffect(() => {
    if (!open || stage !== "active" || !running || !activeExercise) return;
    const timer = window.setInterval(() => {
      setElapsedTotalSec((e) => e + 1);
      setSecondsLeft((prev) => prev <= 1 ? 0 : prev - 1);
    }, 1e3);
    return () => window.clearInterval(timer);
  }, [open, stage, running, activeExercise]);
  useEffect(() => {
    if (celebratingStep === null) return;
    const id = window.setTimeout(() => setCelebratingStep(null), 1600);
    return () => window.clearTimeout(id);
  }, [celebratingStep]);
  const totalRoutineSeconds = useMemo(
    () => exercises.reduce((sum, ex) => sum + ex.durationSec, 0),
    [exercises]
  );
  const totalCalories = useMemo(
    () => exercises.reduce((sum, ex) => sum + ex.calories, 0),
    [exercises]
  );
  if (!open || !activeExercise) return null;
  const stepTitles = tList("workouts.coach.stepTitles");
  const stepShortLabels = tList("workouts.coach.stepShortLabels");
  const stepPrompts = tList("workouts.coach.stepPrompts");
  const actionTags = tList("workouts.coach.actionTags");
  const exTitle = t(`${activeExercise.titleKey}.title`);
  const exDesc = t(`${activeExercise.titleKey}.desc`);
  const exWhatYouLearn = t(`${activeExercise.titleKey}.whatYouLearn`);
  const exTip = t(`${activeExercise.titleKey}.tip`);
  const difficultyLabel = t(`workouts.difficulties.${activeExercise.difficulty}`);
  const categoryLabel = t(`workouts.categories.${activeExercise.category}`);
  const currentStepKey = STEP_KEYS[stepIndex];
  const currentStepTitle = stepTitles[stepIndex] || `${stepIndex + 1}.`;
  const currentActionTag = actionTags[stepIndex] || "";
  const currentStepInstruction = t(`${activeExercise.titleKey}.guidedSteps.${currentStepKey}`);
  const getMilkMateState = () => {
    if (stage === "intro") {
      return {
        mood: "welcome",
        pose: "wave",
        bubbleText: t("workouts.coach.introGreeting")
      };
    }
    if (stage === "complete") {
      return {
        mood: "celebrate",
        pose: "celebrate",
        bubbleText: t("workouts.coach.victoryMessage")
      };
    }
    if (!running) {
      return {
        mood: "paused",
        pose: "paused",
        bubbleText: t("workouts.coach.pauseThinking")
      };
    }
    const directStepPrompt = stepPrompts[stepIndex] || currentStepTitle;
    if (stepIndex === 0) {
      return {
        mood: "happy",
        pose: "idle",
        bubbleText: directStepPrompt
      };
    }
    if (stepIndex === 1 || stepIndex === 2) {
      return {
        mood: celebratingStep !== null ? "celebrate" : "workout",
        pose: activeExercise.animationPose,
        bubbleText: directStepPrompt
      };
    }
    if (stepIndex === 3) {
      return {
        mood: "warning",
        pose: activeExercise.animationPose,
        bubbleText: directStepPrompt
      };
    }
    return {
      mood: "hydrate",
      pose: "idle",
      bubbleText: directStepPrompt
    };
  };
  const milkState = getMilkMateState();
  const handleStartFromIntro = () => {
    playCoachSound("intro", muted);
    setStage("active");
    setStepIndex(0);
    setSecondsLeft(activeExercise.durationSec);
    setRunning(true);
  };
  const handleTogglePause = () => {
    const nextRunning = !running;
    setRunning(nextRunning);
    playCoachSound(nextRunning ? "step" : "pause", muted);
  };
  const handlePrevStep = () => {
    if (stepIndex > 0) {
      setCelebratingStep(null);
      setStepIndex((s) => s - 1);
      playCoachSound("step", muted);
    }
  };
  const enterCompleteStage = () => {
    setStage("complete");
    setRunning(false);
    playCoachSound("victory", muted);
  };
  const handleAdvanceExercise = () => {
    setCelebratingStep(null);
    if (currentIndex + 1 < exercises.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setStepIndex(0);
      setSecondsLeft(exercises[nextIdx].durationSec);
      setRunning(true);
      playCoachSound("intro", muted);
    } else {
      enterCompleteStage();
    }
  };
  const handleNextStep = () => {
    if (stepIndex < STEP_KEYS.length - 1) {
      const completedIdx = stepIndex;
      const nextStep = stepIndex + 1;
      setStepIndex(nextStep);
      setCelebratingStep(completedIdx);
      playCoachSound(nextStep === 4 ? "water" : "step", muted);
    } else {
      handleAdvanceExercise();
    }
  };
  const handleConfirmFinish = () => {
    const mins = Math.max(5, Math.round(elapsedTotalSec / 60) || exercises.length * 4);
    completeWorkout(
      exercises.map((e) => e.id),
      mins,
      selectedMood,
      t("workouts.workoutCompletedTitle"),
      t("workouts.workoutCompletedDesc", { count: exercises.length, calories: totalCalories })
    );
    onClose();
  };
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;
  const ForwardIcon = isRTL ? ChevronLeft : ChevronRight;
  return <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#1E1B2E]/60 backdrop-blur-sm">
        <motion.div
    initial={{ opacity: 0, scale: 0.94, y: 18 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.94, y: 18 }}
    transition={{ type: "spring", stiffness: 360, damping: 28 }}
    className="w-full max-w-3xl rounded-3xl bg-white dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] shadow-2xl overflow-hidden max-h-[94vh] overflow-y-auto"
  >
          {
    /* Top Modal Header */
  }
          <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#F0EBFA] dark:border-[#2A2E39]">
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF] inline-flex items-center gap-1.5">
                <Sparkles size={12} />
                {t("workouts.timerModalTitle")}
              </p>
              <h3 className="text-base font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6] truncate">
                {stage === "complete" ? t("workouts.workoutCompletedTitle") : `${exTitle}${exercises.length > 1 ? ` · ${t("workouts.exerciseOf", {
    current: currentIndex + 1,
    total: exercises.length
  })}` : ""}`}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
    type="button"
    onClick={() => setMuted((m) => !m)}
    aria-label={muted ? t("workouts.coach.soundMuted") : t("workouts.coach.soundOn")}
    className="px-3 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF] inline-flex items-center gap-1.5 transition-colors"
  >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#7C3AED]" />}
                <span className="hidden sm:inline">
                  {muted ? t("workouts.coach.soundMuted") : t("workouts.coach.soundOn")}
                </span>
              </button>

              <button
    type="button"
    onClick={onClose}
    aria-label={t("common.close")}
    className="p-2 rounded-xl text-[#6E6586] hover:bg-[#F3EEFF] dark:hover:bg-[#262A34]"
  >
                <X size={18} />
              </button>
            </div>
          </div>

          {
    /* STAGE 1: WORKOUT INTRODUCTION */
  }
          {stage === "intro" && <motion.div
    key="intro-stage"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.28 }}
    className="p-5 sm:p-7 space-y-6"
  >
              {
    /* MilkMate Entrance Arena */
  }
              <div className="rounded-3xl bg-gradient-to-br from-[#FBF9FF] via-[#F3EEFF] to-[#EDE9FE]/70 dark:from-[#1A1C23] dark:via-[#1B1E25] dark:to-[#1F222A] border border-[#E5DDF7] dark:border-[#2E3340] p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6">
                <motion.div
    initial={{ scale: 0.72, y: 20, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 320, damping: 20 }}
    className="shrink-0"
  >
                  <MilkMascot mood="welcome" pose="wave" size="trainer" interactive />
                </motion.div>

                <div className="flex-1 space-y-3 text-center md:text-start">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#7C3AED] dark:text-[#2DD4BF]">
                    {t("brand.mascotName")} · {t("workouts.coach.badge")}
                  </p>
                  <div className="rounded-2xl bg-white/95 dark:bg-[#181A20]/95 border border-[#DDD6FE] dark:border-[#363B48] p-4 shadow-sm">
                    <p className="text-sm sm:text-base font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed">
                      “{t("workouts.coach.introGreeting")}”
                    </p>
                    <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] mt-1.5">
                      {t("workouts.coach.introSubtitle")}
                    </p>
                  </div>
                </div>
              </div>

              {
    /* Exercise Summary + What You Will Learn */
  }
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] aspect-[4/3] sm:aspect-auto">
                  <SafeImage
    src={getExerciseImage(activeExercise, user.gender)}
    alt={exTitle}
    className="w-full h-full object-cover object-top"
    fallbackType="workout"
  />
                </div>

                <div className="sm:col-span-7 rounded-2xl bg-[#FBF9FF] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] p-4 sm:p-5 flex flex-col justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
                      {categoryLabel} · {difficultyLabel}
                    </p>
                    <h4 className="text-lg font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
                      {exTitle}
                    </h4>
                    <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF] leading-relaxed">
                      {exDesc}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] space-y-1">
                    <p className="text-[11px] font-bold text-[#7C3AED] dark:text-[#2DD4BF]">
                      {t("workouts.coach.whatYouLearnLabel")}
                    </p>
                    <p className="text-xs text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed">
                      {exWhatYouLearn}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB] tabular-nums">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} className="text-[#7C3AED]" />
                      {t("workouts.coach.durationLabel")}: {Math.max(1, Math.round(totalRoutineSeconds / 60))}{" "}
                      {t("common.minutes")} ({activeExercise.durationSec}s / set)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Flame size={14} className="text-[#EC4899]" />
                      {t("workouts.coach.levelLabel")}: {difficultyLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
    type="button"
    onClick={handleStartFromIntro}
    className="btn-3d-primary w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-sm font-bold inline-flex items-center justify-center gap-2"
  >
                  <Play size={16} fill="currentColor" />
                  {t("workouts.coach.introStartBtn")}
                </button>
              </div>
            </motion.div>}

          {
    /* STAGE 2: DEDICATED ANIMATED WORKOUT SCREEN */
  }
          {stage === "active" && <motion.div
    key="active-stage"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="p-5 sm:p-6 space-y-5"
  >
              {
    /* Step & Exercise Progress Pills (Labeled for instant clarity) */
  }
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#4C4461] dark:text-[#D1D5DB] tabular-nums">
                  <span className="text-[#7C3AED] dark:text-[#2DD4BF]">
                    {t("workouts.coach.stepCounter", {
    current: stepIndex + 1,
    total: STEP_KEYS.length
  })}
                  </span>
                  <span>
                    {activeExercise.sets} {t("common.sets")} · {activeExercise.reps}{" "}
                    {t("common.reps")} · {activeExercise.restSec}s {t("common.rest")}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {STEP_KEYS.map((k, idx) => {
    const isCurrent = idx === stepIndex;
    const isDone = idx < stepIndex;
    return <button
      key={k}
      type="button"
      onClick={() => {
        setStepIndex(idx);
        setCelebratingStep(null);
        playCoachSound(idx === 4 ? "water" : "step", muted);
      }}
      className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1 truncate ${isCurrent ? "bg-[#7C3AED] dark:bg-[#0D9488] border-[#7C3AED] dark:border-[#14B8A6] text-white shadow-sm" : isDone ? "bg-[#F5F1FE] dark:bg-[#162726] border-[#DDD6FE] dark:border-[#14B8A6]/50 text-[#7C3AED] dark:text-[#2DD4BF]" : "bg-[#FBF9FF] dark:bg-[#1F222A] border-[#EAE3F8] dark:border-[#2E3340] text-[#6E6586] dark:text-[#9CA3AF]"}`}
    >
                        {isDone && <Check size={11} className="shrink-0" />}
                        <span className="truncate">{stepShortLabels[idx] || idx + 1}</span>
                      </button>;
  })}
                </div>
              </div>

              {
    /* Center Stage: Animated MilkMate + Real Pose Guide + Easy Step Action Card */
  }
              <div className="rounded-3xl bg-gradient-to-b from-[#FAF8FF] via-[#F3EEFF] to-[#EDE9FE]/60 dark:from-[#1A1C23] dark:via-[#181A20] dark:to-[#1F222A] border border-[#E5DDF7] dark:border-[#2E3340] p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {
    /* MilkMate Character Spotlight + Real Studio Pose Photo */
  }
                  <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                    {
    /* Clear Step Speech Bubble pointing to MilkMate */
  }
                    <AnimatePresence mode="wait">
                      <motion.div
    key={milkState.bubbleText}
    initial={{ opacity: 0, y: 6, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.2 }}
    className="relative w-full max-w-xs mb-3 rounded-2xl bg-white dark:bg-[#181A20] border-2 border-[#DDD6FE] dark:border-[#14B8A6]/50 px-4 py-2.5 text-center shadow-sm"
  >
                        <p className="text-xs font-bold text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed">
                          {milkState.bubbleText}
                        </p>
                        <span
    aria-hidden="true"
    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-white dark:bg-[#181A20] border-e-2 border-b-2 border-[#DDD6FE] dark:border-[#14B8A6]/50"
  />
                      </motion.div>
                    </AnimatePresence>

                    <MilkMascot
    mood={milkState.mood}
    pose={milkState.pose}
    size="lg"
    interactive
  />

                    {
    /* Real Human Pose Reference Card right below MilkMate */
  }
                    <div className="mt-2 w-full max-w-[210px] rounded-2xl overflow-hidden bg-white dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] shadow-xs">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A]">
                        <SafeImage
    src={getExerciseImage(activeExercise, user.gender)}
    alt={exTitle}
    className="w-full h-full object-cover object-top"
    fallbackType="workout"
  />
                      </div>
                      <p className="px-2.5 py-1.5 text-[10px] font-bold text-center text-[#7C3AED] dark:text-[#2DD4BF] truncate">
                        {t("workouts.coach.realPoseLabel")}: {exTitle}
                      </p>
                    </div>

                    {!running && <p className="text-[11px] font-semibold text-[#6E6586] dark:text-[#9CA3AF] text-center mt-2 max-w-xs">
                        {t("workouts.coach.breakReassurance")}
                      </p>}
                  </div>

                  {
    /* Right Panel: Timer + Super Clear Step Action Card + Step Controls */
  }
                  <div className="md:col-span-7 space-y-4">
                    {
    /* Live Workout Timer Box */
  }
                    <div className="p-4 rounded-2xl bg-white/95 dark:bg-[#181A20]/95 border border-[#E5DDF7] dark:border-[#2E3340] flex items-center justify-between gap-3">
                      <div>
                        <p className="text-3xl font-extrabold tabular-nums text-[#7C3AED] dark:text-[#2DD4BF]">
                          00:{String(secondsLeft).padStart(2, "0")}
                        </p>
                        <p className="text-[11px] font-semibold text-[#6E6586] dark:text-[#9CA3AF] tabular-nums">
                          {difficultyLabel} · {activeExercise.calories} {t("common.kcal")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
    type="button"
    onClick={() => setSecondsLeft(activeExercise.durationSec)}
    aria-label="Reset timer"
    className="p-2.5 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#E5DDF7] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"
  >
                          <RotateCcw size={15} />
                        </button>
                        <button
    type="button"
    onClick={handleTogglePause}
    aria-label={running ? t("workouts.pause") : t("workouts.resume")}
    className="btn-3d-primary px-4 py-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold inline-flex items-center gap-1.5"
  >
                          {running ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                          {running ? t("workouts.pause") : t("workouts.resume")}
                        </button>
                      </div>
                    </div>

                    {
    /* Easy-to-Follow Step Card */
  }
                    <AnimatePresence mode="wait">
                      <motion.div
    key={`${activeExercise.id}-${stepIndex}`}
    initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: isRTL ? 12 : -12 }}
    transition={{ duration: 0.2 }}
    className={`rounded-2xl p-4 sm:p-5 border-2 space-y-3 ${stepIndex === 3 ? "bg-[#FFFBEB] dark:bg-[#2D2212] border-[#FCD34D] dark:border-[#92400E]" : stepIndex === 4 ? "bg-[#F0FDF4] dark:bg-[#132920] border-[#86EFAC] dark:border-[#166534]" : "bg-white dark:bg-[#181A20] border-[#DDD6FE] dark:border-[#14B8A6]/60"}`}
  >
                        <div className="flex items-center justify-between gap-2">
                          <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wide uppercase ${stepIndex === 3 ? "bg-[#FDE68A] dark:bg-[#78350F] text-[#92400E] dark:text-[#FDE68A]" : stepIndex === 4 ? "bg-[#DCFCE7] dark:bg-[#14532D] text-[#166534] dark:text-[#86EFAC]" : "bg-[#F3EEFF] dark:bg-[#162726] text-[#7C3AED] dark:text-[#2DD4BF]"}`}
  >
                            {stepIndex === 3 && <AlertTriangle size={12} />}
                            {stepIndex === 4 && <ShieldCheck size={12} />}
                            {currentActionTag}
                          </span>
                          <span className="text-[11px] font-bold text-[#7C3AED] dark:text-[#2DD4BF] tabular-nums shrink-0">
                            {stepIndex + 1}/{STEP_KEYS.length}
                          </span>
                        </div>

                        <h4 className="text-sm font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
                          {currentStepTitle}
                        </h4>

                        <p className="text-sm sm:text-base font-semibold text-[#1E1B2E] dark:text-[#F3F4F6] leading-relaxed">
                          {currentStepInstruction}
                        </p>

                        {stepIndex === 4 && <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-[#047857] dark:text-[#6EE7B7]">
                            <Droplets size={14} />
                            <span>{t("workouts.coach.waterReminder")}</span>
                          </div>}
                      </motion.div>
                    </AnimatePresence>

                    {
    /* Step Controls: Previous & Next Step */
  }
                    <div className="flex items-center justify-between gap-2.5">
                      <button
    type="button"
    onClick={handlePrevStep}
    disabled={stepIndex === 0}
    className="btn-3d-secondary px-4 py-2.5 rounded-xl bg-white dark:bg-[#181A20] border border-[#EAE3F8] dark:border-[#2E3340] text-xs font-bold text-[#4C4461] dark:text-[#D1D5DB] disabled:opacity-40 inline-flex items-center gap-1.5"
  >
                        <BackIcon size={14} />
                        {t("workouts.coach.prevStep")}
                      </button>

                      <button
    type="button"
    onClick={handleNextStep}
    className="btn-3d-primary flex-1 py-2.5 px-4 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5"
  >
                        <span>
                          {stepIndex < STEP_KEYS.length - 1 ? t("workouts.coach.nextStep") : currentIndex + 1 < exercises.length ? t("workouts.coach.skipNoGuilt") : t("workouts.coach.finishWorkout")}
                        </span>
                        <ForwardIcon size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {
    /* Footer Action Strip: Next Exercise & Finish Workout */
  }
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340] shrink-0">
                    <SafeImage
    src={getExerciseImage(activeExercise, user.gender)}
    alt={exTitle}
    className="w-full h-full object-cover object-top"
    fallbackType="workout"
  />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-[#1E1B2E] dark:text-[#F3F4F6]">
                      {t("workouts.coachTip")}
                    </p>
                    <p className="text-[#6E6586] dark:text-[#9CA3AF] line-clamp-1 max-w-xs sm:max-w-sm">
                      {exTip}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ms-auto">
                  {currentIndex + 1 < exercises.length && <button
    type="button"
    onClick={handleAdvanceExercise}
    className="btn-3d-secondary px-4 py-2.5 rounded-xl bg-[#F5F1FE] dark:bg-[#1F222A] text-[#7C3AED] dark:text-[#E5E7EB] text-xs font-bold inline-flex items-center gap-1"
  >
                      {t("workouts.coach.skipNoGuilt")}
                      <ForwardIcon size={14} />
                    </button>}

                  <button
    type="button"
    onClick={enterCompleteStage}
    className="px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
  >
                    <Check size={14} />
                    {t("workouts.coach.finishWorkout")}
                  </button>
                </div>
              </div>
            </motion.div>}

          {
    /* STAGE 3: VICTORY CELEBRATION */
  }
          {stage === "complete" && <motion.div
    key="complete-stage"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="p-6 sm:p-8 text-center space-y-5"
  >
              <div className="flex justify-center">
                <MilkMascot mood="celebrate" pose="celebrate" size="xl" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h4 className="text-2xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
                  {t("workouts.workoutCompletedTitle")}
                </h4>
                <p className="text-sm font-semibold text-[#7C3AED] dark:text-[#2DD4BF]">
                  “{t("workouts.coach.victoryMessage")}”
                </p>
                <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
                  {t("workouts.workoutCompletedDesc", {
    count: exercises.length,
    calories: totalCalories
  })}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-[#4C4461] dark:text-[#D1D5DB]">
                  {t("workouts.howDidYouFeel")}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {MOODS.map((mood) => <button
    key={mood}
    type="button"
    onClick={() => setSelectedMood(mood)}
    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${selectedMood === mood ? "bg-[#7C3AED] dark:bg-[#0D9488] border-[#7C3AED] dark:border-[#14B8A6] text-white shadow-sm" : "bg-[#FBF9FF] dark:bg-[#1F222A] border-[#EAE3F8] dark:border-[#2E3340] text-[#4C4461] dark:text-[#D1D5DB]"}`}
  >
                      {t(`workouts.moods.${mood}`)}
                    </button>)}
                </div>
              </div>

              <button
    type="button"
    onClick={handleConfirmFinish}
    className="btn-3d-primary mx-auto px-7 py-3.5 rounded-2xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-sm font-bold inline-flex items-center gap-2"
  >
                <Check size={16} />
                {t("workouts.completeWorkout")}
              </button>
            </motion.div>}
        </motion.div>
      </div>
    </AnimatePresence>;
};
export {
  WorkoutTimerModal
};
