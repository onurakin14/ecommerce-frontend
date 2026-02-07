import { connectDB } from "@/lib/db/mongodb";
import Category from "@/lib/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const categories = Category.find();
        return NextResponse.json({ categories });

    } catch (err: any) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}
