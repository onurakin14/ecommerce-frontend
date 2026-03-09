import { connectDB } from "@/lib/db/mongodb";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();

        const carts = await Cart.find();
        return NextResponse.json({ carts });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}