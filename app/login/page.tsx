import { LoginForm } from "@/components/LoginForm";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="flex flex-1 min-h-[calc(100vh-theme(spacing.16))]">
            {/* Left Side - Branding & Visuals */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-400 opacity-10 rounded-full blur-3xl" />

                <div className="relative z-10 text-white space-y-8 max-w-lg">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold leading-tight">
                        Unlock Your True Career Potential
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        Join thousands of professionals who have discovered their perfect career path through our AI-powered assessment platform.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-8">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">95%</h3>
                            <p className="text-blue-200 text-sm">Placement Rate</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold">50k+</h3>
                            <p className="text-blue-200 text-sm">Career Matches</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>
        </main>
    );
}
