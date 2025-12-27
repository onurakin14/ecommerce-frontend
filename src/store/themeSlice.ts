import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Theme = {
  name: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  isBase?: boolean;
};

type ThemeState = {
  theme: Theme | null; 
};

export const THEMES: Theme[] = [
     {
  name: "Default",
  primary: "#ffffff",          // navbar beyaz
  primaryHover: "#f3f4f6",
  primaryLight: "#ffffff",
  isBase: true,                // 🔴 KRİTİK FLAG
},
  {
    name: "Blue",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryLight: "#dbeafe",
  },
  {
    name: "Purple",
    primary: "#7c3aed",
    primaryHover: "#6d28d9",
    primaryLight: "#ede9fe",
  },
  {
    name: "Emerald",
    primary: "#059669",
    primaryHover: "#047857",
    primaryLight: "#d1fae5",
  },
  {
    name: "Rose",
    primary: "#e11d48",
    primaryHover: "#be123c",
    primaryLight: "#ffe4e6",
  },
  {
    name: "Orange",
    primary: "#ea580c",
    primaryHover: "#c2410c",
    primaryLight: "#ffedd5",
  },
];

/* 🔐 SAFE INITIAL STATE */
function getInitialTheme(): Theme | null {
  const stored = localStorage.getItem("theme");

  // 👇 HİÇ TEMA SEÇİLMEMİŞ → GERÇEK DEFAULT
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);

    if (parsed?.primary && parsed?.primaryHover && parsed?.primaryLight) {
      return parsed;
    }

    return null;
  } catch {
    localStorage.removeItem("theme");
    return null;
  }
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
    resetTheme(state) {
      state.theme = null; // 🔥 ANA DEFAULT'A DÖN
      localStorage.removeItem("theme");
    },
  },
});

export const { setTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
