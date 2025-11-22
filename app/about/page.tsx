import { Users, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="flex-1 bg-white">
            {/* Hero Section */}
            <div className="bg-gray-50 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                        Empowering Careers with AI
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        We believe everyone deserves a career they love. Our mission is to democratize career guidance using advanced artificial intelligence.
                    </p>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-6xl mx-auto py-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Universal Access</h3>
                        <p className="text-gray-600">
                            High-quality career coaching shouldn't be a luxury. We make expert guidance accessible to everyone, everywhere.
                        </p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Data Privacy</h3>
                        <p className="text-gray-600">
                            Your career journey is personal. We treat your data with the highest standards of security and confidentiality.
                        </p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Human Centric</h3>
                        <p className="text-gray-600">
                            AI is our tool, but people are our focus. We design our technology to enhance human potential, not replace it.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team/Story Section */}
            <div className="bg-gray-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl font-bold">Our Story</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Founded in 2024, CareerCoach started with a simple question: "Why is finding the right career so hard?"
                        We combined decades of career counseling expertise with cutting-edge machine learning to create a platform
                        that understands you better than a traditional job board ever could.
                    </p>
                </div>
            </div>
        </main>
    );
}
