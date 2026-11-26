// Coach Audio Helper: gentle sound cues for workout timers and completions
let audioCtx = null;
function getAudioContext() {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {
    });
  }
  return audioCtx;
}
function playTone(ctx, freq, startOffset, duration, gainPeak = 0.08) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);
  gain.gain.setValueAtTime(1e-4, ctx.currentTime + startOffset);
  gain.gain.exponentialRampToValueAtTime(gainPeak, ctx.currentTime + startOffset + 0.02);
  gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + startOffset + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startOffset);
  osc.stop(ctx.currentTime + startOffset + duration + 0.02);
}
function playCoachSound(type, muted) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    switch (type) {
      case "intro":
        playTone(ctx, 523.25, 0, 0.14, 0.07);
        playTone(ctx, 659.25, 0.1, 0.18, 0.07);
        break;
      case "step":
        playTone(ctx, 587.33, 0, 0.12, 0.06);
        playTone(ctx, 783.99, 0.08, 0.16, 0.06);
        break;
      case "pause":
        playTone(ctx, 440, 0, 0.15, 0.05);
        break;
      case "water":
        playTone(ctx, 659.25, 0, 0.1, 0.05);
        playTone(ctx, 880, 0.08, 0.14, 0.05);
        break;
      case "victory":
        playTone(ctx, 523.25, 0, 0.14, 0.08);
        playTone(ctx, 659.25, 0.11, 0.14, 0.08);
        playTone(ctx, 783.99, 0.22, 0.16, 0.08);
        playTone(ctx, 1046.5, 0.34, 0.28, 0.09);
        break;
    }
  } catch {
  }
}
export {
  playCoachSound
};
