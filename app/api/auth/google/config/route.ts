import { NextResponse } from "next/server";

export function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) return NextResponse.json({ error: "Google sign-in is not configured." }, { status: 503 });
  return NextResponse.json({ clientId });
}
