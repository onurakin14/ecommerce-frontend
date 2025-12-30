import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Footer() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  // Dark mode'da yazı rengi = tema rengi, açık modda = primary-text
  const textColor = isDarkMode ? "var(--primary)" : "var(--primary-text)";

  // Dark mode'da arka plan siyah, açık modda tema rengi
  const footerBg = isDarkMode ? "#111827" : "var(--primary)";

  // Border rengi
  const borderColor = isDarkMode ? "#374151" : "rgba(255,255,255,0.2)";

  return (
    <footer
      className="border-t py-12 px-4 transition-colors"
      style={{
        backgroundColor: footerBg,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: isDarkMode ? "#ffffff" : "inherit" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: isDarkMode ? "#ffffff" : "inherit" }}
            >
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/faq"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: isDarkMode ? "#ffffff" : "inherit" }}
            >
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675..." />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808..." />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t pt-8 transition-colors"
          style={{ borderColor: borderColor }}
        >
          <p
            className="text-center text-sm opacity-70"
            style={{ color: isDarkMode ? "#9ca3af" : "inherit" }}
          >
            © 2025 Storefront, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
