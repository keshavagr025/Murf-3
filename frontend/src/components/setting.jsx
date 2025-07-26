import React, { useState, useEffect } from 'react';
import { Settings, User, Bell, Lock, Palette, Globe, Save } from 'lucide-react';

const Setting = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [settings, setSettings] = useState({});

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true
    };
    
    setTheme(savedSettings.theme);
    setLanguage(savedSettings.language);
    setNotifications(savedSettings.notifications);
    setAutoSave(savedSettings.autoSave);
    setSettings(savedSettings);
  }, []);

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#1f2937';
      document.body.style.color = '#f9fafb';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#111827';
    }
  }, [theme]);

  // Handle language change
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Change page language
    document.documentElement.lang = newLang;
    console.log(`Language changed to: ${newLang}`);
  };

  // Handle notifications
  const handleNotificationChange = (enabled) => {
    setNotifications(enabled);
    if (enabled && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Notifications enabled!', {
            body: 'You will now receive notifications.',
            icon: '🔔'
          });
        }
      });
    }
  };

  // Handle auto-save
  const handleAutoSaveChange = (enabled) => {
    setAutoSave(enabled);
    if (enabled) {
      console.log('Auto-save enabled - Documents will save every 30 seconds');
      // Start auto-save interval
      const interval = setInterval(() => {
        console.log('Auto-saving document...');
      }, 30000);
      // Store interval ID for cleanup
      window.autoSaveInterval = interval;
    } else {
      console.log('Auto-save disabled');
      if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
      }
    }
  };

  const handleSave = () => {
    const newSettings = {
      theme,
      language,
      notifications,
      autoSave,
      timestamp: new Date().toISOString()
    };
    
    setSettings(newSettings);
    
    // Show success notification if notifications are enabled
    if (notifications && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Settings Saved!', {
        body: 'Your preferences have been updated.',
        icon: '⚙️'
      });
    } else {
      alert('Settings saved successfully!');
    }
    
    console.log('Settings saved:', newSettings);
  };

  return (
    <div className={`max-w-md mx-auto rounded-lg shadow-lg p-6 m-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="flex items-center mb-6">
        <Settings className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-bold">
          {language === 'hi' ? 'सेटिंग्स' : language === 'es' ? 'Configuración' : 'Settings'}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Theme */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Palette className="w-5 h-5 text-gray-600 mr-3" />
            <span>{language === 'hi' ? 'थीम' : language === 'es' ? 'Tema' : 'Theme'}</span>
          </div>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className={`px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="light">{language === 'hi' ? 'हल्का' : language === 'es' ? 'Claro' : 'Light'}</option>
            <option value="dark">{language === 'hi' ? 'गहरा' : language === 'es' ? 'Oscuro' : 'Dark'}</option>
            <option value="auto">{language === 'hi' ? 'ऑटो' : language === 'es' ? 'Auto' : 'Auto'}</option>
          </select>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-600 mr-3" />
            <span>{language === 'hi' ? 'भाषा' : language === 'es' ? 'Idioma' : 'Language'}</span>
          </div>
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className={`px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-600 mr-3" />
            <span>{language === 'hi' ? 'सूचनाएं' : language === 'es' ? 'Notificaciones' : 'Notifications'}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifications}
              onChange={(e) => handleNotificationChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Auto Save */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Save className="w-5 h-5 text-gray-600 mr-3" />
            <span>{language === 'hi' ? 'ऑटो सेव' : language === 'es' ? 'Guardado automático' : 'Auto Save'}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoSave}
              onChange={(e) => handleAutoSaveChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Settings Preview */}
        {Object.keys(settings).length > 0 && (
          <div className={`mt-4 p-3 rounded border-l-4 border-blue-500 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <p className="text-sm font-medium mb-2">
              {language === 'hi' ? 'वर्तमान सेटिंग्स:' : language === 'es' ? 'Configuración actual:' : 'Current Settings:'}
            </p>
            <ul className="text-xs space-y-1">
              <li>Theme: {theme}</li>
              <li>Language: {language}</li>
              <li>Notifications: {notifications ? 'On' : 'Off'}</li>
              <li>Auto Save: {autoSave ? 'On' : 'Off'}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
        <Save className="w-4 h-4 mr-2" />
        {language === 'hi' ? 'सेटिंग्स सेव करें' : language === 'es' ? 'Guardar configuración' : 'Save Settings'}
      </button>
    </div>
  );
};

export default Setting;