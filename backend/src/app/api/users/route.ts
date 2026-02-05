import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/models/User";

// export async function GET() {
//     try {
//         await connectDB();

//         const users = await User.find();
//         return NextResponse.json({ users, total: users.length });

//     } catch (err: any) {
//         return NextResponse.json({ error: err.message }, { status: 500 });
//     }
// }

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "0");
        const skip = parseInt(searchParams.get("skip") || "0");

        const users = await User.find().skip(skip).limit(limit);
        return NextResponse.json(users);

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const user = await User.create(body);
        return NextResponse.json(user);

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
