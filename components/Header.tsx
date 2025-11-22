import Link from "next/link";
import { BrainCircuit } from "lucide-react";

const navItems = [
    { href: "/how-it-works", label: "How it Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white transition-all">
            <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-md shadow-blue-200">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        CareerCoach
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group py-2"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-700">U</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
