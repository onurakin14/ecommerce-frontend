export default function UserSidebar() {
  return (
    <aside className="col-span-12 md:col-span-3">
      <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="aspect-square h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://i.pravatar.cc/150?img=12")',
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-base font-medium text-gray-900">
              Daniel Smith
            </h1>
            <p className="text-sm text-gray-600">daniel.smith@example.com</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <a
            className="flex cursor-pointer items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-600"
            href="#"
          >
            <span className="material-symbols-outlined fill">person</span>
            <p className="text-sm font-medium">Account Settings</p>
          </a>
          <a
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            href="#"
          >
            <span className="material-symbols-outlined">inventory_2</span>

            <p className="text-sm font-medium">Order History</p>
          </a>
          <a
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            href="#"
          >
            <span className="material-symbols-outlined">location_on</span>
            <p className="text-sm font-medium">Saved Addresses</p>
          </a>
          <a
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            href="#"
          >
            <span className="material-symbols-outlined">credit_card</span>
            <p className="text-sm font-medium">Payment Methods</p>
          </a>
          <a
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            href="#"
          >
            <span className="material-symbols-outlined">notifications</span>

            <p className="text-sm font-medium">Notifications</p>
          </a>
        </nav>
        <div className="border-t border-gray-200 pt-4">
          <a
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium">Log Out</p>
          </a>
        </div>
      </div>
    </aside>
  );
}
