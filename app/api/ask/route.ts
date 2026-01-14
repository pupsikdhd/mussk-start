
import { NextResponse } from "next/server";
import {askGemini} from "@/src/ai/client";

export async function POST(req: Request) {
    const auth = req.headers.get("x-api-password");

    if (auth !== process.env.ASK_API_PASSWORD) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { question } = await req.json();

    if (!question || typeof question !== "string") {
        return NextResponse.json(
            { error: "Invalid question" },
            { status: 400 }
        );
    }

    try {
        const answer = await askGemini(question);
        return NextResponse.json({ answer });
    } catch  {
        return NextResponse.json(
            { error: "AI error"},
            { status: 500 }
        );
    }
}
