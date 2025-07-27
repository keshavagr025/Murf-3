import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, 
  GraduationCap, Award, Camera, Edit, Save, X,
  Globe, Github, Linkedin, Twitter, Settings,
  Shield, Bell, Eye, Lock, Download, Upload,
  FileText, Folder, Star, Clock, Share2,
  MoreVertical, Check, Plus, Minus
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Product Manager',
    company: 'Tech Innovations Inc.',
    department: 'Product Development',
    bio: 'Experienced product manager with 8+ years in tech industry. Passionate about building user-centric products and leading cross-functional teams to deliver innovative solutions.',
    joinDate: '2019-03-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Product Management', 'Agile Development', 'User Experience', 'Data Analysis', 'Team Leadership'],
    education: [
      {
        degree: 'MBA in Technology Management',
        school: 'Stanford University',
        year: '2018',
        gpa: '3.8'
      },
      {
        degree: 'BS in Computer Science',
        school: 'UC Berkeley',
        year: '2015',
        gpa: '3.6'
      }
    ],
    experience: [
      {
        title: 'Senior Product Manager',
        company: 'Tech Innovations Inc.',
        period: '2021 - Present',
        description: 'Leading product strategy for AI-powered collaboration tools'
      },
      {
        title: 'Product Manager',
        company: 'Digital Solutions Ltd.',
        period: '2019 - 2021',
        description: 'Managed SaaS product development and user acquisition'
      }
    ],
    achievements: [
      'Product of the Year Award 2023',
      'Led team that increased user engagement by 150%',
      'Successfully launched 5 major product features',
      'Certified Scrum Master (CSM)'
    ],
    socialLinks: {
      linkedin: 'linkedin.com/in/johnanderson',
      github: 'github.com/johnanderson',
      twitter: '@johnanderson',
      website: 'johnanderson.dev'
    },
    preferences: {
      notifications: true,
      publicProfile: true,
      showEmail: false,
      showPhone: false,
      theme: 'light'
    }
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayAdd = (field, item) => {
    setTempData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
  };

  const handleArrayRemove = (field, index) => {
    setTempData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={18} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 text-center border-b border-gray-200">
                <div className="relative inline-block">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.jobTitle}</p>
                <p className="text-sm text-gray-500">{profileData.company}</p>
              </div>
              
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <User size={18} className="text-gray-500" />
                          <span>{profileData.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <Mail size={18} className="text-gray-500" />
                          <span>{profileData.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={tempData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <Phone size={18} className="text-gray-500" />
                          <span>{profileData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <MapPin size={18} className="text-gray-500" />
                          <span>{profileData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                    {isEditing ? (
                      <textarea
                        value={tempData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                          >
                            {skill}
                            {isEditing && (
                              <button
                                onClick={() => handleArrayRemove('skills', index)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </span>
                        ))}
                        {isEditing && (
                          <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600">
                            <Plus size={14} className="mr-1" />
                            Add Skill
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Linkedin size={20} className="text-blue-600" />
                          <span className="text-gray-700">{profileData.socialLinks.linkedin}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Github size={20} className="text-gray-800" />
                          <span className="text-gray-700">{profileData.socialLinks.github}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Twitter size={20} className="text-blue-500" />
                          <span className="text-gray-700">{profileData.socialLinks.twitter}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe size={20} className="text-green-600" />
                          <span className="text-gray-700">{profileData.socialLinks.website}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Work Experience</h3>
                    {isEditing && (
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>Add Experience</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {profileData.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900">{exp.title}</h4>
                            <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                            <div className="flex items-center space-x-2 mt-2 text-gray-600">
                              <Calendar size={16} />
                              <span>{exp.period}</span>
                            </div>
                            <p className="mt-3 text-gray-700">{exp.description}</p>
                          </div>
                          {isEditing && (
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-500 hover:text-blue-600">
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-red-600">
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h4>
                    <div className="space-y-3">
                      {profileData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <Award size={20} className="text-green-600" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Education</h3>
                    {isEditing && (
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>Add Education</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-gray-900">{edu.degree}</h4>
                            <p className="text-lg text-blue-600 font-medium">{edu.school}</p>
                            <div className="flex items-center space-x-4 mt-2 text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Calendar size={16} />
                                <span>Class of {edu.year}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Star size={16} />
                                <span>GPA: {edu.gpa}</span>
                              </div>
                            </div>
                          </div>
                          {isEditing && (
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-500 hover:text-blue-600">
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-red-600">
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Documents</h3>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload size={18} />
                      <span>Upload Document</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Resume_2024.pdf', type: 'PDF', size: '2.4 MB', date: '2024-01-15' },
                      { name: 'Portfolio.docx', type: 'DOCX', size: '1.8 MB', date: '2024-01-10' },
                      { name: 'Certificates.zip', type: 'ZIP', size: '5.2 MB', date: '2024-01-05' }
                    ].map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText size={20} className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{doc.date}</span>
                          <div className="flex space-x-2">
                            <button className="p-1 hover:text-blue-600">
                              <Download size={16} />
                            </button>
                            <button className="p-1 hover:text-blue-600">
                              <Share2 size={16} />
                            </button>
                            <button className="p-1 hover:text-red-600">
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Eye size={20} className="text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900">Public Profile</p>
                              <p className="text-sm text-gray-600">Allow others to view your profile</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={profileData.preferences.publicProfile}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Mail size={20} className="text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900">Show Email</p>
                              <p className="text-sm text-gray-600">Display email on public profile</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={profileData.preferences.showEmail}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Phone size={20} className="text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900">Show Phone</p>
                              <p className="text-sm text-gray-600">Display phone number on public profile</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={profileData.preferences.showPhone}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Bell size={20} className="text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900">Email Notifications</p>
                              <p className="text-sm text-gray-600">Receive notifications via email</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={profileData.preferences.notifications}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Security</h4>
                      <div className="space-y-4">
                        <button className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full text-left">
                          <Lock size={20} className="text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">Change Password</p>
                            <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                          </div>
                        </button>

                        <button className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full text-left">
                          <Shield size={20} className="text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;