"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Question {
    id: number;
    text: string;
}

interface SoftSkillCardProps {
    question: Question;
    onAnswer: (answer: "Agree" | "Neutral" | "Disagree") => void;
    currentNumber: number;
    totalNumber: number;
}

export function SoftSkillCard({ question, onAnswer, currentNumber, totalNumber }: SoftSkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 space-y-10 relative overflow-hidden"
        >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${(currentNumber / totalNumber) * 100}%` }}
                />
            </div>

            <div className="space-y-4 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase">
                    Question {currentNumber} of {totalNumber}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {(question as any).question_text || (question as any).text || (question as any).question || (question as any).content || (question as any).body || "Question text missing"}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[
                    { label: "Disagree", color: "red", bg: "bg-red-50", border: "border-red-100", hover: "hover:border-red-500 hover:bg-red-50", text: "text-red-700" },
                    { label: "Neutral", color: "gray", bg: "bg-gray-50", border: "border-gray-100", hover: "hover:border-gray-500 hover:bg-gray-50", text: "text-gray-700" },
                    { label: "Agree", color: "green", bg: "bg-green-50", border: "border-green-100", hover: "hover:border-green-500 hover:bg-green-50", text: "text-green-700" }
                ].map((option) => (
                    <button
                        key={option.label}
                        onClick={() => onAnswer(option.label as any)}
                        className={cn(
                            "py-6 px-6 rounded-2xl border-2 text-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg",
                            option.border,
                            option.hover,
                            option.text
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
