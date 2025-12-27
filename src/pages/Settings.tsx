// src/pages/Settings.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setTheme, THEMES } from "../store/themeSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const currentTheme =  useSelector((state: RootState) => state.theme.theme) ?? THEMES[0];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Theme Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEMES.map((theme) => {
          const isActive = currentTheme.name === theme.name;
          const isDefault = theme.isBase;

          return (
            <div
              key={theme.name}
              onClick={() => dispatch(setTheme(theme))}
              className={`border rounded-xl p-6 cursor-pointer transition
                ${isActive ? "ring-2 ring-blue-500" : ""}
              `}
            >
              {/* COLOR PREVIEW */}
              <div
                className="w-10 h-10 rounded mb-4"
                style={{
                  backgroundColor: isDefault
                    ? "#e5e7eb" // default için nötr gri
                    : theme.primary,
                }}
              />

              <h3 className="font-semibold">{theme.name}</h3>

              <p className="text-sm text-gray-500 mb-4">
                {isDefault
                  ? "Base theme (no color)"
                  : "Primary color preview"}
              </p>

              {/* BUTTON PREVIEW */}
              <button
                className={`px-4 py-2 rounded text-sm
                  ${
                    isDefault
                      ? "bg-gray-200 text-gray-700 cursor-default"
                      : "text-white"
                  }
                `}
                style={
                  isDefault
                    ? undefined
                    : { backgroundColor: theme.primary }
                }
                disabled={isDefault}
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
