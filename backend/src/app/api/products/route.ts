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

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = req.json();
    const product = Product.create(body);
    return NextResponse.json(product);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const body = await req.json();
    const product = await Product.findByIdAndUpdate(id, body);
    return NextResponse.json(product);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const product = await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully", product });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
