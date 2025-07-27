import React, { useState, useEffect } from 'react';
import { Palette, Languages, Volume2, Mic, MicOff, Settings } from 'lucide-react';

const Setting = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [voice, setVoice] = useState(() => localStorage.getItem('voice') || 'default');
  const [micAccess, setMicAccess] = useState(() => localStorage.getItem('micAccess') === 'true');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    localStorage.setItem('voice', voice);
    localStorage.setItem('micAccess', micAccess);
  }, [theme, language, voice, micAccess]);

  const handleMicToggle = () => {
    setMicAccess((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        className={`w-full max-w-md mx-auto rounded-lg shadow-lg p-6 m-4 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div className="flex items-center mb-6 space-x-3">
          <Settings className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Theme Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Palette />
              <span>Theme</span>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-md px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Language Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Languages />
              <span>Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-md px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          {/* Voice Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 />
              <span>Voice</span>
            </div>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="rounded-md px-3 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
            >
              <option value="default">Default</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Mic Access Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {micAccess ? <Mic /> : <MicOff />}
              <span>Mic Access</span>
            </div>
            <button
              onClick={handleMicToggle}
              className={`px-4 py-1 rounded-full text-white font-semibold transition duration-200 ${
                micAccess ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {micAccess ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
