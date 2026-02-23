import { connectDB } from "@/lib/db/mongodb";
import { productService } from "@/lib/services/product.service";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  await connectDB();

  const products = await productService.getAllProducts();

  return Response.json(
    { products, total: products.length },
    { headers: corsHeaders }
  );
}