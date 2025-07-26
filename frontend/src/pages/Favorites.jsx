import React, { useState } from 'react';
import {
  Star,
  FileText,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Users,
  Download,
  Eye,
  MoreHorizontal,
  Archive,
  Trash2,
  Share2,
  Edit3,
  FolderOpen,
  Calendar,
  Volume2,
  Languages,
  Mic,
  Bug,
  BookOpen,
  BarChart3,
  Heart,
  Sparkles,
  ArrowRight,
  Plus,
  SortAsc,
  SortDesc
} from "lucide-react";

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedItems, setSelectedItems] = useState([]);

  const tabs = [
    { id: 'all', name: 'All Favorites', count: 24 },
    { id: 'documents', name: 'Documents', count: 12 },
    { id: 'templates', name: 'Templates', count: 8 },
    { id: 'tools', name: 'AI Tools', count: 4 }
  ];

  const favoriteItems = [
    {
      id: 1,
      type: 'document',
      title: 'Marketing Strategy 2024',
      description: 'Comprehensive marketing plan with quarterly goals and budget allocation',
      thumbnail: '📈',
      color: 'from-blue-500 to-purple-600',
      dateAdded: '2024-01-15',
      lastModified: '2 days ago',
      collaborators: 5,
      progress: 87,
      size: '2.4 MB',
      tags: ['Marketing', 'Strategy', 'Business']
    },
    {
      id: 2,
      type: 'template',
      title: 'Research Paper Template',
      description: 'Academic research paper with proper formatting and citation styles',
      thumbnail: '🎓',
      color: 'from-green-500 to-teal-600',
      dateAdded: '2024-01-10',
      downloads: 2847,
      rating: 4.9,
      author: 'Dr. Sarah Chen',
      tags: ['Academic', 'Research', 'Template']
    },
    {
      id: 3,
      type: 'tool',
      title: 'Text-to-Speech',
      description: 'Convert documents to natural-sounding speech using AI voices',
      thumbnail: '🔊',
      color: 'from-orange-500 to-red-600',
      dateAdded: '2024-01-08',
      lastUsed: '1 hour ago',
      usageCount: 23,
      tags: ['AI', 'Audio', 'Accessibility']
    },
    {
      id: 4,
      type: 'document',
      title: 'Project Proposal Draft',
      description: 'Initial draft for the new client project proposal with timeline',
      thumbnail: '📋',
      color: 'from-purple-500 to-pink-600',
      dateAdded: '2024-01-12',
      lastModified: '1 day ago',
      collaborators: 3,
      progress: 65,
      size: '1.8 MB',
      tags: ['Project', 'Proposal', 'Client']
    },
    {
      id: 5,
      type: 'template',
      title: 'Invoice Template',
      description: 'Professional invoice template for freelancers and businesses',
      thumbnail: '💰',
      color: 'from-indigo-500 to-blue-600',
      dateAdded: '2024-01-05',
      downloads: 1678,
      rating: 4.7,
      author: 'Finance Expert',
      tags: ['Business', 'Finance', 'Template']
    },
    {
      id: 6,
      type: 'tool',
      title: 'Language Translator',
      description: 'Instantly translate documents to 100+ languages with AI precision',
      thumbnail: '🌐',
      color: 'from-cyan-500 to-blue-600',
      dateAdded: '2024-01-03',
      lastUsed: '3 hours ago',
      usageCount: 15,
      tags: ['AI', 'Translation', 'Language']
    },
    {
      id: 7,
      type: 'document',
      title: 'Meeting Notes - Q1 Review',
      description: 'Quarterly review meeting notes with action items and decisions',
      thumbnail: '📝',
      color: 'from-violet-500 to-purple-600',
      dateAdded: '2024-01-14',
      lastModified: '5 hours ago',
      collaborators: 8,
      progress: 100,
      size: '890 KB',
      tags: ['Meeting', 'Review', 'Notes']
    },
    {
      id: 8,
      type: 'template',
      title: 'Presentation Deck',
      description: 'Modern slide template for business presentations and pitches',
      thumbnail: '📊',
      color: 'from-emerald-500 to-green-600',
      dateAdded: '2024-01-06',
      downloads: 3102,
      rating: 4.8,
      author: 'Design Team',
      tags: ['Presentation', 'Business', 'Template']
    }
  ];

  const filteredItems = favoriteItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab.replace('s', '');
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'date':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'document': return FileText;
      case 'template': return BookOpen;
      case 'tool': return Sparkles;
      default: return FileText;
    }
  };

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-pulse"
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  My Favorites
                </h1>
                <p className="text-xl text-gray-300 mt-2">
                  Your starred documents, templates, and AI tools
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share Collection</span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add to Favorites</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-2 mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-yellow-500/20 text-yellow-200 shadow-lg border border-yellow-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="font-medium">{tab.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-yellow-500/30 text-yellow-200'
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 text-white placeholder-gray-300 transition-all duration-300 hover:bg-white/15"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
              >
                <option value="recent" className="bg-slate-800">Recently Added</option>
                <option value="name" className="bg-slate-800">Name</option>
                <option value="date" className="bg-slate-800">Date Added</option>
                <option value="type" className="bg-slate-800">Type</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-300">
            Showing {sortedItems.length} favorite items
          </div>
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">
                {selectedItems.length} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                  <Archive className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Favorites Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {sortedItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type);
            
            return (
              <div
                key={item.id}
                className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/25"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      {item.thumbnail}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-400 capitalize">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Stats based on type */}
                <div className="space-y-3 mb-4">
                  {item.type === 'document' && (
                    <>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {item.collaborators} collaborators
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.lastModified}
                          </div>
                        </div>
                        <div className="text-gray-500">
                          {item.size}
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.progress}% complete
                      </div>
                    </>
                  )}

                  {item.type === 'template' && (
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          {item.downloads.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-400" />
                          {item.rating}
                        </div>
                      </div>
                      <div className="text-gray-500">
                        by {item.author}
                      </div>
                    </div>
                  )}

                  {item.type === 'tool' && (
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {item.usageCount} uses
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.lastUsed}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button className={`flex-1 py-2 px-4 bg-gradient-to-r ${item.color} text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn`}>
                    <span>Open</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Star className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No favorites found
            </h3>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `No favorites match "${searchTerm}". Try adjusting your search terms.`
                : "Start adding documents, templates, and AI tools to your favorites to see them here."
              }
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Browse Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;