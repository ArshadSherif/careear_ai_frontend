import { CheckCircle2, FileText, BrainCircuit, Target } from "lucide-react";

export default function HowItWorksPage() {
    const steps = [
        {
            icon: FileText,
            title: "Upload Resume",
            description: "Start by uploading your resume. Our AI analyzes your experience, skills, and background to create a baseline profile."
        },
        {
            icon: BrainCircuit,
            title: "Soft Skills Assessment",
            description: "Take a quick, engaging assessment to evaluate your soft skills, work style, and professional preferences."
        },
        {
            icon: Target,
            title: "Technical Domain Matching",
            description: "Answer a series of targeted questions to pinpoint the exact technical domain that suits your interests and aptitude."
        },
        {
            icon: CheckCircle2,
            title: "Get Your Results",
            description: "Receive a comprehensive career profile with recommended roles, skill gaps, and a personalized roadmap."
        }
    ];

    return (
        <main className="flex-1 bg-gray-50 py-16 px-4">
            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        How CareerCoach Works
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Your journey to the perfect career in four simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />

                    {steps.map((step, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute -top-6 left-8 bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                {index + 1}
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-600 rounded-3xl p-12 text-center space-y-6 text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold">Ready to find your path?</h2>
                        <p className="text-blue-100 max-w-xl mx-auto text-lg">
                            Join thousands of professionals who have found their dream careers with CareerCoach.
                        </p>
                        <a href="/login" className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                            Get Started Now
                        </a>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />
                </div>
            </div>
        </main>
    );
}
