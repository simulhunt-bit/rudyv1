import { NextRequest, NextResponse } from "next/server";
import { routeChat } from "@/lib/ai/router";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reply = await routeChat(body.messages ?? [], body.provider ?? "auto");
    return NextResponse.json(reply);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Rudy hit an unexpected rock.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
