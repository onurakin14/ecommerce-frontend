import { useState, useEffect } from "react";

type Props = {
  activePage: "account" | "orders" | "addresses" | "payments" | "notifications";
  setActivePage: (page: Props["activePage"]) => void;
};

export default function UserSidebar({ activePage, setActivePage }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-gray-50");
      document.body.classList.add("bg-gray-900");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.add("bg-gray-50");
    }
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside className="col-span-12 md:col-span-3">
      <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="aspect-square h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://i.pravatar.cc/150?img=12")',
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-base font-medium text-gray-900 dark:text-white">
              Daniel Smith
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              daniel.smith@example.com
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <button
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              activePage === "account"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("account")}
          >
            <span className="material-symbols-outlined fill">person</span>
            Account Settings
          </button>
          <button
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              activePage === "orders"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("orders")}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            Order History
          </button>
          <button
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              activePage === "addresses"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("addresses")}
          >
            <span className="material-symbols-outlined">location_on</span>
            Saved Addresses
          </button>
          <button
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              activePage === "payments"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("payments")}
          >
            <span className="material-symbols-outlined">credit_card</span>
            Payment Methods
          </button>
          <button
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              activePage === "notifications"
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActivePage("notifications")}
          >
            <span className="material-symbols-outlined">notifications</span>
            Notifications
          </button>
        </nav>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 text-sm font-medium">
            <span className="material-symbols-outlined">logout</span>
            Log Out
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-700 px-3 py-2.5">
          <div className="flex items-center gap-3">
            {isDarkMode ? (
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 4.05l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 19.95l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isDarkMode ? "Koyu Tema" : "Açık Tema"}
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
