"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface TreeData {
    [key: string]: {
        question?: string;
        yes?: string;
        no?: string;
    } | any; // Allow for endpoints key
}

interface DecisionTreeProps {
    tree: TreeData;
    onComplete: (result: string) => void;
}

export function DecisionTree({ tree, onComplete }: DecisionTreeProps) {
    // Find the first question key (usually the first key that isn't "endpoints")
    const getInitialNode = () => {
        const keys = Object.keys(tree).filter(k => k !== "endpoints");
        return keys.length > 0 ? keys[0] : "";
    };

    const [currentNodeId, setCurrentNodeId] = useState<string>(getInitialNode());
    const [history, setHistory] = useState<string[]>([]);

    const currentNode = tree[currentNodeId];

    // Handle case where tree might be malformed or empty
    if (!currentNode && currentNodeId !== "") {
        return <div>Error: Node {currentNodeId} not found</div>;
    }

    const handleChoice = (choice: "yes" | "no") => {
        const nextId = currentNode[choice];

        if (nextId) {
            // Check if it's an endpoint
            if (nextId.startsWith("END_")) {
                // It's an endpoint. Look it up in endpoints object if it exists, 
                // or just pass the ID if that's what we have.
                // The user JSON has an "endpoints" object mapping IDs to arrays of roles.
                const endpoints = tree["endpoints"] as Record<string, string[]>;
                const result = endpoints && endpoints[nextId] ? endpoints[nextId].join(", ") : nextId;
                onComplete(result);
            } else {
                // It's another question
                setHistory([...history, currentNodeId]);
                setCurrentNodeId(nextId);
            }
        }
    };

    const handleBack = () => {
        if (history.length > 0) {
            const prevId = history[history.length - 1];
            setHistory(history.slice(0, -1));
            setCurrentNodeId(prevId);
        }
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
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-full opacity-50 pointer-events-none" />

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-tight relative z-10">
                        {currentNode.question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                        <button
                            onClick={() => handleChoice("yes")}
                            className="group relative flex flex-col items-center justify-center py-6 px-6 rounded-2xl border-2 border-green-100 bg-green-50/30 hover:bg-green-50 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-lg font-bold text-green-800">
                                Yes, I do
                            </span>
                        </button>
                        <button
                            onClick={() => handleChoice("no")}
                            className="group relative flex flex-col items-center justify-center py-6 px-6 rounded-2xl border-2 border-red-100 bg-red-50/30 hover:bg-red-50 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <span className="text-lg font-bold text-red-800">
                                No, I don't
                            </span>
                        </button>
                    </div>

                    {history.length > 0 && (
                        <button
                            onClick={handleBack}
                            className="flex items-center justify-center w-full text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors mt-8 gap-2 relative z-10"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back to Previous Question
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
