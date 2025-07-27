import React, { useState, useEffect } from 'react';
import { FileText, Heart, Github, Twitter, Linkedin, Mail, ArrowUp, Zap, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Enhanced Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-8 group">
              <div className="relative p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110">
                <FileText className="h-7 w-7 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EduDocs
              </span>
            </div>
            
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Revolutionizing document creation and collaboration for modern teams worldwide with AI-powered innovation.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-blue-400">10M+</div>
                <div className="text-xs text-gray-500">Documents Created</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
                <div className="text-2xl font-bold text-purple-400">150+</div>
                <div className="text-xs text-gray-500">Countries</div>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: Twitter, color: 'hover:bg-blue-500', name: 'Twitter' },
                { icon: Linkedin, color: 'hover:bg-blue-600', name: 'LinkedIn' },
                { icon: Github, color: 'hover:bg-gray-700', name: 'GitHub' },
                { icon: Mail, color: 'hover:bg-green-600', name: 'Email' }
              ].map(({ icon: Icon, color, name }) => (
                <a
                  key={name}
                  href="#"
                  className={`group relative p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1`}
                  title={name}
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Product Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Product</h3>
            </div>
            <ul className="space-y-4">
              {['Features', 'Templates', 'Integrations', 'Pricing', 'Enterprise'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`} 
                    className="group flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Support Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Support</h3>
            </div>
            <ul className="space-y-4">
              {['Help Center', 'Documentation', 'Tutorials', 'Contact Us', 'Community'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="group flex items-center text-gray-400 hover:text-purple-400 transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Legal Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-400" />
              <h3 className="text-xl font-bold text-white">Legal</h3>
            </div>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security', 'Compliance'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="group flex items-center text-gray-400 hover:text-green-400 transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <div className="relative z-10 border-t border-gray-800/50 backdrop-blur-sm bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Enhanced Copyright */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>© {currentYear} EduDocs. Crafted with</span>
              <Heart className="h-4 w-4 text-red-500 mx-2 animate-pulse" />
              <span>for seamless collaboration</span>
            </div>
            
            {/* Enhanced Status and Controls */}
            <div className="flex items-center space-x-8">
              
              {/* System Status */}
              <div className="flex items-center text-gray-400 text-sm bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse shadow-lg shadow-green-500/50"></div>
                <span>All systems operational</span>
              </div>
              
              {/* Enhanced Language Selector */}
              <select className="bg-gray-800/80 backdrop-blur-sm text-gray-300 border border-gray-700/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/80">
                <option>🇺🇸 English</option>
                <option>🇮🇳 हिंदी</option>
                <option>🇪🇸 Español</option>
                <option>🇫🇷 Français</option>
                <option>🇩🇪 Deutsch</option>
                <option>🇯🇵 日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Bottom */}
      <div className="relative h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse opacity-50"></div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 group-hover:animate-bounce" />
        </button>
      )}
    </footer>
  );
};

export default Footer;