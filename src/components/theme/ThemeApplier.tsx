import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function ThemeApplier() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;

    // 🟢 BASE / DEFAULT TEMA
    if (!theme || theme.isBase) {
      root.style.setProperty("--primary", "#ffffff");
      root.style.setProperty("--primary-hover", "#f3f4f6");
      root.style.setProperty("--primary-light", "#f9fafb");
      root.style.setProperty("--primary-text", "#111827");

      // 🔥 layout background
      root.style.setProperty("--app-bg", "#f9fafb");

      // action = marka rengi
      root.style.setProperty("--action", "var(--brand-primary)");
      return;
    }

    // 🔵 DİĞER TEMALAR
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-hover", theme.primaryHover);
    root.style.setProperty("--primary-light", theme.primaryLight);
    root.style.setProperty("--primary-text", "#ffffff");

    // 🔥 layout background = açık tema rengi
    root.style.setProperty("--app-bg", theme.primaryLight);

    root.style.setProperty("--action", theme.primary);
  }, [theme]);

  return null;
}
