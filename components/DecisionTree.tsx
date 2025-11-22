"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface TreeData {
  [key: string]: any;
}

interface DecisionTreeProps {
  tree: TreeData;
  onComplete: (result: string) => void;
}

export function DecisionTree({ tree, onComplete }: DecisionTreeProps) {
  // ---- Detect correct root node ----
  const detectRoot = () => {
    const keys = Object.keys(tree).filter((k) => k !== "endpoints");

    const exact = keys.find((k) => k.endsWith("_q1"));
    if (exact) return exact;

    const fallback = keys.find((k) => k.includes("q1"));
    if (fallback) return fallback;

    return keys[0] || "";
  };

  // ---- Always reset when tree changes ----
  const [currentNodeId, setCurrentNodeId] = useState(detectRoot());
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setCurrentNodeId(detectRoot());
    setHistory([]);
  }, [tree]);

  const currentNode = tree[currentNodeId];

  // ---- Safety fallback for missing nodes ----
  // ---- DO NOT auto-complete when currentNode is null during tree switch ----
  if (!currentNode) {
    return null; // just wait for tree + currentNodeId sync
  }

  const handleChoice = (choice: "yes" | "no") => {
    const nextId = currentNode[choice];

    // If nextId missing → user hit a dead end → undetermined
    if (!nextId) {
      setTimeout(() => onComplete("Undetermined"), 0);
      return;
    }

    // endpoint
    if (nextId.startsWith("END_")) {
      const endpoints = tree.endpoints || {};
      const roles = endpoints[nextId];

      const result =
        Array.isArray(roles) && roles.length > 0
          ? roles.join(", ")
          : "Undetermined";

      setTimeout(() => onComplete(result), 0);
      return;
    }

    // broken next node → undetermined
    if (!tree[nextId]) {
      setTimeout(() => onComplete("Undetermined"), 0);
      return;
    }

    // valid → go next
    setHistory((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(nextId);
  };
const handleBack = () => {
  if (history.length === 0) return;

  const prev = history[history.length - 1];
  setHistory(history.slice(0, -1));
  setCurrentNodeId(prev);
};

return (
  <div className="w-full max-w-3xl mx-auto">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentNodeId}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10 space-y-8 relative overflow-hidden"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          {currentNode.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleChoice("yes")}
            className="group relative flex flex-col items-center justify-center py-6 px-6 rounded-2xl border-2 border-green-100 bg-green-50/30 hover:bg-green-50 hover:border-green-500"
          >
            <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-lg font-bold text-green-800">Yes, I do</span>
          </button>

          <button
            onClick={() => handleChoice("no")}
            className="group relative flex flex-col items-center justify-center py-6 px-6 rounded-2xl border-2 border-red-100 bg-red-50/30 hover:bg-red-50 hover:border-red-500"
          >
            <XCircle className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-lg font-bold text-red-800">No, I don't</span>
          </button>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleBack}
            className="text-sm text-gray-500 hover:text-gray-800 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
);
}
