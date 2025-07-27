const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const FormData = require('form-data');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audio/');
  },
  filename: (req, file, cb) => {
    cb(null, `voice-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter  (req, file, cb)  {
  const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a'];
  const allowedExt = /\.(wav|mp3|m4a)$/i.test(path.extname(file.originalname).toLowerCase());
  
  if (allowedMimeTypes.includes(file.mimetype) && allowedExt) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files (WAV, MP3, M4A) are allowed'));
  }
}
});

// MURF AI Audio Generation
router.post('/murf/generate-audio', async (req, res) => {
  try {
    const {
      text,
      voice = 'bella',
      speed = 1,
      pitch = 1,
      emphasis = 'normal',
      language = 'en-US',
      style = 'conversational'
    } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text content is required'
      });
    }

    // MURF API Configuration
    const murfApiUrl = process.env.MURF_API_URL || 'https://api.murf.ai/v1/speech/generate';
    const murfApiKey = process.env.MURF_API_KEY;

    if (!murfApiKey) {
      return res.status(500).json({
        success: false,
        error: 'MURF API key not configured'
      });
    }

    // Prepare MURF API request
    const murfPayload = {
      text: text.substring(0, 5000), // Limit text length
      voice_id: voice,
      speed: speed,
      pitch: pitch,
      emphasis: emphasis,
      language: language,
      style: style,
      format: 'mp3',
      sample_rate: 22050
    };

    console.log('Sending request to MURF API:', murfPayload);

    const murfResponse = await axios.post(murfApiUrl, murfPayload, {
      headers: {
        'Authorization': `Bearer ${murfApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    if (murfResponse.data && murfResponse.data.audio_url) {
      // Save audio metadata to database if needed
      const audioRecord = {
        text: text.substring(0, 100),
        voice: voice,
        audioUrl: murfResponse.data.audio_url,
        settings: { speed, pitch, emphasis, language, style },
        createdAt: new Date(),
        userId: req.user?.id || null
      };

      res.json({
        success: true,
        audioUrl: murfResponse.data.audio_url,
        duration: murfResponse.data.duration || null,
        metadata: audioRecord
      });
    } else {
      throw new Error('Invalid response from MURF API');
    }

  } catch (error) {
    console.error('MURF API Error:', error.response?.data || error.message);
    
    // Handle specific MURF API errors
    if (error.response?.status === 401) {
      return res.status(401).json({
        success: false,
        error: 'Invalid MURF API credentials'
      });
    } else if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'MURF API rate limit exceeded. Please try again later.'
      });
    } else if (error.response?.status === 400) {
      return res.status(400).json({
        success: false,
        error: error.response.data?.message || 'Invalid request parameters'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate audio. Please try again.'
    });
  }
});

// AI Content Generation (using OpenAI or similar)
router.post('/ai/generate-content', async (req, res) => {
  try {
    const { prompt, context = '', selectedText = '' } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return res.status(500).json({
        success: false,
        error: 'AI service not configured'
      });
    }

    // Construct the AI prompt with context
    let fullPrompt = prompt;
    if (selectedText) {
      fullPrompt = `${prompt}\n\nSelected text context: "${selectedText}"`;
    }
    if (context) {
      fullPrompt = `${fullPrompt}\n\nDocument context: ${context.substring(0, 1000)}`;
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful writing assistant. Generate high-quality, relevant content based on the user\'s prompt. Keep responses concise and well-formatted.'
        },
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedContent = response.data.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    res.json({
      success: true,
      content: generatedContent.trim(),
      usage: response.data.usage
    });

  } catch (error) {
    console.error('AI Content Generation Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({
        success: false,
        error: 'Invalid AI API credentials'
      });
    } else if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'AI API rate limit exceeded'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate content. Please try again.'
    });
  }
});

