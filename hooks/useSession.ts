import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export function useSession() {
    // Initialize state lazily to avoid initial null state if data exists
    const [sessionId, setSessionId] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem("session_id");
        }
        return null;
    });

    const [email, setEmail] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem("email");
        }
        return null;
    });

    const [resumeId, setResumeId] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem("resume_id");
        }
        return null;
    });

    const startSession = (userEmail: string) => {
        const newSessionId = uuidv4();
        sessionStorage.setItem("session_id", newSessionId);
        sessionStorage.setItem("email", userEmail);

        // Set cookie for middleware
        document.cookie = `session_id=${newSessionId}; path=/; max-age=86400; SameSite=Strict`;

        setSessionId(newSessionId);
        setEmail(userEmail);
        return newSessionId;
    };

    const saveResumeId = (id: string) => {
        sessionStorage.setItem("resume_id", id);
        setResumeId(id);
    };

    return {
        sessionId,
        email,
        resumeId,
        startSession,
        saveResumeId,
        isLoading: false // No longer needed as we initialize synchronously
    };
}
