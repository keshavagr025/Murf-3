import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Save, Download, Upload, Type, Palette, 
  Undo, Redo, Volume2, Mic, MicOff, Languages, Bug, FileDown,
  Play, Pause, Settings, Headphones, MessageSquare, Sparkles,
  Wand2, Brain, Zap, Eye, EyeOff, FileText, Share2, Cloud,
  RotateCcw, RotateCw, Maximize2, Minimize2, Menu, X, Loader2,
  CheckCircle, AlertCircle, Square, Circle, Triangle
} from 'lucide-react';

const NewDocument = () => {
  const [content, setContent] = useState('<p>Start writing your document or use AI features to enhance your content...</p>');
  const [documentTitle, setDocumentTitle] = useState('AI-Powered Document');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textColor, setTextColor] = useState('#1f2937');
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // AI Features State
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showMurfPanel, setShowMurfPanel] = useState(false);
  const [showTranslatePanel, setShowTranslatePanel] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  
  // Enhanced MURF AI Settings
  const [murfVoice, setMurfVoice] = useState('bella');
  const [murfSpeed, setMurfSpeed] = useState(1);
  const [murfPitch, setMurfPitch] = useState(1);
  const [murfEmphasis, setMurfEmphasis] = useState('normal');
  const [murfLanguage, setMurfLanguage] = useState('en-US');
  const [murfStyle, setMurfStyle] = useState('conversational');
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  
  // Real-time Audio Generation
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioGenerationProgress, setAudioGenerationProgress] = useState(0);
  const [audioError, setAudioError] = useState(null);
  const [audioHistory, setAudioHistory] = useState([]);
  
  // Speech Recognition Enhancement
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [speechLanguage, setSpeechLanguage] = useState('en-US');
  const [speechConfidence, setSpeechConfidence] = useState(0);
  const [speechError, setSpeechError] = useState(null);
  
  // AI Content Generation
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Voice Features
  const [voiceCloneFile, setVoiceCloneFile] = useState(null);
  const [customVoiceName, setCustomVoiceName] = useState('');
  
  // Translation
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  
  // Statistics
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    readingTime: 0,
    sentences: 0
  });

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const voiceFileRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  // Enhanced Speech Recognition with debouncing
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;
      recognition.maxAlternatives = 1;
      
      let finalTranscript = '';
      let interimTranscript = '';
      let debounceTimer;
      
      recognition.onresult = (event) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            setSpeechConfidence(confidence);
            
            // Clear any existing debounce timer
            clearTimeout(debounceTimer);
            
            // Debounce the text insertion to prevent multiple insertions
            debounceTimer = setTimeout(() => {
              if (editorRef.current && finalTranscript.trim()) {
                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                const textNode = document.createTextNode(finalTranscript.trim() + ' ');
                range.insertNode(textNode);
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
                
                handleContentChange();
                finalTranscript = '';
              }
            }, 500);
            
          } else {
            interimTranscript += transcript;
          }
        }
        
        setSpeechTranscript(finalTranscript + interimTranscript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setSpeechError(event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        if (isRecording) {
          // Restart recognition if it was stopped unexpectedly
          setTimeout(() => {
            try {
              recognition.start();
            } catch (e) {
              console.log('Recognition restart failed:', e);
              setIsRecording(false);
            }
          }, 100);
        }
      };
      
      recognitionRef.current = recognition;
      setSpeechRecognition(recognition);
    }
  }, [speechLanguage, isRecording]);

  useEffect(() => {
    updateStats();
  }, [content]);

  const updateStats = () => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200);
    
    setStats({ words, characters, readingTime, sentences });
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
  };

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
    }
  }, []);

  // Enhanced MURF AI Integration with Real-time Generation
  const generateMurfAudio = async () => {
    const textToSpeak = selectedText || content.replace(/<[^>]*>/g, '');
    
    if (!textToSpeak.trim()) {
      setAudioError('Please select text or add content to generate audio');
      return;
    }

    setIsGeneratingAudio(true);
    setAudioError(null);
    setAudioGenerationProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setAudioGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Your backend MURF API integration
      const response = await fetch('/api/murf/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSpeak,
          voice: murfVoice,
          speed: murfSpeed,
          pitch: murfPitch,
          emphasis: murfEmphasis,
          language: murfLanguage,
          style: murfStyle
        })
      });

      clearInterval(progressInterval);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAudioUrl(result.audioUrl);
        setAudioGenerationProgress(100);
        
        // Add to audio history
        const newAudioEntry = {
          id: Date.now(),
          text: textToSpeak.substring(0, 100) + '...',
          voice: murfVoice,
          url: result.audioUrl,
          timestamp: new Date().toLocaleTimeString()
        };
        setAudioHistory(prev => [newAudioEntry, ...prev.slice(0, 4)]);
        
        // Auto-play if enabled
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }, 500);
      } else {
        throw new Error(result.error || 'Failed to generate audio');
      }
      
    } catch (error) {
      console.error('MURF API Error:', error);
      setAudioError(error.message || 'Failed to generate audio. Please try again.');
      setAudioGenerationProgress(0);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Enhanced Speech Recognition Control
  const toggleSpeechRecognition = () => {
    if (!speechRecognition) {
      setSpeechError('Speech recognition not supported in this browser');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setSpeechTranscript('');
      setSpeechError(null);
    } else {
      try {
        setSpeechError(null);
        setSpeechTranscript('');
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Speech recognition start error:', error);
        setSpeechError('Failed to start speech recognition');
      }
    }
  };

  // Audio Control Functions
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
    }
  };

  // AI Content Generation (enhanced)
  const generateAIContent = async () => {
    if (!aiPrompt.trim()) {
      alert('Please enter a prompt for AI content generation');
      return;
    }

    setIsGenerating(true);
    setAiResponse('');
    
    try {
      // Your backend AI integration
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          context: content,
          selectedText: selectedText
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI content');
      }

      const result = await response.json();
      setAiResponse(result.content);
      
    } catch (error) {
      console.error('AI Generation Error:', error);
      setAiResponse('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const insertAIContent = () => {
    if (aiResponse && editorRef.current) {
      document.execCommand('insertHTML', false, `<p>${aiResponse}</p>`);
      handleContentChange();
      setAiResponse('');
      setAiPrompt('');
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection.toString());
  };

  const saveDocument = () => {
    console.log('Saving document:', { title: documentTitle, content });
    alert('Document saved successfully!');
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            body { 
              font-family: ${fontFamily}, sans-serif; 
              font-size: ${fontSize}px; 
              color: ${textColor}; 
              line-height: 1.6; 
              margin: 40px; 
              max-width: 800px;
            }
            h1, h2, h3 { color: #1f2937; margin-top: 2em; }
            p { margin-bottom: 1em; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <h1>${documentTitle}</h1>
          ${content}
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const ToolbarButton = ({ onClick, children, title, active = false, disabled = false, className = "" }) => (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105 relative group ${
        active 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
          : disabled
          ? 'text-gray-400 cursor-not-allowed opacity-50'
          : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-lg'
      } ${className}`}
    >
      {children}
      {active && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </button>
  );

  const FeaturePanel = ({ show, onClose, title, children, className = "", icon: Icon = Sparkles }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 ${className}`}>
          <div className="flex items-center justify-between p-8 border-b border-gray-100/50">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <Icon className="text-white" size={18} />
              </div>
              {title}
            </h3>
            <button 
              onClick={onClose} 
              className="p-3 hover:bg-gray-100/50 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="text-white" size={22} />
              </div>
              <div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-2xl">AI Docs</span>
                <div className="text-xs text-gray-500">Powered by MURF AI</div>
              </div>
            </div>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none outline-none hover:bg-gray-100/50 px-4 py-3 rounded-xl transition-all duration-200 min-w-[300px]"
              placeholder="Document title..."
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-100/50 px-4 py-3 rounded-xl backdrop-blur-sm">
              <Eye size={16} />
              <span className="font-semibold">{stats.words}</span>
              <span>words</span>
              <span>•</span>
              <span className="font-semibold">{stats.readingTime}</span>
              <span>min read</span>
            </div>
            <button
              onClick={saveDocument}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 font-semibold"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced AI Toolbar */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 flex-wrap gap-3">
            {/* File Operations */}
            <div className="flex items-center space-x-2 bg-gray-50/80 rounded-2xl p-2 backdrop-blur-sm">
              <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Upload Document">
                <Upload size={20} />
              </ToolbarButton>
              <ToolbarButton onClick={exportToPDF} title="Export as PDF">
                <FileDown size={20} />
              </ToolbarButton>
              <ToolbarButton onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </ToolbarButton>
            </div>

            {/* Basic Formatting */}
            <div className="flex items-center space-x-2 bg-gray-50/80 rounded-2xl p-2 backdrop-blur-sm">
              <ToolbarButton onClick={() => formatText('bold')} title="Bold">
                <Bold size={20} />
              </ToolbarButton>
              <ToolbarButton onClick={() => formatText('italic')} title="Italic">
                <Italic size={20} />
              </ToolbarButton>
              <ToolbarButton onClick={() => formatText('underline')} title="Underline">
                <Underline size={20} />
              </ToolbarButton>
            </div>

            {/* AI Features */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-2 border-2 border-blue-200/50 backdrop-blur-sm">
              <ToolbarButton 
                onClick={() => setShowMurfPanel(true)} 
                title="MURF AI Voice Generation"
                active={showMurfPanel}
                className="hover:bg-blue-100"
              >
                <Volume2 size={20} className="text-blue-600" />
              </ToolbarButton>
              <ToolbarButton 
                onClick={() => setShowAIPanel(true)} 
                title="AI Content Generation"
                active={showAIPanel}
                className="hover:bg-purple-100"
              >
                <Wand2 size={20} className="text-purple-600" />
              </ToolbarButton>
              <ToolbarButton 
                onClick={toggleSpeechRecognition} 
                title="Speech-to-Text"
                active={isRecording}
                className={isRecording ? "animate-pulse" : "hover:bg-green-100"}
              >
                {isRecording ? <MicOff size={20} className="text-red-600" /> : <Mic size={20} className="text-green-600" />}
              </ToolbarButton>
              <ToolbarButton 
                onClick={() => setShowVoicePanel(true)} 
                title="Voice Cloning"
                active={showVoicePanel}
                className="hover:bg-indigo-100"
              >
                <Headphones size={20} className="text-indigo-600" />
              </ToolbarButton>
              <ToolbarButton 
                onClick={() => setShowTranslatePanel(true)} 
                title="AI Translation"
                active={showTranslatePanel}
                className="hover:bg-emerald-100"
              >
                <Languages size={20} className="text-emerald-600" />
              </ToolbarButton>
            </div>
          </div>

          <ToolbarButton 
            onClick={() => setShowSettingsPanel(true)} 
            title="Settings"
            active={showSettingsPanel}
            className="bg-gray-50/80 rounded-2xl"
          >
            <Settings size={20} />
          </ToolbarButton>
        </div>
      </div>

      {/* Speech Recognition Status */}
      {isRecording && (
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="font-semibold">Listening...</span>
              {speechConfidence > 0 && (
                <span className="text-green-200">Confidence: {Math.round(speechConfidence * 100)}%</span>
              )}
            </div>
            {speechTranscript && (
              <div className="flex-1 mx-4 text-center">
                <span className="italic opacity-90">"{speechTranscript}"</span>
              </div>
            )}
            <button
              onClick={toggleSpeechRecognition}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Speech Recognition Error */}
      {speechError && (
        <div className="bg-red-500 text-white px-6 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle size={20} />
              <span>Speech Recognition Error: {speechError}</span>
            </div>
            <button
              onClick={() => setSpeechError(null)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Editor */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/30">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentChange}
            onMouseUp={handleTextSelection}
            className="min-h-[700px] p-16 outline-none prose prose-lg max-w-none selection:bg-blue-100 selection:text-blue-900"
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: '1.8',
              color: textColor
            }}
            dangerouslySetInnerHTML={{ __html: content }}
            suppressContentEditableWarning={true}
          />
        </div>
      </div>

      {/* Enhanced MURF AI Panel */}
      <FeaturePanel show={showMurfPanel} onClose={() => setShowMurfPanel(false)} title="MURF AI Voice Generation" icon={Volume2}>
        <div className="space-y-8">
          {/* Voice Settings Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Voice</label>
              <select 
                value={murfVoice} 
                onChange={(e) => setMurfVoice(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              >
                <option value="bella">Bella (Female, Warm)</option>
                <option value="alex">Alex (Male, Professional)</option>
                <option value="sarah">Sarah (Female, Friendly)</option>
                <option value="david">David (Male, Authoritative)</option>
                <option value="emma">Emma (Female, Energetic)</option>
                <option value="james">James (Male, Calm)</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Language</label>
              <select 
                value={murfLanguage} 
                onChange={(e) => setMurfLanguage(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="hi-IN">Hindi</option>
                <option value="ja-JP">Japanese</option>
              </select>
            </div>
          </div>
          
          {/* Voice Style */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Voice Style</label>
            <div className="grid grid-cols-3 gap-3">
              {['conversational', 'professional', 'energetic', 'calm', 'dramatic', 'friendly'].map((style) => (
                <button
                  key={style}
                  onClick={() => setMurfStyle(style)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 capitalize font-medium ${
                    murfStyle === style
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Speed and Pitch Controls */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 flex items-center justify-between">
                <span>Speed</span>
                <span className="text-blue-600 font-mono">{murfSpeed}x</span>
              </label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                value={murfSpeed}
                onChange={(e) => setMurfSpeed(parseFloat(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.5x</span>
                <span>1x</span>
                <span>2x</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 flex items-center justify-between">
                <span>Pitch</span>
                <span className="text-purple-600 font-mono">{murfPitch}x</span>
              </label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                value={murfPitch}
                onChange={(e) => setMurfPitch(parseFloat(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-purple-200 to-purple-400 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.5x</span>
                <span>1x</span>
                <span>2x</span>
              </div>
            </div>
          </div>

          {/* Text Preview */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Text to Generate</label>
            <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 max-h-32 overflow-y-auto">
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedText || content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
              </p>
            </div>
          </div>

          {/* Generation Progress */}
          {isGeneratingAudio && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">Generating Audio...</span>
                <span className="text-sm text-blue-600">{audioGenerationProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${audioGenerationProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Audio Error Display */}
          {audioError && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="text-red-500" size={20} />
              <span className="text-red-700 text-sm">{audioError}</span>
              <button 
                onClick={() => setAudioError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Audio Player */}
          {audioUrl && (
            <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-800">Generated Audio</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = audioUrl;
                      link.download = `${documentTitle}_audio.mp3`;
                      link.click();
                    }}
                    className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>
              
              {/* Audio Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{Math.floor((audioProgress / 100) * audioDuration)}s</span>
                  <span>{Math.floor(audioDuration)}s</span>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleAudioTimeUpdate}
                onLoadedMetadata={handleAudioLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
          )}

          {/* Generate Button */}
          <button 
            onClick={generateMurfAudio}
            disabled={isGeneratingAudio}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-5 rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 font-bold text-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              {isGeneratingAudio ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Generating MURF Audio...</span>
                </>
              ) : (
                <>
                  <Volume2 size={24} />
                  <span>Generate MURF Audio</span>
                </>
              )}
            </div>
          </button>

          {/* Audio History */}
          {audioHistory.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 flex items-center">
                <Circle size={16} className="mr-2 text-blue-500" />
                Recent Audio
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {audioHistory.map((audio) => (
                  <div key={audio.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 truncate">{audio.text}</p>
                      <p className="text-xs text-gray-500">{audio.voice} • {audio.timestamp}</p>
                    </div>
                    <button
                      onClick={() => setAudioUrl(audio.url)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Play size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </FeaturePanel>

      {/* Enhanced AI Content Generation Panel */}
      <FeaturePanel show={showAIPanel} onClose={() => setShowAIPanel(false)} title="AI Content Generation" icon={Wand2}>
        <div className="space-y-6">
          {/* Quick Prompts */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Quick Actions</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Summarize", prompt: "Summarize this text in 3 key points", icon: "📝" },
                { label: "Expand", prompt: "Expand and improve this content with more details", icon: "📈" },
                { label: "Rewrite", prompt: "Rewrite this text to be more engaging and professional", icon: "✨" },
                { label: "Translate", prompt: "Translate this text to Spanish", icon: "🌍" }
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => setAiPrompt(action.prompt)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="font-semibold text-gray-800">{action.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Custom AI Prompt</label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., Write a blog post about sustainable technology, Create a professional email, Generate creative ideas..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-32 bg-gray-50"
            />
          </div>

          {/* Context Info */}
          {selectedText && (
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
              <h4 className="font-semibold text-yellow-800 mb-2">Selected Text Context</h4>
              <p className="text-sm text-yellow-700 italic">"{selectedText.substring(0, 100)}..."</p>
            </div>
          )}
          
          <button 
            onClick={generateAIContent}
            disabled={isGenerating || !aiPrompt.trim()}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 font-bold text-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Generating Content...</span>
                </>
              ) : (
                <>
                  <Zap size={24} />
                  <span>Generate AI Content</span>
                </>
              )}
            </div>
          </button>

          {/* AI Response */}
          {aiResponse && (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                <h4 className="font-bold mb-3 text-purple-800 flex items-center">
                  <Sparkles className="mr-2" size={20} />
                  AI Generated Content
                </h4>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {aiResponse}
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={insertAIContent}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={20} />
                  <span>Insert into Document</span>
                </button>
                <button 
                  onClick={() => setAiResponse('')}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>
      </FeaturePanel>

      {/* Enhanced Voice Cloning Panel */}
      <FeaturePanel show={showVoicePanel} onClose={() => setShowVoicePanel(false)} title="Voice Cloning" icon={Headphones}>
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">Voice Cloning Requirements</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Upload a 30-60 second clear audio sample</li>
              <li>• Ensure minimal background noise</li>
              <li>• Use consistent speaking pace and tone</li>
              <li>• Supported formats: MP3, WAV, M4A</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Upload Voice Sample</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                 onClick={() => voiceFileRef.current?.click()}>
              {voiceCloneFile ? (
                <div className="space-y-2">
                  <CheckCircle className="mx-auto text-green-500" size={32} />
                  <p className="font-semibold text-green-700">{voiceCloneFile.name}</p>
                  <p className="text-sm text-gray-500">Click to change file</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto text-gray-400" size={32} />
                  <p className="font-semibold text-gray-700">Click to upload audio file</p>
                  <p className="text-sm text-gray-500">MP3, WAV, or M4A up to 10MB</p>
                </div>
              )}
            </div>
            <input
              ref={voiceFileRef}
              type="file"
              accept="audio/*"
              onChange={(e) => setVoiceCloneFile(e.target.files[0])}
              className="hidden"
            />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Custom Voice Name</label>
            <input
              type="text"
              value={customVoiceName}
              onChange={(e) => setCustomVoiceName(e.target.value)}
              placeholder="e.g., My Professional Voice"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
            />
          </div>

          <button 
            onClick={() => {/* handleVoiceClone implementation */}}
            disabled={isGenerating || !voiceCloneFile || !customVoiceName}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-5 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 font-bold text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Cloning Voice...</span>
              </>
            ) : (
              <>
                <Headphones size={24} />
                <span>Clone Voice</span>
              </>
            )}
          </button>
        </div>
      </FeaturePanel>

      {/* Translation Panel */}
      <FeaturePanel show={showTranslatePanel} onClose={() => setShowTranslatePanel(false)} title="AI Translation" icon={Languages}>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">From Language</label>
              <select className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                <option value="auto">Auto-detect</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">To Language</label>
              <select 
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50"
              >
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
          
          {selectedText && (
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">Text to Translate</h4>
              <p className="text-gray-700 text-sm">{selectedText}</p>
            </div>
          )}
          
          <button 
            onClick={() => setTranslatedText('यह आपके चुने गए टेक्स्ट का एक नमूना अनुवाद है।')}
            disabled={!selectedText}
            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-5 rounded-2xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 font-bold text-lg"
          >
            <Languages size={24} />
            <span>Translate Selected Text</span>
          </button>

          {translatedText && (
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200">
              <h4 className="font-bold mb-3 text-emerald-800 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Translation Result
              </h4>
              <p className="text-gray-700 text-lg leading-relaxed">{translatedText}</p>
              <button 
                onClick={() => {
                  if (editorRef.current) {
                    document.execCommand('insertHTML', false, `<p>${translatedText}</p>`);
                    handleContentChange();
                    setTranslatedText('');
                  }
                }}
                className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Insert Translation
              </button>
            </div>
          )}
        </div>
      </FeaturePanel>

      {/* Settings Panel */}
      <FeaturePanel show={showSettingsPanel} onClose={() => setShowSettingsPanel(false)} title="Editor Settings" icon={Settings}>
        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">Appearance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Font Family</label>
                <select 
                  value={fontFamily} 
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50"
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Roboto">Roboto</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Font Size</label>
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50"
                >
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                  <option value="24">24px</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Text Color</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-12 border-2 border-gray-200 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Speech Recognition Settings */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">Speech Recognition</h4>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Speech Language</label>
              <select 
                value={speechLanguage} 
                onChange={(e) => setSpeechLanguage(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="hi-IN">Hindi</option>
              </select>
            </div>
          </div>

          {/* Document Statistics */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-2">Document Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{stats.words}</div>
                <div className="text-sm text-blue-800 font-medium">Words</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600">{stats.characters}</div>
                <div className="text-sm text-green-800 font-medium">Characters</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{stats.sentences}</div>
                <div className="text-sm text-purple-800 font-medium">Sentences</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">{stats.readingTime}</div>
                <div className="text-sm text-orange-800 font-medium">Min Read</div>
              </div>
            </div>
          </div>
        </div>
      </FeaturePanel>

      {/* Enhanced Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <FileText size={16} />
              <span className="font-semibold">{stats.words}</span>
              <span>words</span>
              <span>•</span>
              <span className="font-semibold">{stats.characters}</span>
              <span>characters</span>
            </div>
            {selectedText && (
              <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Eye size={14} />
                <span className="font-semibold">Selected: {selectedText.length} chars</span>
              </div>
            )}
            {isRecording && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="font-semibold">Recording...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Brain size={16} />
              <span className="font-semibold">AI Enhanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-green-700 font-bold">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.txt,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setContent(e.target.result);
            };
            reader.readAsText(file);
          }
        }}
      />

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
        }
        
        /* Enhanced prose styling */
        .prose {
          position: relative;
        }
        
        .prose h1 {
          background: linear-gradient(135deg, #1f2937, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          letter-spacing: -0.025em;
        }
        
        .prose h2 {
          color: #4f46e5;
          font-weight: 700;
          position: relative;
        }
        
        .prose h2::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          border-radius: 2px;
        }
        
        .prose h3 {
          color: #7c3aed;
          font-weight: 600;
        }
        
        .prose blockquote {
          border-left: 5px solid #3b82f6;
          background: linear-gradient(90deg, #eff6ff, #f8fafc);
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          border-radius: 0 12px 12px 0;
          position: relative;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
        }
        
        .prose blockquote::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 15px;
          font-size: 4rem;
          color: #3b82f6;
          opacity: 0.3;
          font-family: serif;
        }
        
        .prose code {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          padding: 0.375rem 0.75rem;
          border-radius: 8px;
          font-family: 'Fira Code', 'SF Mono', Consolas, monospace;
          color: #7c3aed;
          font-weight: 600;
          border: 1px solid #e2e8f0;
        }
        
        .prose pre {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #e2e8f0;
          padding: 2rem;
          border-radius: 16px;
          overflow-x: auto;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
          position: relative;
        }
        
        .prose pre::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 16px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 20px 0 #f59e0b, 40px 0 #10b981;
        }
        
        .prose ul li {
          position: relative;
          padding-left: 1.5rem;
        }
        
        .prose ul li::marker {
          color: transparent;
        }
        
        .prose ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          transform: translateY(-50%);
        }
        
        .prose ol li {
          position: relative;
          padding-left: 1.5rem;
        }
        
        .prose ol li::marker {
          color: #8b5cf6;
          font-weight: bold;
          font-size: 1.1em;
        }
        
        .prose a {
          color: #3b82f6;
          text-decoration: none;
          position: relative;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .prose a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }
        
        .prose a:hover::after {
          width: 100%;
        }
        
        .prose a:hover {
          color: #1d4ed8;
          transform: translateY(-1px);
        }
        
        .prose img {
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .prose img:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }
        
        .prose table {
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          background: white;
        }
        
        .prose th {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
        }
        
        .prose td, .prose th {
          border: none;
          padding: 1rem 1.5rem;
        }
        
        .prose tbody tr {
          transition: background-color 0.2s ease;
        }
        
        .prose tbody tr:nth-child(even) {
          background: #f8fafc;
        }
        
        .prose tbody tr:hover {
          background: #eff6ff;
        }
        
        /* Animated gradient border for editor */
        .prose::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444);
          background-size: 600% 600%;
          border-radius: 24px;
          z-index: -1;
          animation: gradientShift 8s ease infinite;
          opacity: 0.1;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        /* Enhanced focus and hover effects */
        input:focus, textarea:focus, select:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
          border-color: #3b82f6;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        button:active:not(:disabled) {
          transform: translateY(0);
        }
        
        /* Floating animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Pulse effect for recording */
        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
          }
          40%, 50% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: scale(1.33);
          }
        }
        
        .pulse-ring {
          position: relative;
        }
        
        .pulse-ring::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid #ef4444;
          border-radius: inherit;
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        /* Shimmer loading effect */
        .shimmer {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* Glass morphism effects */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
        
        /* Selection styling */
        ::selection {
          background: linear-gradient(135deg, #dbeafe, #e0e7ff);
          color: #1e40af;
        }
        
        /* Custom checkbox and radio styling */
        input[type="checkbox"], input[type="radio"] {
          width: 20px;
          height: 20px;
          accent-color: #3b82f6;
        }
        
        /* Enhanced button gradients */
        .btn-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
        }
        
        .btn-gradient:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        
        /* Panel backdrop effects */
        .panel-backdrop {
          backdrop-filter: blur(12px) saturate(180%);
          background: rgba(255, 255, 255, 0.8);
        }
        
        /* Typing indicator */
        .typing-dots {
          display: inline-flex;
          align-items: center;
        }
        
        .typing-dots span {
          height: 6px;
          width: 6px;
          background: #3b82f6;
          border-radius: 50%;
          display: inline-block;
          margin: 0 1px;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        /* Progress bar animations */
        .progress-bar {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 200% 200%;
          animation: progress-flow 2s ease infinite;
        }
        
        @keyframes progress-flow {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        
        /* Enhanced shadow effects */
        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .shadow-glow:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        
        /* Responsive design improvements */
        @media (max-width: 768px) {
          .mobile-hide {
            display: none;
          }
          
          .mobile-stack {
            flex-direction: column;
            gap: 1rem;
          }
          
          .mobile-full {
            width: 100%;
          }
        }
        
        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
          
          .prose {
            color: #000 !important;
            background: #fff !important;
          }
          
          .prose::before {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default NewDocument;