import { connectDB } from "@/lib/db/mongodb";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ userId: string }> }) {
    try {
        await connectDB();
        const { userId } = await context.params;

        const carts = await Cart.find();

        return NextResponse.json({ message: `User ID is ${userId}` });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}