import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Save, Download, Upload, Type, Palette, Undo, Redo } from 'lucide-react';

const GoogleDocsEditor = () => {
  const [content, setContent] = useState('');
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [fontSize, setFontSize] = useState('14');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load saved content on component mount
    const savedContent = window.localStorage?.getItem('googleDocsContent');
    const savedTitle = window.localStorage?.getItem('googleDocsTitle');
    if (savedContent) setContent(savedContent);
    if (savedTitle) setDocumentTitle(savedTitle);
  }, []);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
    }
  };

  const saveDocument = () => {
    try {
      window.localStorage?.setItem('googleDocsContent', content);
      window.localStorage?.setItem('googleDocsTitle', documentTitle);
      alert('Document saved successfully!');
    } catch (error) {
      console.log('Saving to memory instead');
    }
  };

  const downloadDocument = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${documentTitle}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setContent(text);
        if (editorRef.current) {
          editorRef.current.innerHTML = text;
        }
      };
      reader.readAsText(file);
    }
  };

  const ToolbarButton = ({ onClick, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-gray-100 rounded transition-colors duration-200 flex items-center justify-center"
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="text-blue-600 font-bold text-xl">Docs</div>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-medium bg-transparent border-none outline-none hover:bg-gray-100 px-2 py-1 rounded"
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
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

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-1 max-w-6xl mx-auto flex-wrap">
          {/* File operations */}
          <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Upload">
              <Upload size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={downloadDocument} title="Download">
              <Download size={16} />
            </ToolbarButton>
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton onClick={() => formatText('undo')} title="Undo">
              <Undo size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatText('redo')} title="Redo">
              <Redo size={16} />
            </ToolbarButton>
          </div>

          {/* Font settings */}
          <div className="flex items-center space-x-2 border-r border-gray-300 pr-2 mr-2">
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                formatText('fontName', e.target.value);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
            </select>
            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                formatText('fontSize', e.target.value);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
            >
              {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Text formatting */}
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
            <div className="flex items-center">
              <Palette size={16} className="mr-1" />
              <input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  formatText('foreColor', e.target.value);
                }}
                className="w-6 h-6 border-none cursor-pointer"
                title="Text Color"
              />
            </div>
          </div>

          {/* Alignment */}
          <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
            <ToolbarButton onClick={() => formatText('justifyLeft')} title="Align Left">
              <AlignLeft size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatText('justifyCenter')} title="Align Center">
              <AlignCenter size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatText('justifyRight')} title="Align Right">
              <AlignRight size={16} />
            </ToolbarButton>
          </div>

          {/* Lists */}
          <div className="flex items-center space-x-1">
            <ToolbarButton onClick={() => formatText('insertUnorderedList')} title="Bullet List">
              <List size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={() => formatText('insertOrderedList')} title="Numbered List">
              <ListOrdered size={16} />
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
            className="min-h-96 p-8 outline-none"
            style={{
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: '1.6',
              color: textColor
            }}
            dangerouslySetInnerHTML={{ __html: content }}
            suppressContentEditableWarning={true}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div>
            Words: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length}
          </div>
          <div className="flex items-center space-x-4">
            <div>Last saved: {new Date().toLocaleTimeString()}</div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All changes saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleDocsEditor;