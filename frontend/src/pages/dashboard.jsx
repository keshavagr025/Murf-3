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
  Grid3X3,
  List,
  Star,
  Clock,
  Users,
  Settings,
  User,
  ChevronDown,
  Play,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  PieChart,
  Download,
  Share2,
  Edit3,
  Calendar,
  BookOpen,
  Target,
  Bell,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("grid");
  const [selectedTool, setSelectedTool] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Document processed",
      message: "Your AI translation is ready",
      time: "2m ago",
      type: "success",
    },
    {
      id: 2,
      title: "New collaboration",
      message: "John invited you to a project",
      time: "5m ago",
      type: "info",
    },
    {
      id: 3,
      title: "Voice synthesis complete",
      message: "Audio file is ready for download",
      time: "10m ago",
      type: "success",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

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
      color: "from-emerald-400 via-teal-400 to-cyan-400",
      shadowColor: "shadow-emerald-500/25",
      glowColor: "group-hover:shadow-emerald-500/40",
      features: [
        "50+ Natural Voices",
        "Multiple Languages",
        "SSML Support",
        "HD Audio Quality",
      ],
      usage:
        "Transform text into lifelike speech with our advanced neural voice synthesis",
      demo: "Upload a document or paste text to hear it spoken in natural voices",
    },
    {
      id: 2,
      title: "Voice Changer",
      description:
        "Transform your voice with AI-powered voice modulation and effects",
      icon: Mic,
      color: "from-blue-400 via-sky-400 to-cyan-400",
      shadowColor: "shadow-blue-500/25",
      glowColor: "group-hover:shadow-blue-500/40",
      features: [
        "Real-time Processing",
        "Voice Effects",
        "Gender Transformation",
        "Age Modulation",
      ],
      usage:
        "Apply professional voice effects and transformations in real-time",
      demo: "Record your voice and apply various effects instantly",
    },
    {
      id: 3,
      title: "Translation Tool",
      description:
        "Instantly translate your documents to 100+ languages with AI precision",
      icon: Languages,
      color: "from-teal-400 via-green-400 to-emerald-400",
      shadowColor: "shadow-teal-500/25",
      glowColor: "group-hover:shadow-teal-500/40",
      features: [
        "100+ Languages",
        "Context Aware",
        "Bulk Translation",
        "Format Preservation",
      ],
      usage: "Break language barriers with accurate, contextual translations",
      demo: "Upload documents in any format and translate to your target language",
    },
    {
      id: 4,
      title: "Debug Assistant",
      description:
        "AI-powered code debugging and error detection for your documents",
      icon: Bug,
      color: "from-cyan-400 via-blue-400 to-indigo-400",
      shadowColor: "shadow-cyan-500/25",
      glowColor: "group-hover:shadow-cyan-500/40",
      features: [
        "Error Detection",
        "Code Analysis",
        "Smart Suggestions",
        "Performance Tips",
      ],
      usage: "Identify and fix issues in your code and technical documents",
      demo: "Paste your code to get instant analysis and improvement suggestions",
    },
  ];

  // Sample data for charts
  const productivityData = [
    { name: "Mon", docs: 12, hours: 8 },
    { name: "Tue", docs: 19, hours: 10 },
    { name: "Wed", docs: 15, hours: 7 },
    { name: "Thu", docs: 22, hours: 12 },
    { name: "Fri", docs: 18, hours: 9 },
    { name: "Sat", docs: 8, hours: 4 },
    { name: "Sun", docs: 5, hours: 2 },
  ];

  const usageData = [
    { name: "Text-to-Speech", value: 35, color: "#10B981" },
    { name: "Translation", value: 25, color: "#06B6D4" },
    { name: "Voice Changer", value: 20, color: "#3B82F6" },
    { name: "Debug Assistant", value: 20, color: "#8B5CF6" },
  ];

  const documentTypes = [
    { type: "Research Papers", count: 24, growth: "+12%" },
    { type: "Presentations", count: 18, growth: "+8%" },
    { type: "Reports", count: 31, growth: "+15%" },
    { type: "Meeting Notes", count: 42, growth: "+22%" },
  ];

  const recentDocuments = [
    {
      id: 1,
      name: "AI Research Paper.pdf",
      type: "Research",
      modified: "2 hours ago",
      size: "2.4 MB",
      progress: 100,
    },
    {
      id: 2,
      name: "Quarterly Report.docx",
      type: "Report",
      modified: "4 hours ago",
      size: "1.8 MB",
      progress: 85,
    },
    {
      id: 3,
      name: "Team Presentation.pptx",
      type: "Presentation",
      modified: "1 day ago",
      size: "5.2 MB",
      progress: 100,
    },
    {
      id: 4,
      name: "Meeting Notes.txt",
      type: "Notes",
      modified: "2 days ago",
      size: "156 KB",
      progress: 100,
    },
  ];

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
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

  const handleToolLaunch = (tool) => {
    // Simulate tool launch with loading state
    console.log(`Launching ${tool.title}...`);
    // Add your tool launch logic here
    setSelectedTool(null);
  };

  const handleQuickAction = (action) => {
    console.log(`Executing ${action}...`);
    // Add your quick action logic here
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 relative overflow-hidden">
      <FloatingParticles />

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Top Navigation */}
<nav className="relative z-40 backdrop-blur-xl bg-white/70 border border-emerald-200/50 shadow-lg rounded-3xl">



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-emerald-500/50">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                Docs.ai
              </span>
            </div>

            {/* Search Bar */}
            {/* <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-blue-400/20 blur-sm opacity-0 group-focus-within:opacity-100 group-hover:opacity-80 transition-opacity -z-10"></div>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search docs, tools, templates..."
                  className="w-full pl-12 pr-5 py-3 bg-white/80 backdrop-blur-md text-slate-700 placeholder-slate-400 border border-emerald-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/40 hover:bg-white/90 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div> */}

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 text-slate-600 hover:text-emerald-600 transition-all duration-300 hover:bg-emerald-100/50 rounded-xl backdrop-blur-sm group relative"
                >
                  <Bell className="h-6 w-6 group-hover:animate-bounce" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {notifications.length}
                      </span>
                    </div>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-slate-200/50">
                      <h3 className="font-semibold text-slate-700">
                        Notifications
                      </h3>
                    </div>
                    <div className="divide-y divide-slate-200/50">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-700 text-sm">
                                {notification.title}
                              </h4>
                              <p className="text-slate-500 text-xs mt-1">
                                {notification.message}
                              </p>
                              <p className="text-slate-400 text-xs mt-2">
                                {notification.time}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                dismissNotification(notification.id)
                              }
                              className="text-slate-400 hover:text-slate-600 text-sm"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/settings"
                className="p-3 text-slate-600 hover:text-emerald-600 transition-all duration-300 hover:bg-emerald-100/50 rounded-xl backdrop-blur-sm group"
              >
                <Settings className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
              </Link>
              <div className="flex items-center space-x-3 pl-4 border-l border-emerald-200/50">
                <Link
                  to="/profile" // 👈 yaha apna desired route daal lo
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-700 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome back! 👋
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
      color: "from-emerald-500 to-teal-500",
      link: "/new-document",
    },
    {
      icon: FileText,
      title: "Templates",
      desc: "Pre-made designs",
      color: "from-blue-500 to-cyan-500",
      link: "/templates",
    },
    {
      icon: Users,
      title: "Collaborate",
      desc: "Invite team members",
      color: "from-teal-500 to-blue-500",
      link: "/collaborate",
    },
    {
      icon: Star,
      title: "Favorites",
      desc: "Starred documents",
      color: "from-cyan-500 to-emerald-500",
      link: "/favorites",
    },
  ].map((item, index) => {
    const Wrapper = item.link ? Link : "div";

    return (
      <Wrapper
        key={index}
        to={item.link}
        className="group relative bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 transform cursor-pointer"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
        >
          <item.icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-slate-700 text-lg mb-1">
            {item.title}
          </div>
          <div className="text-sm text-slate-500">{item.desc}</div>
        </div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Wrapper>
    );
  })}
