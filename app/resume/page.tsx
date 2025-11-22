"use client";

import { FileUploader } from "@/components/FileUploader";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResumePage() {
    const { sessionId, isLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !sessionId) {
            router.push("/login");
        }
    }, [sessionId, isLoading, router]);

    if (isLoading) return null;


    return (
        <main className="flex flex-1 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-4 lg:p-8">
                {/* Left Side - Context */}
                <div className="w-full lg:w-1/3 space-y-6 lg:pt-12">
                    <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-2xl font-bold mb-4">Why upload a resume?</h2>
                        <p className="text-indigo-100 leading-relaxed mb-6">
                            Your resume is the key to unlocking personalized career insights. Our AI analyzes your experience to find the perfect match.
                        </p>
                        <ul className="space-y-3 text-indigo-50 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                Automatic skill extraction
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                Personalized domain recommendations
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                Gap analysis against market trends
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side - Uploader */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center items-center">
                        <div className="w-full max-w-xl space-y-8">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Upload Your Resume</h1>
                                <p className="text-gray-500">We'll analyze your resume to match you with the best opportunities.</p>
                            </div>
                            <FileUploader />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
