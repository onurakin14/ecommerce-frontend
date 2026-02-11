import { connectDB } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();
        console.log(req);        

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}