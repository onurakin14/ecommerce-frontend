import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/models/Product";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "0");
    const skip = parseInt(searchParams.get("skip") || "0");
    const sortBy = searchParams.get("sortBy") || "id";
    const order = searchParams.get("order") === "desc" ? -1 : 1;

    const total = await Product.countDocuments();

    const products = await Product.find().skip(skip).limit(limit).sort({ [sortBy]: order });
    return NextResponse.json({ total, limit, skip, products });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
