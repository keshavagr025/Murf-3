import React, { useState, useEffect, useCallback } from 'react';
import { 
  Settings, User, Bell, Lock, Palette, Globe, Save, 
  Shield, Volume2, Eye, Download, Upload, Trash2,
  Moon, Sun, Monitor, Wifi, Database, Key,
  Smartphone, Mail, MessageSquare, Calendar,
  Info, CheckCircle, AlertTriangle, RefreshCw, X
} from 'lucide-react';

const EnhancedSettings = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [privacy, setPrivacy] = useState('friends');
  const [autoBackup, setAutoBackup] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [dataUsage, setDataUsage] = useState('normal');
  const [fontSize, setFontSize] = useState('medium');
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ko: { name: '한국어', flag: '🇰🇷' },
    zh: { name: '中文', flag: '🇨🇳' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    pt: { name: 'Português', flag: '🇧🇷' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    it: { name: 'Italiano', flag: '🇮🇹' }
  };

  const translations = {
    en: {
      settings: 'Settings',
      general: 'General',
      privacy: 'Privacy & Security',
      notifications: 'Notifications',
      appearance: 'Appearance',
      data: 'Data & Storage',
      theme: 'Theme',
      language: 'Language',
      notificationsLabel: 'Enable Notifications',
      autoSave: 'Auto Save',
      soundEffects: 'Sound Effects',
      privacyLevel: 'Privacy Level',
      autoBackup: 'Auto Backup',
      twoFactorAuth: '2FA Authentication',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      dataUsage: 'Data Usage',
      fontSize: 'Font Size',
      saveSettings: 'Save Settings',
      resetToDefaults: 'Reset to Defaults',
      exportSettings: 'Export Settings',
      importSettings: 'Import Settings',
      currentSettings: 'Current Settings',
      settingsSaved: 'Settings saved successfully!',
      settingsReset: 'Settings reset to defaults!',
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto',
      public: 'Public',
      friends: 'Friends Only',
      private: 'Private',
      low: 'Low',
      normal: 'Normal',
      high: 'High',
      small: 'Small',
      medium: 'Medium',
      large: 'Large'
    },
    hi: {
      settings: 'सेटिंग्स',
      general: 'सामान्य',
      privacy: 'गोपनीयता और सुरक्षा',
      notifications: 'सूचनाएं',
      appearance: 'दिखावट',
      data: 'डेटा और स्टोरेज',
      theme: 'थीम',
      language: 'भाषा',
      notificationsLabel: 'सूचनाएं सक्षम करें',
      autoSave: 'ऑटो सेव',
      soundEffects: 'ध्वनि प्रभाव',
      privacyLevel: 'गोपनीयता स्तर',
      autoBackup: 'ऑटो बैकअप',
      twoFactorAuth: '2FA प्रमाणीकरण',
      emailNotifications: 'ईमेल सूचनाएं',
      pushNotifications: 'पुश सूचनाएं',
      dataUsage: 'डेटा उपयोग',
      fontSize: 'फ़ॉन्ट आकार',
      saveSettings: 'सेटिंग्स सेव करें',
      resetToDefaults: 'डिफ़ॉल्ट पर रीसेट करें',
      exportSettings: 'सेटिंग्स निर्यात करें',
      importSettings: 'सेटिंग्स आयात करें',
      currentSettings: 'वर्तमान सेटिंग्स',
      settingsSaved: 'सेटिंग्स सफलतापूर्वक सेव हुईं!',
      settingsReset: 'सेटिंग्स डिफ़ॉल्ट पर रीसेट हुईं!',
      light: 'हल्का',
      dark: 'गहरा',
      auto: 'ऑटो',
      public: 'सार्वजनिक',
      friends: 'केवल मित्र',
      private: 'निजी',
      low: 'कम',
      normal: 'सामान्य',
      high: 'उच्च',
      small: 'छोटा',
      medium: 'मध्यम',
      large: 'बड़ा'
    },
    es: {
      settings: 'Configuración',
      general: 'General',
      privacy: 'Privacidad y Seguridad',
      notifications: 'Notificaciones',
      appearance: 'Apariencia',
      data: 'Datos y Almacenamiento',
      theme: 'Tema',
      language: 'Idioma',
      notificationsLabel: 'Habilitar Notificaciones',
      autoSave: 'Guardado Automático',
      soundEffects: 'Efectos de Sonido',
      privacyLevel: 'Nivel de Privacidad',
      autoBackup: 'Copia de Seguridad Automática',
      twoFactorAuth: 'Autenticación 2FA',
      emailNotifications: 'Notificaciones por Email',
      pushNotifications: 'Notificaciones Push',
      dataUsage: 'Uso de Datos',
      fontSize: 'Tamaño de Fuente',
      saveSettings: 'Guardar Configuración',
      resetToDefaults: 'Restablecer Valores Predeterminados',
      exportSettings: 'Exportar Configuración',
      importSettings: 'Importar Configuración',
      currentSettings: 'Configuración Actual',
      settingsSaved: '¡Configuración guardada exitosamente!',
      settingsReset: '¡Configuración restablecida a valores predeterminados!',
      light: 'Claro',
      dark: 'Oscuro',
      auto: 'Automático',
      public: 'Público',
      friends: 'Solo Amigos',
      private: 'Privado',
      low: 'Bajo',
      normal: 'Normal',
      high: 'Alto',
      small: 'Pequeño',
      medium: 'Mediano',
      large: 'Grande'
    }
  };

  const t = translations[language] || translations.en;

  // Show notification
  const showNotificationMessage = useCallback((message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true,
      soundEnabled: true,
      privacy: 'friends',
      autoBackup: false,
      twoFactor: false,
      emailNotifs: true,
      pushNotifs: true,
      dataUsage: 'normal',
      fontSize: 'medium'
    };
    
    // Set all state values
    setTheme(savedSettings.theme);
    setLanguage(savedSettings.language);
    setNotifications(savedSettings.notifications);
    setAutoSave(savedSettings.autoSave);
    setSoundEnabled(savedSettings.soundEnabled);
    setPrivacy(savedSettings.privacy);
    setAutoBackup(savedSettings.autoBackup);
    setTwoFactor(savedSettings.twoFactor);
    setEmailNotifs(savedSettings.emailNotifs);
    setPushNotifs(savedSettings.pushNotifs);
    setDataUsage(savedSettings.dataUsage);
    setFontSize(savedSettings.fontSize);
    setSettings(savedSettings);
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // Apply font size changes
  useEffect(() => {
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    const targetElement = document.querySelector('[data-settings-container]');
    if (targetElement) {
      targetElement.style.fontSize = sizes[fontSize] || sizes.medium;
    }
  }, [fontSize]);

  const handleSave = async () => {
    setIsLoading(true);
    
    const newSettings = {
      theme, language, notifications, autoSave, soundEnabled,
      privacy, autoBackup, twoFactor, emailNotifs, pushNotifs,
      dataUsage, fontSize,
      timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setSettings(newSettings);
    setIsLoading(false);
    showNotificationMessage(t.settingsSaved);
  };

  const handleReset = () => {
    const defaultSettings = {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true,
      soundEnabled: true,
      privacy: 'friends',
      autoBackup: false,
      twoFactor: false,
      emailNotifs: true,
      pushNotifs: true,
      dataUsage: 'normal',
      fontSize: 'medium'
    };

    setTheme(defaultSettings.theme);
    setLanguage(defaultSettings.language);
    setNotifications(defaultSettings.notifications);
    setAutoSave(defaultSettings.autoSave);
    setSoundEnabled(defaultSettings.soundEnabled);
    setPrivacy(defaultSettings.privacy);
    setAutoBackup(defaultSettings.autoBackup);
    setTwoFactor(defaultSettings.twoFactor);
    setEmailNotifs(defaultSettings.emailNotifs);
    setPushNotifs(defaultSettings.pushNotifs);
    setDataUsage(defaultSettings.dataUsage);
    setFontSize(defaultSettings.fontSize);
    
    showNotificationMessage(t.settingsReset);
  };

  const handleExport = () => {
    const settingsData = {
      theme, language, notifications, autoSave, soundEnabled,
      privacy, autoBackup, twoFactor, emailNotifs, pushNotifs,
      dataUsage, fontSize,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `settings-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className={`w-11 h-6 rounded-full peer transition-all duration-300 ease-in-out ${
        disabled ? 'opacity-50' : ''
      } ${
        checked 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg' 
          : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
      } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:ring-opacity-50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 after:shadow-md ${
        checked ? 'after:translate-x-5' : 'after:translate-x-0'
      }`}></div>
    </label>
  );

  const SelectField = ({ value, onChange, options, icon: Icon, label }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-opacity-20 border-gray-400 hover:border-opacity-40 transition-all duration-200">
      <div className="flex items-center">
        <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
        <span className="font-medium">{label}</span>
      </div>
      <select 
        value={value} 
        onChange={onChange}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-w-[140px] ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
            : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
        }`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.display || option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const SettingItem = ({ icon: Icon, label, children, description }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-opacity-20 border-gray-400 hover:border-opacity-40 transition-all duration-200">
      <div className="flex items-center">
        <Icon className={`w-5 h-5 mr-3 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
        <div>
          <span className="font-medium block">{label}</span>
          {description && (
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {description}
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  const tabs = [
    { id: 'general', label: t.general, icon: Settings },
    { id: 'appearance', label: t.appearance, icon: Palette },
    { id: 'privacy', label: t.privacy, icon: Shield },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'data', label: t.data, icon: Database }
  ];

  const themeOptions = [
    { value: 'light', label: t.theme, display: `☀️ ${t.light}` },
    { value: 'dark', label: t.theme, display: `🌙 ${t.dark}` },
    { value: 'auto', label: t.theme, display: `🖥️ ${t.auto}` }
  ];

  const fontSizeOptions = [
    { value: 'small', label: t.fontSize, display: t.small },
    { value: 'medium', label: t.fontSize, display: t.medium },
    { value: 'large', label: t.fontSize, display: t.large }
  ];

  const privacyOptions = [
    { value: 'public', label: t.privacyLevel, display: t.public },
    { value: 'friends', label: t.privacyLevel, display: t.friends },
    { value: 'private', label: t.privacyLevel, display: t.private }
  ];

  const dataUsageOptions = [
    { value: 'low', label: t.dataUsage, display: t.low },
    { value: 'normal', label: t.dataUsage, display: t.normal },
    { value: 'high', label: t.dataUsage, display: t.high }
  ];

  const languageOptions = Object.entries(languages).map(([code, lang]) => ({
    value: code,
    label: t.language,
    display: `${lang.flag} ${lang.name}`
  }));

  return (
    <div 
      data-settings-container
      className={`max-w-5xl mx-auto rounded-2xl shadow-2xl p-6 sm:p-8 m-4 sm:m-6 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-700' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 border border-gray-200'
      }`}
    >
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-bounce">
          <CheckCircle className="w-5 h-5 mr-2" />
          {notificationMessage}
          <button 
            onClick={() => setShowNotification(false)}
            className="ml-4 hover:bg-green-600 rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-4 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.settings}
            </h1>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Customize your experience
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleExport}
            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title={t.exportSettings}
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={handleReset}
            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title={t.resetToDefaults}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-opacity-20 border-gray-400 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-4 mb-8">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <SelectField
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              icon={Globe}
              label={t.language}
              options={languageOptions}
            />
            
            <SettingItem icon={Save} label={t.autoSave} description="Automatically save your changes">
              <ToggleSwitch checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
            </SettingItem>

            <SettingItem icon={Volume2} label={t.soundEffects} description="Play sounds for interactions">
              <ToggleSwitch checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
            </SettingItem>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <SelectField
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              icon={theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor}
              label={t.theme}
              options={themeOptions}
            />

            <SelectField
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              icon={Eye}
              label={t.fontSize}
              options={fontSizeOptions}
            />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <SelectField
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              icon={Shield}
              label={t.privacyLevel}
              options={privacyOptions}
            />

            <SettingItem icon={Key} label={t.twoFactorAuth} description="Add extra security to your account">
              <ToggleSwitch checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
            </SettingItem>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <SettingItem icon={Bell} label={t.notificationsLabel} description="Enable all notifications">
              <ToggleSwitch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            </SettingItem>

            <SettingItem icon={Mail} label={t.emailNotifications} description="Receive notifications via email">
              <ToggleSwitch 
                checked={emailNotifs} 
                onChange={(e) => setEmailNotifs(e.target.checked)} 
                disabled={!notifications} 
              />
            </SettingItem>

            <SettingItem icon={Smartphone} label={t.pushNotifications} description="Receive push notifications">
              <ToggleSwitch 
                checked={pushNotifs} 
                onChange={(e) => setPushNotifs(e.target.checked)} 
                disabled={!notifications} 
              />
            </SettingItem>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-4">
            <SelectField
              value={dataUsage}
              onChange={(e) => setDataUsage(e.target.value)}
              icon={Wifi}
              label={t.dataUsage}
              options={dataUsageOptions}
            />

            <SettingItem icon={Database} label={t.autoBackup} description="Automatically backup your data">
              <ToggleSwitch checked={autoBackup} onChange={(e) => setAutoBackup(e.target.checked)} />
            </SettingItem>
          </div>
        )}

        {/* Settings Preview */}
        {Object.keys(settings).length > 0 && (
          <div className={`p-4 sm:p-6 rounded-xl border-l-4 border-blue-500 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-blue-50 border-gray-200'
          }`}>
            <div className="flex items-center mb-4">
              <Info className="w-5 h-5 text-blue-500 mr-2" />
              <p className="font-semibold text-lg">{t.currentSettings}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Theme:</span>
                <span className="font-medium capitalize">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <span className="font-medium">{languages[language]?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Font Size:</span>
                <span className="font-medium capitalize">{fontSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Privacy:</span>
                <span className="font-medium capitalize">{privacy}</span>
              </div>
              <div className="flex justify-between">
                <span>Data Usage:</span>
                <span className="font-medium capitalize">{dataUsage}</span>
              </div>
              <div className="flex justify-between">
                <span>Auto Save:</span>
                <span className="font-medium">{autoSave ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-opacity-20 border-gray-400">
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {isLoading ? 'Saving...' : t.saveSettings}
        </button>
        
        <button 
          onClick={handleReset}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {t.resetToDefaults}
        </button>
      </div>
    </div>
  );
};

export default EnhancedSettings;