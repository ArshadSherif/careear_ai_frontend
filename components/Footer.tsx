import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} CareerCoach. All rights reserved.
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
