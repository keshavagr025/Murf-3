import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Star,
  Eye,
  Download,
  Users,
  Clock,
  ArrowRight,
  Grid3X3,
  List,
  BookOpen,
  BarChart3,
  FileSpreadsheet,
  Mail,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Zap,
  Sparkles,
  Plus
} from "lucide-react";

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Grid3X3, count: 48 },
    { id: 'academic', name: 'Academic', icon: GraduationCap, count: 12 },
    { id: 'business', name: 'Business', icon: Briefcase, count: 15 },
    { id: 'presentations', name: 'Presentations', icon: BarChart3, count: 8 },
    { id: 'reports', name: 'Reports', icon: FileText, count: 7 },
    { id: 'personal', name: 'Personal', icon: Heart, count: 6 }
  ];

  const templates = [
    {
      id: 1,
      title: "Research Paper Template",
      description: "Professional academic research paper with proper formatting and citation styles",
      category: "academic",
      thumbnail: "🎓",
      color: "from-blue-500 to-purple-600",
      downloads: 2847,
      rating: 4.9,
      isPopular: true,
      author: "Dr. Sarah Chen",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Business Proposal",
      description: "Comprehensive business proposal template with financial projections",
      category: "business",
      thumbnail: "💼",
      color: "from-green-500 to-teal-600",
      downloads: 1923,
      rating: 4.8,
      isPopular: true,
      author: "Mike Johnson",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Project Presentation",
      description: "Modern slide deck template for project presentations and pitches",
      category: "presentations",
      thumbnail: "📊",
      color: "from-orange-500 to-red-600",
      downloads: 3102,
      rating: 4.7,
      isPopular: true,
      author: "Design Team",
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      title: "Monthly Report",
      description: "Clean and professional monthly report template with charts and graphs",
      category: "reports",
      thumbnail: "📈",
      color: "from-purple-500 to-pink-600",
      downloads: 1456,
      rating: 4.6,
      author: "Analytics Pro",
      lastUpdated: "5 days ago"
    },
    {
      id: 5,
      title: "Resume Template",
      description: "Modern resume template with clean design and ATS-friendly format",
      category: "personal",
      thumbnail: "📄",
      color: "from-indigo-500 to-blue-600",
      downloads: 4521,
      rating: 4.9,
      isPopular: true,
      author: "Career Coach",
      lastUpdated: "1 day ago"
    },
    {
      id: 6,
      title: "Meeting Minutes",
      description: "Structured template for recording and organizing meeting notes",
      category: "business",
      thumbnail: "📝",
      color: "from-cyan-500 to-blue-600",
      downloads: 987,
      rating: 4.5,
      author: "Office Pro",
      lastUpdated: "1 week ago"
    },
    {
      id: 7,
      title: "Thesis Template",
      description: "Complete thesis template with chapters, bibliography, and formatting",
      category: "academic",
      thumbnail: "📚",
      color: "from-violet-500 to-purple-600",
      downloads: 2134,
      rating: 4.8,
      author: "Academic Writer",
      lastUpdated: "4 days ago"
    },
    {
      id: 8,
      title: "Invoice Template",
      description: "Professional invoice template for freelancers and small businesses",
      category: "business",
      thumbnail: "💰",
      color: "from-emerald-500 to-green-600",
      downloads: 1678,
      rating: 4.7,
      author: "Finance Expert",
      lastUpdated: "2 days ago"
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-pulse"
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
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-3">
                Document Templates
              </h1>
              <p className="text-xl text-gray-300">
                Choose from professionally designed templates to jumpstart your projects
              </p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Plus className="h-5 w-5" />
              <span>Create Template</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-300 transition-all duration-300 hover:bg-white/15"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                      selectedCategory === category.id
                        ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                        : 'hover:bg-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-blue-500/30 text-blue-200'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Popular Templates */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                  Trending
                </h4>
                <div className="space-y-3">
                  {templates.filter(t => t.isPopular).slice(0, 3).map((template, index) => (
                    <div key={template.id} className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="text-2xl">{template.thumbnail}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-blue-200 truncate">
                          {template.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {template.downloads.toLocaleString()} downloads
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-300">
                Showing {filteredTemplates.length} templates
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Recently updated</span>
              </div>
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredTemplates.map((template, index) => (
                <div
                  key={template.id}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/25"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Template Preview */}
                  <div className="relative mb-6">
                    <div className={`w-full h-32 bg-gradient-to-r ${template.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-105 transition-all duration-300`}>
                      {template.thumbnail}
                    </div>
                    {template.isPopular && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Template Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        {template.downloads.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400" />
                        {template.rating}
                      </div>
                    </div>
                    <div className="text-gray-500">
                      {template.lastUpdated}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="text-xs text-gray-400">
                      by <span className="text-gray-300">{template.author}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 group/btn">
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button className={`flex-1 py-2 px-4 bg-gradient-to-r ${template.color} text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn`}>
                      <span>Use Template</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
                Load More Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;