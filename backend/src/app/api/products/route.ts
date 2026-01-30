import { connectDB } from "@/lib/db/mongodb";
import { productService } from "@/lib/services/product.service";

export async function GET() {
  await connectDB();

  const products = await productService.getAllProducts();

  return Response.json({
    products,
    total: products.length,
  });
}