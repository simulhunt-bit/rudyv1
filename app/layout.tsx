import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudy — Your AI Adventure Companion",
  description: "Rudy is your personal AI adventure companion. Chat, learn, research and create with one intelligent assistant.",
  metadataBase: new URL("https://qartibe.space"),
  openGraph: { title: "Rudy — Your AI Adventure Companion", description: "One conversation. Multiple AI capabilities. One Rudy.", type: "website" },
  twitter: { card: "summary_large_image", title: "Rudy — Your AI Adventure Companion", description: "Your AI adventure companion." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
