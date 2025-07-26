import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FileText,
  Mic,
  Volume2,
  Languages,
  Bug,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  Users,
  Settings,
  Bell,
  User,
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("grid");
  const [selectedTool, setSelectedTool] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const aiTools = [
    {
      id: 1,
      title: "Text-to-Speech",
      description:
        "Convert your documents to natural-sounding speech using advanced AI voices",
      icon: Volume2,
      color: "from-blue-500 via-purple-500 to-pink-500",
      shadowColor: "shadow-blue-500/25",
      glowColor: "group-hover:shadow-blue-500/40",
      features: [
        "50+ Natural Voices",
        "Multiple Languages",
        "SSML Support",
        "HD Audio Quality",
      ],
    },
    {
      id: 2,
      title: "Voice Changer",
      description:
        "Transform your voice with AI-powered voice modulation and effects",
      icon: Mic,
      color: "from-green-500 via-teal-500 to-cyan-500",
      shadowColor: "shadow-green-500/25",
      glowColor: "group-hover:shadow-green-500/40",
      features: [
        "Real-time Processing",
        "Voice Effects",
        "Gender Transformation",
        "Age Modulation",
      ],
    },
    {
      id: 3,
      title: "Translation Tool",
      description:
        "Instantly translate your documents to 100+ languages with AI precision",
      icon: Languages,
      color: "from-orange-500 via-red-500 to-pink-500",
      shadowColor: "shadow-orange-500/25",
      glowColor: "group-hover:shadow-orange-500/40",
      features: [
        "100+ Languages",
        "Context Aware",
        "Bulk Translation",
        "Format Preservation",
      ],
    },
    {
      id: 4,
      title: "Debug Assistant",
      description:
        "AI-powered code debugging and error detection for your documents",
      icon: Bug,
      color: "from-purple-500 via-pink-500 to-rose-500",
      shadowColor: "shadow-purple-500/25",
      glowColor: "group-hover:shadow-purple-500/40",
      features: [
        "Error Detection",
        "Code Analysis",
        "Smart Suggestions",
        "Performance Tips",
      ],
    },
  ];

  const recentDocuments = [
    {
      name: "Project Proposal.docx",
      time: "2 hours ago",
      collaborators: 3,
      progress: 85,
    },
    {
      name: "Meeting Notes.docx",
      time: "5 hours ago",
      collaborators: 1,
      progress: 100,
    },
    {
      name: "Research Paper.docx",
      time: "1 day ago",
      collaborators: 5,
      progress: 67,
    },
    {
      name: "Budget Report.docx",
      time: "2 days ago",
      collaborators: 2,
      progress: 92,
    },
  ];

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingParticles />

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-40 backdrop-blur-xl bg-white/10 border-b border-white/20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EduDocs
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search documents, tools, or templates..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-300 transition-all duration-300 hover:bg-white/15"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="p-3 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm group">
                <Bell className="h-6 w-6 group-hover:animate-bounce" />
              </button>
              <button className="p-3 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm group">
                <Settings className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110">
                  <User className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 animate-pulse">
            Welcome back! 👋
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create, collaborate, and enhance your documents with AI-powered
            tools
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
  {[
    {
      icon: Plus,
      title: "New Document",
      desc: "Start from scratch",
      color: "from-blue-500 to-purple-600",
      link: "/new-document",
    },
    {
      icon: FileText,
      title: "Templates",
      desc: "Pre-made designs",
      color: "from-green-500 to-teal-600",
      link: "/templates",
    },
    {
      icon: Users,
      title: "Collaborate",
      desc: "Invite team members",
      color: "from-orange-500 to-red-600",
      link: "/collaborate",
    },
    {
      icon: Star,
      title: "Favorites",
      desc: "Starred documents",
      color: "from-purple-500 to-pink-600",
      link: "/favorites",
    },
  ].map((item, index) => (
    <Link
      to={item.link}
      key={index}
      className="group relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform perspective-1000 hover:rotateY-5"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
      >
        <item.icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-left">
        <div className="font-semibold text-white text-lg mb-1">
          {item.title}
        </div>
        <div className="text-sm text-gray-300">{item.desc}</div>
      </div>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  ))}
</div>

        {/* AI Tools Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-white">
                AI-Powered Tools
              </h2>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-sm text-gray-300">
                  Powered by Murf API
                </span>
              </div>
            </div>
            <Zap className="h-8 w-8 text-yellow-400 animate-bounce" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {aiTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.id}
                  className={`group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${tool.shadowColor} hover:shadow-2xl ${tool.glowColor}`}
                  onClick={() => setSelectedTool(tool)}
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    transform: `perspective(1000px) rotateX(${
                      mousePosition.y * 0.01
                    }deg) rotateY(${mousePosition.x * 0.01}deg)`,
                  }}
                >
                  {/* Glowing border effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                  ></div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl relative z-10`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {tool.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs text-gray-400"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 animate-pulse"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 px-6 bg-gradient-to-r ${tool.color} text-white rounded-2xl text-sm font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn`}
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Recent Documents
              </h2>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-1">
                <button
                  onClick={() => setActiveView("grid")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeView === "grid"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeView === "list"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className={
                activeView === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  : "space-y-4"
              }
            >
              {recentDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-blue-200 transition-colors">
                          {doc.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {doc.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {doc.progress}% complete
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      {doc.collaborators} collaborators
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-bold transition-colors">
                      Open →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Panel */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">
              Recent Activity
            </h2>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="space-y-6">
                {[
                  {
                    icon: Volume2,
                    text: "Text-to-Speech conversion completed",
                    time: "2 minutes ago",
                    color: "from-green-500 to-teal-500",
                  },
                  {
                    icon: Languages,
                    text: "Document translated to Spanish",
                    time: "1 hour ago",
                    color: "from-blue-500 to-purple-500",
                  },
                  {
                    icon: Bug,
                    text: "Code debugging completed",
                    time: "3 hours ago",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Mic,
                    text: "Voice modulation applied",
                    time: "5 hours ago",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${activity.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <activity.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white group-hover:text-blue-200 transition-colors">
                        {activity.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedTool.color} flex items-center justify-center shadow-2xl`}
                >
                  <selectedTool.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedTool.title}
                  </h3>
                  <p className="text-gray-300">{selectedTool.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-white text-3xl font-light transition-colors hover:rotate-90 duration-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-white mb-4 text-xl">Features</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedTool.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10"
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h4 className="font-bold text-white mb-4 text-xl flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span>Quick Start</span>
                </h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Get started with {selectedTool.title} in just a few clicks.
                  Upload your content and let AI do the magic!
                </p>
                <div className="flex space-x-4">
                  <button
                    className={`flex-1 py-4 px-8 bg-gradient-to-r ${selectedTool.color} text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Now</span>
                  </button>
                  <button className="px-8 py-4 border border-white/20 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;