import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Calendar, GraduationCap, MessageSquare } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

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
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <GraduationCap className="w-8 h-8" />
                Edubot
              </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <Link href="/calendar" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <Calendar className="w-5 h-5" />
                Calendar
              </Link>
              <Link href="/grades" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <GraduationCap className="w-5 h-5" />
                Grades
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-3 text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">AS</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Alex Student</p>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </aside>

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
