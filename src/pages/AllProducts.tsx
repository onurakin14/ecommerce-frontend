import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

export default function AllProducts() {
  return (
    <div className="p-6">
      <Breadcrumb path={["Home", "Shop", "All Products"]} />
      <h1 className="text-2xl font-semibold mt-4">All Products</h1>
    </div>
  );
}
