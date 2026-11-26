// Main FitAdda Router & App Shell (light/dark theme + language + user onboarding)
/**
- @license
- SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { FitAddaProvider, useFitAdda } from "./context/FitAddaContext";
import { Layout } from "./components/Layout";
import { MilkMateChat } from "./components/MilkMateChat";
import { OnboardingFlow } from "./pages/OnboardingFlow";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { Workouts } from "./pages/Workouts";
import { DietPlan } from "./pages/DietPlan";
import { Nutrition } from "./pages/Nutrition";
import { Progress } from "./pages/Progress";
import { Challenges } from "./pages/Challenges";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

const GOOGLE_CLIENT_ID = "430974887017-vpdj1qmdnh3ejbaemcdf3m4qnslkfih3.apps.googleusercontent.com";

const ProtectedRoute = ({ children }) => {
  const { user } = useFitAdda();
  const token = localStorage.getItem("fitadda_token");
  if (!token) {
    return <Navigate to={user.onboarded ? "/auth?mode=login" : "/onboarding"} replace />;
  }
  return (
    <Layout>
      {children}
      <MilkMateChat />
    </Layout>
  );
};

const AppRoutes = () => {
  const { user } = useFitAdda();
  const token = localStorage.getItem("fitadda_token");
  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingFlow />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workouts"
        element={
          <ProtectedRoute>
            <Workouts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/diet"
        element={
          <ProtectedRoute>
            <DietPlan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nutrition"
        element={
          <ProtectedRoute>
            <Nutrition />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/challenges"
        element={
          <ProtectedRoute>
            <Challenges />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/" : user.onboarded ? "/auth?mode=login" : "/onboarding"} replace />}
      />
    </Routes>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <LanguageProvider>
          <FitAddaProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </FitAddaProvider>
        </LanguageProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export {
  App as default
};