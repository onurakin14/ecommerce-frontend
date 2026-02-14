import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ userId: string }> }) {
    try {
        await connectDB();

        const { userId } = await context.params;
        console.log(context);

        const user = await User.findOne({ id: userId });
        return NextResponse.json(user ? user : { message: "User not found" }, { status: user ? 200 : 404 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}