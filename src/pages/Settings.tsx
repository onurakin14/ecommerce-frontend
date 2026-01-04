// src/pages/Settings.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setTheme, THEMES } from "../store/themeSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const currentTheme =
    useSelector((state: RootState) => state.theme.theme) ?? THEMES[0];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Theme Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {THEMES.map((theme) => {
          const isActive = currentTheme.name === theme.name;
          const isDefault = theme.isBase;

          return (
            <div
              key={theme.name}
              onClick={() => dispatch(setTheme(theme))}
              className={`
                bg-white rounded-2xl p-6 cursor-pointer transition
                border border-gray-200
                hover:shadow-md hover:-translate-y-0.5
                ${isActive ? "ring-2 ring-[var(--action)]" : ""}
              `}
            >
              {/* COLOR PREVIEW */}
              <div
                className="w-10 h-10 rounded-full mb-4 shadow-sm"
                style={{
                  backgroundColor: isDefault
                    ? "#e5e7eb"
                    : theme.primary,
                }}
              />

              <h3 className="font-semibold text-gray-900 mb-0.5">
                {theme.name}
              </h3>

              <p className="text-xs text-gray-500 mb-4">
                {isDefault
                  ? "Base theme (no color)"
                  : "Primary color preview"}
              </p>

              {/* BUTTON PREVIEW */}
              <button
                disabled={isDefault}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    isDefault
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "text-white"
                  }
                `}
                style={
                  !isDefault
                    ? { backgroundColor: theme.primary }
                    : undefined
                }
              >
                Button preview
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
