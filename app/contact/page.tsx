import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="flex-1 bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
                    <p className="text-gray-500 text-lg">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">support@careercoach.ai</p>
                                    <p className="text-gray-600">partners@careercoach.ai</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-sm text-gray-400">Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Office</h3>
                                    <p className="text-gray-600">
                                        123 Innovation Drive<br />
                                        Tech City, TC 90210
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder:text-gray-400" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder:text-gray-400" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder:text-gray-400" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-32 resize-none text-gray-900 placeholder:text-gray-400" placeholder="How can we help you?" />
                            </div>

                            <button type="button" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
