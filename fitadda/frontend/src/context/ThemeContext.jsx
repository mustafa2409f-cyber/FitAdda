// Theme Context: toggles between soft light mode and neutral charcoal dark mode
import { createContext, useContext, useEffect, useState } from "react";
const THEME_STORAGE_KEY = "fitadda_theme";
const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    } catch {
    }
    return "light";
  });
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
    }
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  const setTheme = (next) => setThemeState(next);
  const toggleTheme = () => setThemeState((prev) => prev === "light" ? "dark" : "light");
  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>;
};
const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
export {
  ThemeProvider,
  useTheme
};
