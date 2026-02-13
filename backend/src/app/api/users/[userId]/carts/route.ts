import { connectDB } from "@/lib/db/mongodb";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ userId: string }> }) {
    try {
        await connectDB();

        const { userId } = await context.params;
        const userCart = await Cart.findOne({ userId });
        return NextResponse.json(userCart ? { userCart } : { message: "Cart not found" }, { status: 404 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}