</div>

        {/* AI Tools Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-slate-700">
                AI-Powered Tools
              </h2>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-emerald-500 animate-pulse" />
                <span className="text-sm text-slate-500">
                  Powered by Advanced AI
                </span>
              </div>
            </div>
            <Zap className="h-8 w-8 text-emerald-500 animate-bounce" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {aiTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.id}
                  className={`group relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${tool.shadowColor} hover:shadow-2xl ${tool.glowColor}`}
                  onClick={() => setSelectedTool(tool)}
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
                  ></div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl relative z-10`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-700 mb-3 group-hover:text-emerald-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {tool.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs text-slate-500"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mr-3 animate-pulse"></div>
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

        {/* Analytics & Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Productivity Chart */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-700">
                    Weekly Productivity
                  </h3>
                  <p className="text-sm text-slate-500">
                    Documents created this week
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">109</div>
                <div className="text-sm text-slate-500">
                  +23% from last week
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="docs"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#059669" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tool Usage Pie Chart */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-700">Tool Usage</h3>
                <p className="text-sm text-slate-500">This month</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={usageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {usageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {usageData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-700">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {documentTypes.map((doc, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-700">
                    {doc.count}
                  </div>
                  <div className="text-sm text-emerald-600 font-semibold">
                    {doc.growth}
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-slate-700 mb-2">{doc.type}</h3>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(doc.count / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Documents */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-lg mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-700">
                  Recent Documents
                </h3>
                <p className="text-sm text-slate-500">Your latest work</p>
              </div>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 hover:bg-white/40 rounded-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                      {doc.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.modified}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-300"
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-600 min-w-[3rem]">
                    {doc.progress}%
                  </span>
                  <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-700">
                    Quick Actions
                  </h3>
                  <p className="text-sm text-slate-500">
                    Streamline your workflow
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {[
                {
                  icon: Download,
                  label: "Export All",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Share2,
                  label: "Share",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Edit3,
                  label: "Batch Edit",
                  color: "from-teal-500 to-blue-500",
                },
                {
                  icon: Calendar,
                  label: "Schedule",
                  color: "from-cyan-500 to-emerald-500",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.label)}
                  className={`group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${action.color} text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  <action.icon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedTool.color} flex items-center justify-center shadow-2xl`}
                >
                  <selectedTool.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-700 mb-2">
                    {selectedTool.title}
                  </h3>
                  <p className="text-slate-500">{selectedTool.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-slate-400 hover:text-slate-600 text-3xl font-light transition-colors hover:rotate-90 duration-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-slate-700 mb-4 text-xl">
                  Features
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedTool.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-200/50"
                    >
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50/50 to-blue-50/50 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200/50">
                <h4 className="font-bold text-slate-700 mb-4 text-xl flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  <span>How it Works</span>
                </h4>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {selectedTool.usage}
                </p>
                <div className="bg-white/50 rounded-2xl p-4 border border-emerald-200/30 mb-6">
                  <p className="text-sm text-slate-500 italic">
                    💡 Demo: {selectedTool.demo}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleToolLaunch(selectedTool)}
                    className={`flex-1 py-4 px-8 bg-gradient-to-r ${selectedTool.color} text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <Play className="h-5 w-5" />
                    <span>Launch {selectedTool.title}</span>
                  </button>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="px-8 py-4 border border-emerald-200/50 rounded-2xl text-slate-600 hover:bg-emerald-50/50 hover:text-slate-700 transition-all duration-300 backdrop-blur-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
