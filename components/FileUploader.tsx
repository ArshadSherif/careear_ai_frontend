"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

export function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { sessionId, saveResumeId } = useSession();
    const router = useRouter();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!validTypes.includes(file.type)) {
            setError("Please upload a PDF or DOCX file.");
            return;
        }
        setFile(file);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file || !sessionId) return;

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            // The backend expects session_id as a query param or part of the request.
            // Based on router code: upload_resume(file: UploadFile, session_id: str = "default", ...)
            // It seems session_id is a query param by default in FastAPI if not specified as Form.
            // Let's try appending it to URL.
            const response = await api.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data && response.data.id) {
                saveResumeId(response.data.id.toString());
                router.push("/jd");
            } else {
                setError("Upload failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred during upload.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
                    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
                    file ? "bg-gray-50" : "bg-white"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                />

                {file ? (
                    <div className="flex flex-col items-center space-y-2">
                        <FileText className="w-12 h-12 text-blue-500" />
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                            }}
                            className="text-sm text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <Upload className="w-12 h-12 text-gray-400" />
                        <p className="font-medium text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PDF or DOCX (max 10MB)</p>
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center p-4 text-red-800 bg-red-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={cn(
                    "w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors",
                    !file || isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                )}
            >
                {isUploading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    "Upload Resume"
                )}
            </button>
        </div>
    );
}
