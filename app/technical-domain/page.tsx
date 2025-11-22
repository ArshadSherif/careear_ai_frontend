"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import api from "@/lib/api";
import { DecisionTree } from "@/components/DecisionTree";
import { Loader2 } from "lucide-react";

export default function TechnicalDomainPage() {
    const [treeData, setTreeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { sessionId, isLoading: isSessionLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isSessionLoading && !sessionId) {
            router.push("/login");
        }
    }, [sessionId, isSessionLoading, router]);

    useEffect(() => {
        const fetchTree = async () => {
            if (!sessionId) return;

            try {
                // 1. Get the selected domain
                const selectResponse = await api.get("/technical/select");
                const domainName = selectResponse.data.selected_domain;

                if (domainName) {
                    // 2. Get the tree for the domain
                    const treeResponse = await api.get("/technical/tree", {
                        params: { domain_name: domainName }
                    });
                    setTreeData(treeResponse.data.tree);
                }
            } catch (error) {
                console.error("Failed to fetch technical domain tree", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTree();
    }, [sessionId]);

    const handleComplete = async (result: string) => {
        try {
            sessionStorage.setItem("technical_domain", result);
            // Add a small delay for user to see the result
            setTimeout(() => {
                router.push("/result");
            }, 1500);
        } catch (error) {
            console.error("Error handling completion", error);
            router.push("/result");
        }
    };

    if (isSessionLoading || loading) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="mt-4 text-gray-500">Loading technical domain assessment...</p>
            </main>
        );
    }

    if (!treeData) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
                <p className="text-gray-500">Failed to load assessment.</p>
            </main>
        );
    }

    return (
        <main className="flex flex-1 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-3xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Technical Domain</h1>
                        <p className="text-gray-500">Let's find your best fit.</p>
                    </div>
                    <DecisionTree tree={treeData} onComplete={handleComplete} />
                </div>
            </div>
        </main>
    );
}
