import type { Metadata } from "next";
import { Inter, Cinzel, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const permanentMarker = Permanent_Marker({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
});

export const metadata: Metadata = {
  title: "Auto-Battler: Realms of Strategy",
  description: "A tactical auto-battler blending inventory mastery and legendary heroes. Forge your strategy and command epic battles in this dark fantasy realm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} ${permanentMarker.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
