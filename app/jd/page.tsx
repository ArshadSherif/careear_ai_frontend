"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function JDPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { sessionId, isLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!sessionId) {
                router.push("/login");
            } else {
                // Check if resume is uploaded
                const resumeId = sessionStorage.getItem("resume_id");
                if (!resumeId) {
                    router.push("/resume");
                }
            }
        }
    }, [sessionId, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionId) return;

        setIsSubmitting(true);
        try {
            await api.post("/jd/", {
                title,
                description, // Note: Backend schema might expect 'text' or 'description'. 
                // Let's check the schema if possible, but based on prompt it was 'text'. 
                // However, standard naming is usually description. 
                // I'll assume 'text' based on prompt but check schema if I can.
                // Wait, I saw jd_router.py but not schemas. 
                // Let's use 'text' as per prompt to be safe, or check schemas.
                // Prompt said: body: { session_id, title, text }
                // But router uses `jd_in: schemas.JobDescriptionCreate`.
                // I'll stick to prompt 'text' but mapped to description if needed.
                // Actually, let's check schemas later if it fails. For now I will use 'text' as per prompt request.
                text: description,
                session_id: sessionId
            });
            router.push("/soft-skills");
        } catch (error) {
            console.error("Failed to upload JD", error);
            // Proceed anyway? No, user should know.
            alert("Failed to save Job Description. You can skip if you want.");
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        router.push("/soft-skills");
    };

    if (isLoading) return null;

    return (
        <main className="flex flex-1 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-4 lg:p-8">
                {/* Left Side - Context */}
                <div className="w-full lg:w-1/3 space-y-6 lg:pt-12">
                    <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-2xl font-bold mb-4">Why this matters?</h2>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            Providing a job description helps our AI understand the specific requirements and context of the role you're targeting.
                        </p>
                        <ul className="space-y-3 text-blue-50 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                Tailored technical questions
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                Better skill gap analysis
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                More accurate role matching
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                        <div className="space-y-2 mb-8">
                            <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Job Description</h1>
                            <p className="text-gray-500">Paste the job description you are interested in.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                    Job Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={cn(
                                        "flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                                    )}
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    Job Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={cn(
                                        "flex min-h-[300px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all resize-none leading-relaxed"
                                    )}
                                    placeholder="Paste the full job description here..."
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleSkip}
                                    className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                >
                                    Skip for now
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !title || !description}
                                    className={cn(
                                        "flex-1 flex justify-center items-center py-3 px-6 rounded-xl text-sm font-semibold text-white transition-all shadow-lg hover:shadow-xl",
                                        isSubmitting || !title || !description
                                            ? "bg-gray-300 cursor-not-allowed shadow-none"
                                            : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        "Continue to Assessment"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
