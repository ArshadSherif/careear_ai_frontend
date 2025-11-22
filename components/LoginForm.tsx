"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/utils";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const { startSession } = useSession();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            startSession(email);
            router.push("/resume");
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Welcome</h1>
                <p className="text-gray-500">Enter your email to get started</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={cn(
                            "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    />
                </div>
                <button
                    type="submit"
                    className={cn(
                        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    )}
                >
                    Continue
                </button>
            </form>
        </div>
    );
}
