import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, User, AtSign, ArrowRight, Sparkles, ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound } from "lucide-react";
import { useFitAdda } from "../context/FitAddaContext";
import { FITADDA_LOGO } from "../data/assets";
import { API_URL } from "../config/api";

const API_BASE = `${API_URL}/api/auth`;

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, updateProfile } = useFitAdda();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") === "login");
  const [isForgot, setIsForgot] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    username: "",
    name: user.onboarded ? user.name : "",
    email: "",
    password: "",
    resetCode: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyLoginSession = (data, fallbackName = "", fallbackEmail = "") => {
    localStorage.setItem("fitadda_token", data.token);
    updateProfile({
      name: data.user?.name || fallbackName || "FitAdda User",
      email: data.user?.email || fallbackEmail,
      avatarUrl: typeof data.user?.avatarUrl === "string" ? data.user.avatarUrl : "",
      gender: data.user?.gender || "men",
      goal: data.user?.goal || "stay_active",
      activityLevel: data.user?.activityLevel || "beginner",
      countryCode: data.user?.countryCode || "PK",
      age: data.user?.age || 24,
      heightCm: data.user?.heightCm || 172,
      weightKg: data.user?.weightKg || 68,
      dailyCalorieTarget: data.user?.dailyCalorieTarget || 2000,
      dailyWaterTargetGlasses: data.user?.dailyWaterTargetGlasses || 8,
      dailyMoveMinutesTarget: data.user?.dailyMoveMinutesTarget || 30,
      onboarded: true
    });
    navigate("/");
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google sign-in failed");
      applyLoginSession(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      if (resetStep === 1) {
        const res = await fetch(`${API_BASE}/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to send code");
        setSuccessMsg(data.message || "Verification code sent to your email inbox!");
        setResetStep(2);
      } else {
        const res = await fetch(`${API_BASE}/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            code: form.resetCode,
            newPassword: form.newPassword
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Reset failed");
        setSuccessMsg(data.message);
        setIsForgot(false);
        setIsLogin(true);
        setResetStep(1);
        setForm((prev) => ({ ...prev, password: "", resetCode: "", newPassword: "" }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const endpoint = isLogin ? `${API_BASE}/login` : `${API_BASE}/register`;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : {
            username: form.username || form.email.split("@")[0],
            name: form.name || "FitAdda User",
            email: form.email,
            password: form.password,
            avatarUrl: user.onboarded ? user.avatarUrl || "" : "",
            gender: user.gender || "men",
            goal: user.goal || "stay_active",
            activityLevel: user.activityLevel || "beginner",
            countryCode: user.countryCode || "PK",
            language: user.language || "en"
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const rawText = await res.text();
      let data = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("Backend server is not responding properly. Make sure port 5000 is running.");
      }

      if (!res.ok) {
        throw new Error(data.message || data.error || "Authentication failed");
      }

      if (!isLogin) {
        setIsLogin(true);
        setForm((prev) => ({ ...prev, password: "" }));
        setSuccessMsg("Account created successfully! Please login to continue.");
        return;
      }

      applyLoginSession(data, form.name, form.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF9FF] via-[#F6F2FF] to-[#FCE7F3]/50 dark:from-[#111317] dark:via-[#14161B] dark:to-[#111317] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-[#EAE3F8] dark:border-[#2A2E39] bg-white/95 dark:bg-[#181A20] p-6 sm:p-8 shadow-2xl space-y-5"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex rounded-2xl bg-white px-3 py-1.5 border border-[#EAE3F8] shadow-xs">
            <img src={FITADDA_LOGO} alt="FitAdda" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E1B2E] dark:text-[#F3F4F6]">
            {isForgot
              ? "Reset Your Password"
              : isLogin
              ? "Welcome Back!"
              : "Create Your FitAdda Account"}
          </h1>
          <p className="text-xs text-[#6E6586] dark:text-[#9CA3AF]">
            {isForgot
              ? "Recover access to your FitAdda account."
              : isLogin
              ? "Log in to access your workouts, diet plan & progress."
              : "Save your personalized wellness space & start your journey."}
          </p>
        </div>

        {!isForgot && (
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#F5F1FE] dark:bg-[#1F222A] border border-[#EAE3F8] dark:border-[#2E3340]">
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccessMsg("");
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                !isLogin
                  ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white shadow"
                  : "text-[#6E6586] dark:text-[#9CA3AF]"
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccessMsg("");
              }}
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                isLogin
                  ? "bg-[#7C3AED] dark:bg-[#0D9488] text-white shadow"
                  : "text-[#6E6586] dark:text-[#9CA3AF]"
              }`}
            >
              Login
            </button>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center justify-center gap-2 text-center">
            <CheckCircle2 size={15} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {isForgot ? (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB] mb-1">
                Registered Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6]"
                />
              </div>
            </div>

            {resetStep === 2 && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB] mb-1">
                    6-Digit Verification Code
                  </label>
                  <div className="relative">
                    <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                    <input
                      type="text"
                      name="resetCode"
                      required
                      value={form.resetCode}
                      onChange={handleChange}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB] mb-1">
                    New Password (min 6 chars)
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      required
                      minLength={6}
                      value={form.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6586] dark:text-[#9CA3AF]"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              {loading ? "Please wait..." : resetStep === 1 ? "Send Reset Code" : "Update Password"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsForgot(false);
                  setResetStep(1);
                  setError("");
                  setSuccessMsg("");
                }}
                className="text-xs font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Mustafa Qureshi"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB] mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                      <input
                        type="text"
                        name="username"
                        required
                        value={form.username}
                        onChange={handleChange}
                        placeholder="mustafa_fit"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#1E1B2E] dark:text-[#E5E7EB]">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgot(true);
                        setError("");
                        setSuccessMsg("");
                      }}
                      className="text-[11px] font-semibold text-[#7C3AED] dark:text-[#2DD4BF] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C3AED] dark:text-[#2DD4BF]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#EAE3F8] dark:border-[#2E3340] bg-[#FBF9FF] dark:bg-[#1F222A] text-xs text-[#1E1B2E] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6586] dark:text-[#9CA3AF] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF]"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#7C3AED] dark:bg-[#0D9488] hover:bg-[#6D28D9] dark:hover:bg-[#0F766E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-60"
              >
                <Sparkles size={15} />
                {loading ? "Please wait..." : isLogin ? "Login to FitAdda" : "Create Account"}
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#EAE3F8] dark:border-[#2E3340] w-full" />
              <span className="bg-white dark:bg-[#181A20] px-3 text-[11px] font-semibold text-[#6E6586] dark:text-[#9CA3AF] uppercase">
                or
              </span>
              <div className="border-t border-[#EAE3F8] dark:border-[#2E3340] w-full" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Login failed. Please try again.")}
                text="continue_with"
                shape="pill"
                size="large"
                width="340"
              />
            </div>
          </>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/onboarding")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6586] dark:text-[#9CA3AF] hover:text-[#7C3AED] dark:hover:text-[#2DD4BF]"
          >
            <ArrowLeft size={13} />
            Back to Onboarding
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export { AuthPage };