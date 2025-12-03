import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Calendar, GraduationCap, MessageSquare } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edubot",
  description: "Student Portal with AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
