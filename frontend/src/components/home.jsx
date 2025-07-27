import React, { useState, useEffect } from "react";
import {
  FileText,
  Users,
  Mic,
  Globe,
  Brain,
  Shield,
  Smartphone,
  Search,
  MessageCircle,
  PenTool,
  Image,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = [
    "Create stunning documents",
    "Collaborate in real-time",
    "Write with AI assistance",
    "Work from anywhere",
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    if (typingText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setTypingText(currentPhrase.slice(0, typingText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypingText("");
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typingText, currentIndex, phrases]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-60"></div>
                <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <FileText className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Edu_Docs
              </span>
            </h1>

            <div className="h-16 mb-8">
              <p className="text-2xl md:text-3xl text-gray-700 font-medium">
                {typingText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The intelligent document editor powered by Google's AI. Write,
              collaborate, and create with features that adapt to your workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Link
                  to="/login"
                  className="
    relative flex items-center gap-2
    px-4 py-1 rounded-xl
    text-slate-900 hover:text-emerald-600
    hover:bg-emerald-100/50
    transition-all duration-300 backdrop-blur-sm
  "
                >
                  <span className="flex items-center gap-2">
                    Start Writing{" "}
                    <PenTool className="h-5 w-5 text-slate-900 group-hover:text-emerald-600 transition-colors" />
                  </span>
                </Link>
              </button>

              <a
                href="https://www.youtube.com/watch?v=-Va1JpmG-oU"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-full text-lg font-semibold hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
              >
                Watch Demo
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Free to use
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Works offline
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                AI-powered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Google Workspace Integration */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Part of Google Workspace
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seamlessly integrated with Gmail, Drive, Meet, Calendar, and more
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center opacity-60">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-sm text-gray-600">Gmail</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-sm text-gray-600">Drive</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-sm text-gray-600">Meet</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-sm text-gray-600">Calendar</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-sm text-gray-600">Sheets</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-sm text-gray-600">Slides</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Intelligent Writing Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of Google's AI and machine learning built
              right into your documents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Compose */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-blue-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Compose
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI-powered writing suggestions help you compose documents faster
                with contextually relevant content.
              </p>
              <div className="text-sm text-blue-600 font-medium">
                ✨ Powered by Google AI
              </div>
            </div>

            {/* Voice Typing */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-purple-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Voice Typing
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Speak naturally and watch your words appear on screen with 99%
                accuracy in 60+ languages.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                🎤 60+ Languages
              </div>
            </div>

            {/* Live Translate */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-green-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Live Translate
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Instantly translate your documents into 100+ languages while
                preserving formatting and context.
              </p>
              <div className="text-sm text-green-600 font-medium">
                🌍 100+ Languages
              </div>
            </div>

            {/* Smart Search */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-orange-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Explore Research
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Find reliable sources, images, and citations directly from
                Google Search without leaving your document.
              </p>
              <div className="text-sm text-orange-600 font-medium">
                📚 Instant Research
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-red-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Suggestions
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Get intelligent suggestions for grammar, style, and tone to make
                your writing more effective.
              </p>
              <div className="text-sm text-red-600 font-medium">
                📝 Writing Assistant
              </div>
            </div>

            {/* Mobile First */}
            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-indigo-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mobile Optimized
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Full editing capabilities on any device with offline sync and
                touch-optimized interface.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                📱 Works Offline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Collaboration Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Collaborate Like Never Before
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See changes as they happen, leave contextual comments, and work
                together seamlessly from anywhere in the world.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Live Cursors
                    </h3>
                    <p className="text-gray-600">
                      See exactly where your teammates are working in real-time
                      with colored cursors and selections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Smart Comments
                    </h3>
                    <p className="text-gray-600">
                      Add contextual comments that follow your text and get
                      AI-powered suggestion responses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Granular Permissions
                    </h3>
                    <p className="text-gray-600">
                      Control exactly what each person can do - view, comment,
                      suggest, or edit with enterprise-grade security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 ml-4">
                    Project Proposal.docx
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          A
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          B
                        </div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          C
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        3 people editing
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div
                        className="h-4 bg-blue-200 rounded animate-pulse"
                        style={{ width: "80%" }}
                      ></div>
                      <div
                        className="h-4 bg-gray-200 rounded animate-pulse"
                        style={{ width: "90%" }}
                      ></div>
                      <div
                        className="h-4 bg-green-200 rounded animate-pulse"
                        style={{ width: "70%" }}
                      ></div>
                    </div>

                    <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <div className="text-sm text-yellow-800">
                        💡 Sarah suggested: "Consider adding market analysis
                        here"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-blue-100">
              Real numbers from real users who rely on Google Docs every day
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                3B+
              </div>
              <p className="text-lg text-blue-100">Documents Created</p>
              <p className="text-sm text-blue-200 mt-1">Every Month</p>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">
                99.9%
              </div>
              <p className="text-lg text-blue-100">Uptime Guarantee</p>
              <p className="text-sm text-blue-200 mt-1">Enterprise SLA</p>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                6M+
              </div>
              <p className="text-lg text-blue-100">Organizations</p>
              <p className="text-sm text-blue-200 mt-1">Using Workspace</p>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                170+
              </div>
              <p className="text-lg text-blue-100">Countries</p>
              <p className="text-sm text-blue-200 mt-1">Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                  <FileText className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Start Your Story Today
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join over 3 billion users who trust Google Docs for their most
                important documents. It's free, powerful, and ready when you
                are.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Create Your First Doc</span>
                </button>

                <button className="text-blue-600 hover:text-purple-600 font-semibold text-lg transition-colors duration-300">
                  Learn More →
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Enterprise Security
                </span>
                <span className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  All Devices
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Unlimited Sharing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
