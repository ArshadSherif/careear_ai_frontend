"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import api from "@/lib/api";
import { SoftSkillCard } from "@/components/SoftSkillCard";
import { Loader2 } from "lucide-react";

interface Question {
    id: number;
    text: string;
}

interface Answer {
    question_id: number;
    answer: string;
}

const BATCH_SIZE = 10;
const TOTAL_QUESTIONS = 20; // Stop after 2 batches

export default function SoftSkillsPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [offset, setOffset] = useState(0);

    const { sessionId, isLoading: isSessionLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isSessionLoading && !sessionId) {
            router.push("/login");
        }
    }, [sessionId, isSessionLoading, router]);

    const fetchQuestions = async (currentOffset: number) => {
        setLoading(true);
        try {
            // Backend uses limit and offset
            const response = await api.get(`/questions/soft-skills/questions?limit=${BATCH_SIZE}&offset=${currentOffset}`);
            if (response.data && response.data.items) {
                // Enforce batch size on the frontend in case backend ignores limit
                setQuestions(response.data.items.slice(0, BATCH_SIZE));
                setCurrentQuestionIndex(0);
            }
        } catch (error) {
            console.error("Failed to fetch questions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sessionId) {
            fetchQuestions(0);
        }
    }, [sessionId]);

    const handleAnswer = async (answer: string) => {
        if (!questions[currentQuestionIndex]) return;

        const newAnswer: Answer = {
            question_id: questions[currentQuestionIndex].id,
            answer,
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Batch complete
            await submitBatch(updatedAnswers);
        }
    };

    const submitBatch = async (batchAnswers: Answer[]) => {
        setSubmitting(true);
        try {
            await api.post("/questions/soft-skills/answers/batch", {
                session_id: sessionId,
                answers: batchAnswers,
            });

            const nextOffset = offset + BATCH_SIZE;
            if (nextOffset < TOTAL_QUESTIONS) {
                setOffset(nextOffset);
                setAnswers([]); // Clear local answers for next batch
                await fetchQuestions(nextOffset);
            } else {
                router.push("/technical-domain");
            }
        } catch (error) {
            console.error("Failed to submit answers", error);
            alert("Failed to save answers. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isSessionLoading || loading || submitting) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="mt-4 text-gray-500">
                    {submitting ? "Saving answers..." : "Loading questions..."}
                </p>
            </main>
        );
    }

    if (questions.length === 0) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-50">
                <p className="text-gray-500">No questions available.</p>
            </main>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    // Calculate absolute progress
    const absoluteCurrentNumber = offset + currentQuestionIndex + 1;

    return (
        <main className="flex flex-1 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-2xl">
                    <SoftSkillCard
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                        currentNumber={absoluteCurrentNumber}
                        totalNumber={TOTAL_QUESTIONS}
                    />
                </div>
            </div>
        </main>
    );
}
