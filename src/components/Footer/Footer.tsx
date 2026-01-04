export default function Footer() {
  return (
    <footer
      className="border-t py-12 px-4"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--primary-text)",
        borderColor: "#e5e7eb",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
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
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
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
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
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
                  <path d="M12.315 2c2.43 0 2.784.013 3.808..." />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="border-t pt-8"
          style={{ borderColor: "#e5e7eb" }}
        >
          <p className="text-center text-sm opacity-70">
            © 2025 Storefront, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
