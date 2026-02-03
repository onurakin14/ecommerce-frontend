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
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.696 4.696 0 002.048-2.591 9.325 9.325 0 01-2.965 1.133 4.68 4.68 0 00-7.97 4.267A13.286 13.286 0 013.15 3.7a4.68 4.68 0 001.447 6.24 4.66 4.66 0 01-2.12-.586v.06a4.68 4.68 0 003.755 4.587 4.7 4.7 0 01-2.112.08 4.68 4.68 0 004.37 3.252A9.4 9.4 0 012 19.54a13.26 13.26 0 007.19 2.105c8.63 0 13.34-7.144 13.34-13.34 0-.203-.005-.406-.014-.608a9.53 9.53 0 002.33-2.43z" />
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
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
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
