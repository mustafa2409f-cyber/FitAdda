import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, Flame, Droplets, Utensils, Dumbbell } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { FITADDA_LOGO } from "../data/assets";

const QUICK_PROMPTS = [
  { label: "Aaj dinner mein kya khaoon?", icon: Utensils },
  { label: "15-min quick workout batao", icon: Dumbbell },
  { label: "Meri aaj ki progress kaisi hai?", icon: Flame },
  { label: "Paani aur hydration tips", icon: Droplets }
];

const MilkMateChat = () => {
  const { user, foodDiary, waterGlasses, todayBurnedCalories, todayActiveMinutes } = useFitAdda();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: `Assalam-o-Alaikum ${user.name || "Champion"}! Main MilkMate hoon 🥛✨ Aapka personal desi fitness & diet coach. Mujh se diet, calories, ya workout ke baare mein kuch bhi poochein!`
    }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const consumedCalories = foodDiary.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
  const remainingCalories = Math.max(0, (user.dailyCalorieTarget || 2000) - consumedCalories);
  const remainingWater = Math.max(0, (user.dailyWaterTargetGlasses || 8) - waterGlasses);

  const generateCoachReply = (rawQuery) => {
    const q = rawQuery.toLowerCase();
    const firstName = (user.name || "Jaani").split(" ")[0];

    if (q.includes("progress") || q.includes("status") || q.includes("report") || q.includes("kaisi")) {
      return `📊 **${firstName} ki Aaj ki Live Report:**\n• **Calories:** ${consumedCalories} / ${user.dailyCalorieTarget} kcal (${remainingCalories} kcal baqi hain)\n• **Burned:** ${todayBurnedCalories} kcal (${todayActiveMinutes} mins active)\n• **Paani:** ${waterGlasses} / ${user.dailyWaterTargetGlasses} glasses\n\n${remainingWater > 0 ? `Abhi ${remainingWater} glass paani aur pi lein toh hydration target 100% ho jayega! 💧` : "Hydration target 100% complete hai, shabash! 🔥"}`;
    }

    if (q.includes("dinner") || q.includes("khana") || q.includes("meal") || q.includes("diet") || q.includes("khaoon") || q.includes("lunch") || q.includes("breakfast")) {
      if (remainingCalories < 450) {
        return `🥗 Aapke paas aaj **${remainingCalories} kcal** baqi hain, ${firstName}! Light aur high-protein option best rahega:\n• **Grilled Chicken Tikka (1 piece) + Kachumber Salad** (~320 kcal)\n• Ya **1 bowl Daal Mash + 1 chhoti Chapati** (~380 kcal)\n• Raat ko meethi chai ki jagah green tea lein! 🍵`;
      }
      return `🍛 Aapke paas abhi **${remainingCalories} kcal** ki gunjaish hai! Goal (**${(user.goal || "stay_active").replace("_", " ")}**) ke mutabiq yeh options zabardast hain:\n• **2 Anda Bhurji + 2 Brown Roti** (~460 kcal, 24g protein)\n• **Chicken Karahi (kam oil) + 1 Roti + Raita** (~540 kcal)\n• **Boiled Chana Chaat + 1 glass Lassi** (~410 kcal) 💪`;
    }

    if (q.includes("workout") || q.includes("exercise") || q.includes("gym") || q.includes("weight") || q.includes("fat")) {
      return `🏋️‍♂️ **${firstName} ke liye 15-Min Fat-Burn Express Routine:**\n1. **Jumping Jacks** – 2 mins (warm-up)\n2. **Bodyweight Squats** – 3 sets × 15 reps\n3. **Push-ups (ya Knee Push-ups)** – 3 sets × 10 reps\n4. **Mountain Climbers** – 3 sets × 30 sec\n5. **Plank Hold** – 3 sets × 30 sec\n\nIs se taqreeban **140–170 kcal** burn hongi! Workouts tab mein ja kar timer start karein! ⚡`;
    }

    if (q.includes("paani") || q.includes("water") || q.includes("hydration")) {
      return `💧 Aapne aaj **${waterGlasses} / ${user.dailyWaterTargetGlasses} glasses** paani piya hai. Har khane se 20 minute pehle 1 glass paani peene se metabolism tez hota hai aur overeating nahi hoti!`;
    }

    if (q.includes("salam") || q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return `Walaikum Assalam ${firstName}! 🙌 Aaj aapki **${remainingCalories} kcal** baqi hain aur aapne **${todayBurnedCalories} kcal** burn ki hain. Bataiye aaj kis cheez mein help karoon — **Diet Plan**, **Workout**, ya **Daily Progress**?`;
    }

    return `Zabardast sawal ${firstName}! 💡 Aapke current weight (**${user.weightKg} kg**) aur goal (**${(user.goal || "stay_active").replace("_", " ")}**) ke hisaab se rozana **${user.dailyCalorieTarget} kcal** aur kam az kam **${user.dailyMoveMinutesTarget} mins** movement best hai. Aaj aapke paas **${remainingCalories} kcal** baqi hain — neeche diye gaye quick buttons se diet ya workout pooch sakte hain!`;
  };

  const handleSend = (textToSend) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed) return;

    const userMsg = { id: `u-${Date.now()}`, sender: "user", text: trimmed };
    const botReply = {
      id: `b-${Date.now() + 1}`,
      sender: "bot",
      text: generateCoachReply(trimmed)
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    if (!textToSend) setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open MilkMate AI Coach"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] dark:from-[#0D9488] dark:to-[#14B8A6] text-white px-4 py-3 shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <img
          src={FITADDA_LOGO}
          alt="MilkMate"
          className="w-7 h-7 rounded-full bg-white object-contain p-0.5"
        />
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
          Ask MilkMate AI
        </span>
        {open ? <X size={16} /> : <MessageCircle size={16} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-5 z-50 w-[92vw] max-w-sm rounded-3xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white dark:bg-[#181A20] shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "75vh" }}
          >
            <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] dark:from-[#0D9488] dark:to-[#0F766E] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={FITADDA_LOGO}
                  alt="MilkMate"
                  className="w-10 h-10 rounded-2xl bg-white object-contain p-1 shadow"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold">MilkMate AI Coach</h3>
                    <Sparkles size={13} />
                  </div>
                  <p className="text-[11px] text-white/85">
                    Online • Personalized Desi Fitness Guide
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FBF9FF] dark:bg-[#121419]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white rounded-br-xs font-medium"
                        : "bg-white dark:bg-[#1E212B] text-[#1E1B2E] dark:text-[#F3F4F6] border border-[#EAE3F8] dark:border-[#2E3340] rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 py-2 bg-white dark:bg-[#181A20] border-t border-[#EAE3F8] dark:border-[#2A2E39] flex gap-1.5 overflow-x-auto">
              {QUICK_PROMPTS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSend(item.label)}
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F1FE] dark:bg-[#1F222A] hover:bg-[#EAE3F8] dark:hover:bg-[#2A2E39] text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF] transition-colors"
                  >
                    <Icon size={11} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-[#181A20] border-t border-[#EAE3F8] dark:border-[#2A2E39] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask MilkMate about diet or workout..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:opacity-90 text-white shadow"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { MilkMateChat };