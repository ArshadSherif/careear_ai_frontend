"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import api from "@/lib/api";
import { DecisionTree } from "@/components/DecisionTree";
import { Loader2 } from "lucide-react";

export default function TechnicalDomainPage() {
  const [trees, setTrees] = useState<any>(null); // { domain : tree }
  const [domainList, setDomainList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const { sessionId, isLoading: isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && !sessionId) router.push("/login");
  }, [sessionId, isSessionLoading, router]);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      try {
        // step 1: fetch top-3 domains
        const selectRes = await api.get("/technical/select");
        const topDomains = selectRes.data.top_domains || [];

        const names = topDomains.map((d: any) => d.domain);
        setDomainList(names);

        // step 2: fetch trees for each domain
        const allTrees: any = {};
        for (const name of names) {
          const r = await api.get("/technical/tree", {
            params: { domain_name: name },
          });
          allTrees[name] = r.data.tree;
        }
        setTrees(allTrees);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  const handleComplete = (result: any) => {
    const domain = domainList[currentIndex];

    const updated = { ...answers, [domain]: result };
    setAnswers(updated);

    const next = currentIndex + 1;

    if (next < domainList.length) {
      setCurrentIndex(next);
    } else {
      sessionStorage.setItem("technical_domains", JSON.stringify(updated));
      router.push("/result");
    }
  };

  if (isSessionLoading || loading || !trees || domainList.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="mt-4 text-gray-500">
          Loading technical domain assessments…
        </p>
      </main>
    );
  }

  const currentDomain = domainList[currentIndex];
  const currentTree = trees[currentDomain];

  return (
    <main className="flex flex-1 bg-gray-50 relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-gray-900">
              Technical Domain ({currentIndex + 1} of {domainList.length})
            </h1>
            <p className="text-gray-500">Current: {currentDomain}</p>
          </div>

          <DecisionTree tree={currentTree} onComplete={handleComplete} />
        </div>
      </div>
    </main>
  );
}
