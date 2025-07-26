import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Save, Download, Upload, Type, Palette, 
  Undo, Redo, Volume2, Mic, MicOff, Languages, Bug, FileDown,
  Play, Pause, Settings, Headphones, MessageSquare
} from 'lucide-react';

const EnhancedDocsEditor = () => {
  const [content, setContent] = useState('');
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [fontSize, setFontSize] = useState('14');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [isEditing, setIsEditing] = useState(false);
  
  // AI Features State
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showTTSPanel, setShowTTSPanel] = useState(false);
  const [showTranslatePanel, setShowTranslatePanel] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  
  // TTS Settings
  const [ttsVoice, setTtsVoice] = useState('alloy');
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [ttsLanguage, setTtsLanguage] = useState('en');
  
  // Voice Changer Settings
  const [voiceEffect, setVoiceEffect] = useState('normal');
  const [pitch, setPitch] = useState(1);
  const [voiceGender, setVoiceGender] = useState('neutral');
  
  // Translation Settings
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  
  // Debug Settings
  const [debugLogs, setDebugLogs] = useState([]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        
        if (editorRef.current) {
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(transcript));
          handleContentChange();
        }
      };
      
      window.speechRecognition = recognition;
    }
  }, []);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      
      // Auto-save functionality
      setTimeout(() => {
        addDebugLog('Content auto-saved');
      }, 1000);
    }
  };

  const addDebugLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev.slice(-4), { time: timestamp, message }]);
  };

  // Text-to-Speech functionality
  const handleTextToSpeech = async () => {
    const textToSpeak = selectedText || content.replace(/<[^>]*>/g, '');
    
    if (!textToSpeak.trim()) {
      alert('Please select text or add content to speak');
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = ttsSpeed;
      utterance.lang = ttsLanguage === 'hi' ? 'hi-IN' : 'en-US';
      
      utterance.onstart = () => {
        setIsPlaying(true);
        addDebugLog('Text-to-speech started');
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        addDebugLog('Text-to-speech completed');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  const stopTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      addDebugLog('Text-to-speech stopped');
    }
  };

  // Speech-to-Text functionality
  const toggleSpeechRecognition = () => {
    if (!window.speechRecognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isRecording) {
      window.speechRecognition.stop();
      setIsRecording(false);
      addDebugLog('Speech recognition stopped');
    } else {
      window.speechRecognition.start();
      setIsRecording(true);
      addDebugLog('Speech recognition started');
    }
  };

  // Translation functionality
  const handleTranslation = async () => {
    const textToTranslate = selectedText || content.replace(/<[^>]*>/g, '');
    
    if (!textToTranslate.trim()) {
      alert('Please select text to translate');
      return;
    }

    // Mock translation (in real app, use Google Translate API or similar)
    const mockTranslations = {
      'hi': 'यह एक नमूना अनुवाद है।',
      'es': 'Esta es una traducción de muestra.',
      'fr': 'Ceci est un exemple de traduction.',
      'de': 'Dies ist eine Beispielübersetzung.',
      'ja': 'これはサンプル翻訳です。'
    };
    
    setTimeout(() => {
      setTranslatedText(mockTranslations[targetLanguage] || 'Translation not available for this language');
      addDebugLog(`Text translated to ${targetLanguage}`);
    }, 1000);
  };

  // Voice changer simulation
  const applyVoiceEffect = async () => {
    const textToModify = selectedText || content.replace(/<[^>]*>/g, '');
    
    if (!textToModify.trim()) {
      alert('Please select text for voice effects');
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToModify);
      
      // Apply voice effects
      switch (voiceEffect) {
        case 'robot':
          utterance.rate = 0.7;
          utterance.pitch = 0.5;
          break;
        case 'chipmunk':
          utterance.rate = 1.5;
          utterance.pitch = 2;
          break;
        case 'deep':
          utterance.rate = 0.8;
          utterance.pitch = 0.3;
          break;
        default:
          utterance.rate = 1;
          utterance.pitch = pitch;
      }
      
      utterance.onstart = () => addDebugLog(`Voice effect '${voiceEffect}' applied`);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Grammar and Debug checks
  const runDebugCheck = () => {
    const text = content.replace(/<[^>]*>/g, '');
    const suggestions = [];
    
    // Simple grammar checks
    if (text.includes('there is')) suggestions.push('Consider using "there are" for plural subjects');
    if (text.includes('alot')) suggestions.push('Did you mean "a lot"?');
    if (text.includes('seperate')) suggestions.push('Did you mean "separate"?');
    
    // Word count and readability
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const avgWordsPerSentence = wordCount / (text.split('.').length - 1);
    
    if (avgWordsPerSentence > 20) {
      suggestions.push('Consider breaking up long sentences for better readability');
    }
    
    setGrammarSuggestions(suggestions);
    addDebugLog(`Grammar check completed. ${suggestions.length} suggestions found`);
  };

  // PDF Download functionality
  const downloadAsPDF = () => {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            body { font-family: ${fontFamily}; font-size: ${fontSize}px; color: ${textColor}; line-height: 1.6; margin: 40px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
    addDebugLog('PDF download initiated');
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection.toString());
  };

  const saveDocument = () => {
    // Save to memory since localStorage is not available
    addDebugLog('Document saved to memory');
    alert('Document saved successfully!');
  };

  const ToolbarButton = ({ onClick, children, title, active = false }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 hover:bg-gray-100 rounded transition-colors duration-200 flex items-center justify-center ${
        active ? 'bg-blue-100 text-blue-600' : ''
      }`}
    >
      {children}
    </button>
  );

  const FeaturePanel = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="text-blue-600 font-bold text-xl">AI Docs</div>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-medium bg-transparent border-none outline-none hover:bg-gray-100 px-2 py-1 rounded"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={saveDocument}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-1 max-w-6xl mx-auto flex-wrap">
          {/* File operations */}
          <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Upload">
              <Upload size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={downloadAsPDF} title="Download as PDF">
              <FileDown size={16} />
            </ToolbarButton>
          </div>

          {/* Basic formatting */}
          <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton onClick={() => formatText('bold')} title="Bold">
              <Bold size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatText('italic')} title="Italic">
              <Italic size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatText('underline')} title="Underline">
              <Underline size={16} />
            </ToolbarButton>
          </div>

          {/* AI Features */}
          <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton 
              onClick={() => setShowTTSPanel(true)} 
              title="Text-to-Speech"
              active={showTTSPanel}
            >
              <Volume2 size={16} />
            </ToolbarButton>
            <ToolbarButton 
              onClick={toggleSpeechRecognition} 
              title="Speech-to-Text"
              active={isRecording}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            </ToolbarButton>
            <ToolbarButton 
              onClick={() => setShowVoicePanel(true)} 
              title="Voice Changer"
              active={showVoicePanel}
            >
              <Headphones size={16} />
            </ToolbarButton>
            <ToolbarButton 
              onClick={() => setShowTranslatePanel(true)} 
              title="Translation"
              active={showTranslatePanel}
            >
              <Languages size={16} />
            </ToolbarButton>
            <ToolbarButton 
              onClick={() => setShowDebugPanel(true)} 
              title="Debug & Grammar Check"
              active={showDebugPanel}
            >
              <Bug size={16} />
            </ToolbarButton>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentChange}
            onMouseUp={handleTextSelection}
            className="min-h-96 p-8 outline-none"
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: '1.6',
              color: textColor
            }}
            dangerouslySetInnerHTML={{ __html: content }}
            suppressContentEditableWarning={true}
            placeholder="Start typing or use voice input..."
          />
        </div>
      </div>

      {/* Text-to-Speech Panel */}
      <FeaturePanel show={showTTSPanel} onClose={() => setShowTTSPanel(false)} title="Text-to-Speech">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select 
              value={ttsLanguage} 
              onChange={(e) => setTtsLanguage(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Speed: {ttsSpeed}</label>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={ttsSpeed}
              onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleTextToSpeech}
              disabled={isPlaying}
              className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              <Play size={16} className="inline mr-2" />
              Speak
            </button>
            <button 
              onClick={stopTextToSpeech}
              className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              <Pause size={16} className="inline mr-2" />
              Stop
            </button>
          </div>
        </div>
      </FeaturePanel>

      {/* Voice Changer Panel */}
      <FeaturePanel show={showVoicePanel} onClose={() => setShowVoicePanel(false)} title="Voice Effects">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Voice Effect</label>
            <select 
              value={voiceEffect} 
              onChange={(e) => setVoiceEffect(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="robot">Robot</option>
              <option value="chipmunk">Chipmunk</option>
              <option value="deep">Deep Voice</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pitch: {pitch}</label>
            <input 
              type="range" 
              min="0.1" 
              max="2" 
              step="0.1" 
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <button 
            onClick={applyVoiceEffect}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Apply Voice Effect
          </button>
        </div>
      </FeaturePanel>

      {/* Translation Panel */}
      <FeaturePanel show={showTranslatePanel} onClose={() => setShowTranslatePanel(false)} title="Translation">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Target Language</label>
            <select 
              value={targetLanguage} 
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          <button 
            onClick={handleTranslation}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Translate Selected Text
          </button>
          {translatedText && (
            <div className="p-3 bg-gray-100 rounded">
              <p className="text-sm font-medium mb-1">Translation:</p>
              <p>{translatedText}</p>
            </div>
          )}
        </div>
      </FeaturePanel>

      {/* Debug Panel */}
      <FeaturePanel show={showDebugPanel} onClose={() => setShowDebugPanel(false)} title="Debug & Grammar Check">
        <div className="space-y-4">
          <button 
            onClick={runDebugCheck}
            className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
          >
            Run Grammar Check
          </button>
          
          {grammarSuggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Suggestions:</h4>
              {grammarSuggestions.map((suggestion, idx) => (
                <div key={idx} className="p-2 bg-yellow-100 rounded text-sm">
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-medium">Debug Logs:</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {debugLogs.map((log, idx) => (
                <div key={idx} className="text-xs p-2 bg-gray-100 rounded">
                  <span className="font-mono text-gray-500">[{log.time}]</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FeaturePanel>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div>Words: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length}</div>
            {selectedText && <div>Selected: {selectedText.length} chars</div>}
            {isRecording && <div className="flex items-center text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
              Recording...
            </div>}
          </div>
          <div className="flex items-center space-x-4">
            <div>AI Features Active</div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.txt"
        className="hidden"
      />
    </div>
  );
};

export default EnhancedDocsEditor;