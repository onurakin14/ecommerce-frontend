import { useState } from "react";
export default function PasswordChangeForm() {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Updating password");
    alert("Password updated!");
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
      </div>
      <form className="grid grid-cols-1 gap-6 p-5">
        <label className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">Current Password</p>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>
        <label className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">New Password</p>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>
        <label className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">
            Confirm New Password
          </p>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>
      </form>
      <div className="flex justify-end gap-3 rounded-b-xl border-t border-gray-200 bg-gray-50 p-4">
        <button
          onClick={handleUpdatePassword}
          className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