// Voice Cloning (Upload and process voice sample)
router.post('/voice/clone', upload.single('voiceFile'), async (req, res) => {
  try {
    const { customVoiceName } = req.body;
    const voiceFile = req.file;

    if (!voiceFile || !customVoiceName) {
      if (voiceFile) await fs.unlink(voiceFile.path);
      return res.status(400).json({
        success: false,
        error: 'Voice file and custom voice name are required'
      });
    }

    const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
    
    if (!elevenLabsApiKey) {
      await fs.unlink(voiceFile.path);
      return res.status(500).json({
        success: false,
        error: 'Voice cloning service not configured'
      });
    }

    const formData = new FormData();
    const fileBuffer = await fs.readFile(voiceFile.path);
    formData.append('files', fileBuffer, {
      filename: voiceFile.originalname,
      contentType: voiceFile.mimetype
    });
    formData.append('name', customVoiceName);
    formData.append('description', `Custom voice: ${customVoiceName}`);

    const response = await axios.post('https://api.elevenlabs.io/v1/voices/add', formData, {
      headers: {
        'xi-api-key': elevenLabsApiKey,
        ...formData.getHeaders()
      }
    });

    await fs.unlink(voiceFile.path);

    res.json({
      success: true,
      voiceId: response.data.voice_id,
      voiceName: customVoiceName,
      message: 'Voice cloned successfully'
    });

  } catch (error) {
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    console.error('Voice Cloning Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      error: 'Failed to clone voice. Please try again.'
    });
  }
});

// Translation Service
router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = 'auto' } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({
        success: false,
        error: 'Text and target language are required'
      });
    }

    // Using Google Translate API
    const googleTranslateApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!googleTranslateApiKey) {
      return res.status(500).json({
        success: false,
        error: 'Translation service not configured'
      });
    }

    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${googleTranslateApiKey}`, {
      q: text,
      target: targetLanguage,
      source: sourceLanguage === 'auto' ? undefined : sourceLanguage,
      format: 'text'
    });

    const translatedText = response.data.data.translations[0].translatedText;
    const detectedLanguage = response.data.data.translations[0].detectedSourceLanguage;

    res.json({
      success: true,
      translatedText,
      detectedLanguage,
      targetLanguage
    });

  } catch (error) {
    console.error('Translation Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      error: 'Failed to translate text. Please try again.'
    });
  }
});

// Get available MURF voices
router.get('/murf/voices', async (req, res) => {
  try {
    const murfApiKey = process.env.MURF_API_KEY;
    
    if (!murfApiKey) {
      return res.status(500).json({
        success: false,
        error: 'MURF API not configured'
      });
    }

    const response = await axios.get('https://api.murf.ai/v1/speech/voices', {
      headers: {
        'Authorization': `Bearer ${murfApiKey}`,
        'Accept': 'application/json'
      }
    });

    res.json({
      success: true,
      voices: response.data.voices || []
    });

  } catch (error) {
    console.error('Error fetching MURF voices:', error.message);
    
    // Return default voices if API fails
    res.json({
      success: true,
      voices: [
        { id: 'bella', name: 'Bella', gender: 'female', language: 'en-US', style: 'warm' },
        { id: 'alex', name: 'Alex', gender: 'male', language: 'en-US', style: 'professional' },
        { id: 'sarah', name: 'Sarah', gender: 'female', language: 'en-US', style: 'friendly' },
        { id: 'david', name: 'David', gender: 'male', language: 'en-US', style: 'authoritative' },
        { id: 'emma', name: 'Emma', gender: 'female', language: 'en-US', style: 'energetic' },
        { id: 'james', name: 'James', gender: 'male', language: 'en-US', style: 'calm' }
      ]
    });
  }
});

// Audio file management
router.delete('/audio/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/audio/', filename);
    
    await fs.unlink(filePath);
    
    res.json({
      success: true,
      message: 'Audio file deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting audio file:', error.message);
    
    res.status(404).json({
      success: false,
      error: 'Audio file not found'
    });
  }
});

module.exports = router;