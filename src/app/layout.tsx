import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MD. Miskatul Masabi | AI Engineer & Systems Builder",
  description: "Building AI Agents, Multi-Agent Systems, Computer Vision Solutions, and Production-Ready AI Architectures.",
  keywords: [
    "AI Developer",
    "Generative AI Engineer",
    "AI Backend Developer",
    "Machine Learning Engineer",
    "Computer Vision Engineer",
    "FastAPI Developer",
    "RAG Engineer",
    "AI Agent Developer",
    "YOLO Developer"
  ],
  authors: [{ name: "MD. Miskatul Masabi" }],
  openGraph: {
    title: "MD. Miskatul Masabi | AI Engineer & Systems Builder",
    description: "Building AI Agents, Multi-Agent Systems, Computer Vision Solutions, and Production-Ready AI Architectures.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-primary-bg text-gray-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

