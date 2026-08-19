import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!credential || !clientId) throw new Error("Google sign-in is not configured.");
    const ticket = await new OAuth2Client(clientId).verifyIdToken({ idToken: credential, audience: clientId });
    const profile = ticket.getPayload();
    if (!profile?.sub || !profile.email_verified) throw new Error("Google could not verify this account.");
    return NextResponse.json({ name: profile.name || profile.email?.split("@")[0] || "Adventurer", picture: profile.picture || "", email: profile.email || "" });
  } catch {
    return NextResponse.json({ error: "Google sign-in couldn’t be completed. Please try again." }, { status: 401 });
  }
}
