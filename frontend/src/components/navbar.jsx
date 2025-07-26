import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Menu, X, Home, LogIn, UserPlus, ArrowDown, LayoutDashboard } from 'lucide-react';

const Navbar = ({ onHomeClick, onFooterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (callback) => {
    if (callback) {
      document.documentElement.style.scrollBehavior = 'smooth';
      callback();
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'auto';
      }, 1000);
    }
  };

  const handleNavScroll = (callback) => {
    smoothScroll(callback);
    setIsMenuOpen(false);
  };

  const goToLogin = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  const goToSignup = () => {
    setIsMenuOpen(false);
    navigate('/signup');
  };

  const goToDashboard = () => {
    setIsMenuOpen(false);
    navigate('/dashboard');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-lg shadow-2xl' 
        : 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => smoothScroll(onHomeClick)}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
              EduDocs
            </span>
          </div>

          {/* Center Nav - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">

              {/* Home */}
              <button
                onClick={() => handleNavScroll(onHomeClick)}
                className="flex items-center space-x-2 px-6 py-2 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Home className="h-4 w-4" />
                <span className="font-medium">Home</span>
              </button>

              {/* Dashboard */}
              <button
                onClick={goToDashboard}
                className="flex items-center space-x-2 px-6 py-2 rounded-full text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </button>

              {/* Footer */}
              <button
                onClick={() => handleNavScroll(onFooterClick)}
                className="flex items-center space-x-2 px-6 py-2 rounded-full text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <ArrowDown className="h-4 w-4" />
                <span className="font-medium">Footer</span>
              </button>
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={goToLogin}
              className="flex items-center space-x-2 px-6 py-2 rounded-full border-2 border-gray-400 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </button>

            <button
              onClick={goToSignup}
              className="flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl font-medium"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4 border border-white/20">
            <div className="flex flex-col space-y-3">

              {/* Mobile Nav Buttons */}
              <button
                onClick={() => handleNavScroll(onHomeClick)}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 text-left"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </button>

              <button
                onClick={goToDashboard}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 transition-all duration-300 text-left"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </button>

              <button
                onClick={() => handleNavScroll(onFooterClick)}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 transition-all duration-300 text-left"
              >
                <ArrowDown className="h-5 w-5" />
                <span className="font-medium">Footer</span>
              </button>

              {/* Mobile Auth Buttons */}
              <div className="pt-3 border-t border-white/20">
                <button
                  onClick={goToLogin}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl border-2 border-gray-400 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 font-medium mb-3"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </button>

                <button
                  onClick={goToSignup}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
