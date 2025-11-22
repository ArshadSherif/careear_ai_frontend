"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import api from "@/lib/api";
import { Loader2, CheckCircle, Briefcase, User, FileText } from "lucide-react";

export default function ResultPage() {
  const [softSkillsResult, setSoftSkillsResult] = useState<any>(null);
  const [technicalDomains, setTechnicalDomains] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { sessionId, isLoading: isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && !sessionId) router.push("/login");
  }, [sessionId, isSessionLoading, router]);

  useEffect(() => {
    if (!sessionId) return;

    const load = async () => {
      try {
        const ss = await api.get("/questions/soft-skills/results");
        setSoftSkillsResult(ss.data);

        const stored = sessionStorage.getItem("technical_domains");
        setTechnicalDomains(stored ? JSON.parse(stored) : null);
      } catch (_) {}
      setLoading(false);
    };

    load();
  }, [sessionId]);

  if (isSessionLoading || loading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="mt-4 text-gray-500">Preparing your final results…</p>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Domains */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Technical Domains
              </h2>
            </div>

            <div className="pt-4 border-t border-gray-50 space-y-4">
              {technicalDomains ? (
                Object.entries(technicalDomains).map(([d, r]) => (
                  <div key={d} className="p-4 bg-gray-50 rounded-xl border">
                    <h3 className="font-semibold text-gray-900">{d}</h3>
                    <p className="text-gray-600 mt-2">
                      Final Result: {String(r)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No technical domain data.
                </p>
              )}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Soft Skills</h2>
            </div>

            <div className="pt-4 border-t border-gray-50">
              {softSkillsResult && softSkillsResult.result ? (
                <div className="space-y-4">
                  {Object.entries(softSkillsResult.result)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .slice(0, 5)
                    .map(([skill, score]) => (
                      <div key={skill} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">
                            {skill}
                          </span>
                          <span className="text-gray-500">
                            {score as number} pts
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                ((score as number) / 15) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No soft skills summary.</p>
              )}
            </div>
          </div>
        </div>

        {/* Resume + JD analysis */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Resume & JD</h2>
          </div>
          <div className="pt-4 border-t border-gray-50">
            <p className="text-lg text-gray-600">
              Resume and JD inputs have been applied to determine your technical
              domain pathways.
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-8 pb-12">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800"
          >
            Start New Session
          </button>
        </div>
      </div>
    </main>
  );
}
