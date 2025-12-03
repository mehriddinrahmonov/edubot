"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Calendar, GraduationCap, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/calendar", label: "Calendar", icon: Calendar },
        { href: "/grades", label: "Grades", icon: GraduationCap },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40">
                <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" />
                    Edubot
                </h1>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={cn(
                "fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:transform-none flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-gray-200 hidden md:block">
                    <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                        <GraduationCap className="w-8 h-8" />
                        Edubot
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        );
                    })}
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
        </>
    );
}
