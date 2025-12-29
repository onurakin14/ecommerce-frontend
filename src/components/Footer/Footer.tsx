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
