import { connectDB } from "@/lib/db/mongodb";
import { productService } from "@/lib/services/product.service";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(request: Request) {
  await connectDB();

  // URL'deki query parametrelerini alıyoruz
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get("ids"); // Örn: "1,5,12"

  let products;

  if (idsParam) {
    // String olarak gelen "1,5,12" verisini [1, 5, 12] şeklinde sayı dizisine çeviriyoruz
    const idsArray = idsParam
      .split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id)); // Hatalı verileri (NaN) filtrele

    products = await productService.getProductsByIds(idsArray);
  } else {
    // Parametre yoksa tüm ürünleri getir
    products = await productService.getAllProducts();
  }

  return Response.json(
    { products, total: products.length },
    { headers: corsHeaders }
  );
}