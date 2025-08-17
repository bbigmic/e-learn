import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduPlatform - Platforma E-learningowa",
  description: "Profesjonalna platforma do nauki online z kursami i lekcjami",
  keywords: "e-learning, kursy, nauka online, szkolenia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  );
}
