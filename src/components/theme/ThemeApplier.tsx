import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function ThemeApplier() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;

    // DEFAULT / BASE THEME
    if (!theme || theme.isBase) {
      root.style.setProperty("--primary", "#ffffff");          // navbar bg
      root.style.setProperty("--primary-hover", "#f3f4f6");
      root.style.setProperty("--primary-light", "#ffffff");
      root.style.setProperty("--primary-text", "#111827");    // 🔴 SİYAH YAZI
      return;
    }

    // COLORED THEMES
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-hover", theme.primaryHover);
    root.style.setProperty("--primary-light", theme.primaryLight);
    root.style.setProperty("--primary-text", "#ffffff");      // beyaz yazı
  }, [theme]);

  return null;
}
