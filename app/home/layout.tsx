import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Load Inter (sans-serif)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Load Roboto Mono (monospace)
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UrbanProperties CRM",
  description: "Real estate management dashboard and CRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {/* Navbar at top */}
        <Navbar />

        {/* Main page content */}
        <main className="min-h-screen pt-16">{children}</main>

        {/* Footer at bottom */}
        <Footer />
      </body>
    </html>
  );
}
