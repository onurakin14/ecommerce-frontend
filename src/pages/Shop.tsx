import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

export default function Shop() {
  return (
    <div className="p-6">
      <Breadcrumb path={["Home", "Shop"]} />
      <h1 className="text-2xl font-semibold mt-4">Shop Page</h1>
    </div>
  );
}
