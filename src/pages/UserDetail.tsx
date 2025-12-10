import {
  UserSidebar,
  UserProfileInfo,
  PasswordChangeForm,
} from "../components/user";
export default function UserDetail() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          {/* SideNavBar */}
          <UserSidebar />

          {/* Profile Content Area */}
          <div className="col-span-12 flex flex-col gap-8 md:col-span-9">
            {/* Page Heading */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Account Settings
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your personal information, password, and profile picture.
              </p>
            </div>

            {/* Personal Information Card */}
            <UserProfileInfo />

            {/* Change Password Card */}
            <PasswordChangeForm />
          </div>
        </div>
      </main>
    </div>
  );
}
