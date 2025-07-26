import React from 'react';
import { FileText, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EduDocs
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revolutionizing document creation and collaboration for modern teams and individuals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors duration-300 group">
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors duration-300 group">
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors duration-300 group">
                <Github className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition-colors duration-300 group">
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
            <ul className="space-y-3">
              <li><a href="/features" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Features</a></li>
              <li><a href="/templates" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Templates</a></li>
              <li><a href="/integrations" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Integrations</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="/enterprise" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block">Enterprise</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li><a href="/help" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Documentation</a></li>
              <li><a href="/tutorials" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Tutorials</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</a></li>
              <li><a href="/community" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 inline-block">Community</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block">Cookie Policy</a></li>
              <li><a href="/security" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block">Security</a></li>
              <li><a href="/compliance" className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block">Compliance</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
              <span>© {new Date().getFullYear()} EduDocs. Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-2 animate-pulse" />
              <span>for better collaboration</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <select className="bg-gray-800 text-gray-300 border border-gray-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English</option>
                <option>हिंदी</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
    </footer>
  );
};

export default Footer;