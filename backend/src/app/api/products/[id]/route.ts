import { connectDB } from "@/lib/db/mongodb";
import { productService } from "@/lib/services/product.service";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const productId = parseInt(id, 10);
  if (Number.isNaN(productId)) {
    return Response.json(
      { error: "Invalid product id" },
      { status: 400, headers: corsHeaders }
    );
  }

  const product = await productService.getProductById(productId);
  if (!product) {
    return Response.json(
      { error: "Product not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return Response.json(product, { headers: corsHeaders });
}
