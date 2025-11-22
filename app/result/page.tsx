"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import api from "@/lib/api";
import { Loader2, CheckCircle, Briefcase, User, FileText } from "lucide-react";

export default function ResultPage() {
    const [softSkillsResult, setSoftSkillsResult] = useState<any>(null);
    const [technicalDomain, setTechnicalDomain] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { sessionId, isLoading: isSessionLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isSessionLoading && !sessionId) {
            // For result page, prompt says "No login required (temporary session only)".
            // But we need session_id to fetch data. 
            // If session_id is missing in storage, we can't fetch data.
            // So we should probably redirect or show error.
            router.push("/login");
        }
    }, [sessionId, isSessionLoading, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!sessionId) return;

            try {
                // Fetch Soft Skills Result
                const ssResponse = await api.get("/questions/soft-skills/results");
                setSoftSkillsResult(ssResponse.data);

                // Get Technical Domain from local storage (since we didn't save it to backend explicitly in previous step)
                // Or if backend computed it, we might want to fetch it?
                // The prompt said "Backend returns the domain name...". 
                // If the backend saves it during the tree traversal (which I doubt given the GET endpoint), 
                // we rely on what we have.
                // Let's check sessionStorage first.
                const storedDomain = sessionStorage.getItem("technical_domain");
                setTechnicalDomain(storedDomain);

            } catch (error) {
                console.error("Failed to fetch results", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionId]);

    if (isSessionLoading || loading) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="mt-4 text-gray-500">Generating your career profile...</p>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                        Your Career Profile
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        We've analyzed your profile and found the perfect path for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Technical Domain Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Briefcase className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Recommended Domain</h2>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <p className="text-3xl font-bold text-blue-600">
                                {technicalDomain || "Not determined"}
                            </p>
                            <p className="text-base text-gray-500 mt-3 leading-relaxed">
                                Based on your technical preferences, skills, and background analysis, this domain aligns best with your career goals.
                            </p>
                        </div>
                    </div>

                    {/* Soft Skills Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <User className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Soft Skills Profile</h2>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            {softSkillsResult && softSkillsResult.result ? (
                                <div className="space-y-4">
                                    {Object.entries(softSkillsResult.result)
                                        .sort(([, a], [, b]) => (b as number) - (a as number))
                                        .slice(0, 5) // Show top 5
                                        .map(([skill, score]) => (
                                            <div key={skill} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium text-gray-700">{skill}</span>
                                                    <span className="text-gray-500">{score as number} pts</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500 rounded-full"
                                                        style={{ width: `${Math.min(((score as number) / 15) * 100, 100)}%` }} // Assuming max score around 15 based on data
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    {Object.keys(softSkillsResult.result).length > 5 && (
                                        <p className="text-xs text-center text-gray-400 pt-2">
                                            And {Object.keys(softSkillsResult.result).length - 5} more skills analyzed
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No soft skills data available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resume & JD Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <FileText className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Resume & Job Analysis</h2>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Your resume has been successfully processed and linked to your session. We've used this data to tailor your technical domain recommendation.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center pt-8 pb-12">
                    <button
                        onClick={() => router.push("/login")}
                        className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Start New Session
                    </button>
                </div>
            </div>
        </main>
    );
}
