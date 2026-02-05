import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/lib/models/Product";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "0");
    const skip = parseInt(searchParams.get("skip") || "0");

    const products = await Product.find().skip(skip).limit(limit);
    return NextResponse.json(products);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}