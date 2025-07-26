import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Share2,
  Crown,
  Shield,
  Eye,
  Edit3,
  Clock,
  MessageCircle,
  Bell,
  Search,
  Plus,
  MoreHorizontal
} from "lucide-react";

const Collaborate = () => {
  const [activeTab, setActiveTab] = useState('team');
  
  const teamMembers = [
    { id: 1, name: 'Sarah Chen', email: 'sarah@company.com', role: 'Owner', avatar: '👩‍💼', status: 'online', lastSeen: 'now' },
    { id: 2, name: 'Mike Johnson', email: 'mike@company.com', role: 'Editor', avatar: '👨‍💻', status: 'online', lastSeen: '2 min ago' },
    { id: 3, name: 'Lisa Wong', email: 'lisa@company.com', role: 'Viewer', avatar: '👩‍🎨', status: 'away', lastSeen: '1 hour ago' }
  ];

  const projects = [
    { id: 1, name: 'Marketing Campaign', members: 5, activity: '2 min ago', color: 'from-blue-500 to-purple-600' },
    { id: 2, name: 'Product Launch', members: 8, activity: '1 hour ago', color: 'from-green-500 to-teal-600' },
    { id: 3, name: 'Research Paper', members: 3, activity: '3 hours ago', color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Collaborate
              </h1>
              <p className="text-gray-300">Manage teams and shared projects</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <UserPlus className="h-5 w-5" />
            <span>Invite Members</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-2">
          {[
            { id: 'team', name: 'Team Members', count: teamMembers.length },
            { id: 'projects', name: 'Shared Projects', count: projects.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-200 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.name}</span>
              <span className="px-2 py-1 rounded-full text-xs bg-white/10">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'team' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{member.avatar}</div>
                    <div className={`w-3 h-3 rounded-full ${member.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {member.role === 'Owner' && <Crown className="h-4 w-4 text-yellow-400" />}
                    {member.role === 'Editor' && <Edit3 className="h-4 w-4 text-blue-400" />}
                    {member.role === 'Viewer' && <Eye className="h-4 w-4 text-gray-400" />}
                    <button className="p-1 hover:bg-white/10 rounded">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{member.email}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{member.role}</span>
                  <span className="text-xs text-gray-500">Active {member.lastSeen}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{project.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{project.members} members</span>
                        <span>Last activity {project.activity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaborate;