import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, isDarkMode } = useSelector((state: RootState) => state.theme);

  // Dark mode'u uygula
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Tema renklerini CSS variable olarak uygula
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty("--primary", theme.primary);
      document.documentElement.style.setProperty(
        "--primary-hover",
        theme.primaryHover
      );
      document.documentElement.style.setProperty(
        "--primary-light",
        theme.primaryLight
      );
    } else {
      // Default tema
      document.documentElement.style.setProperty("--primary", "#6366f1");
      document.documentElement.style.setProperty("--primary-hover", "#4f46e5");
      document.documentElement.style.setProperty("--primary-light", "#eef2ff");
    }
  }, [theme]);

  return <>{children}</>;
}
