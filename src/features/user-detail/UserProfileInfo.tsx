import { useState, ChangeEvent } from "react";

export default function UserProfileInfo() {
  const [formData, setFormData] = useState({
    firstName: "Daniel",
    lastName: "Smith",
    email: "daniel.smith@example.com",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
    alert("Changes saved!");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900">
          Personal Information
        </h2>
      </div>
      <form className="p-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-900">First Name</p>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>
          <label className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-900">Last Name</p>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>
          <label className="flex flex-col gap-2 sm:col-span-2">
            <p className="text-sm font-medium text-gray-900">Email Address</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>
        </div>
      </form>
      <div className="flex justify-end gap-3 rounded-b-xl border-t border-gray-200 bg-gray-50 p-4">
        <button className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white px-4 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Cancel
        </button>
        <button
          onClick={handleSaveChanges}
          className="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
