import type { Metadata } from "next";
import "./globals.css";
import { cinzelDecorative, cinzel, cormorant, lora, mysteryQuest } from "./fonts";

export const metadata: Metadata = {
  title: "☀️ MossyRealm - A Cozy Corner of the Web",
  description: "Welcome to MossyRealm, a whimsical forest realm on the internet. A cozy personal site with that nostalgic early web charm.",
  keywords: ["personal site", "neocities", "web garden", "cozy", "forest", "retro web"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          min-h-screen
          ${cinzelDecorative.variable}
          ${cinzel.variable}
          ${cormorant.variable}
          ${lora.variable}
          ${mysteryQuest.variable}
        `}
      >
        {/* Dark overlay for wallpaper readability */}
        <div className="wallpaper-overlay" aria-hidden="true" />

        {/* Site wrapper - just positions the centered box */}
        <div className="site-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
