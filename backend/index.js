const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads/audio');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Import routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const collaborationRoutes = require('./routes/collaboration');
const templateRoutes = require('./routes/templates');
const dashboardRoutes = require('./routes/dashboard');
const aiRoutes = require('./routes/ai');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-document-collaboration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Socket.io for real-time collaboration
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-document', (documentId) => {
    socket.join(documentId);
    console.log(`User ${socket.id} joined document ${documentId}`);
    socket.to(documentId).emit('user-joined', {
      userId: socket.id,
      timestamp: new Date()
    });
  });
  
  socket.on('document-change', (data) => {
    socket.to(data.documentId).emit('document-update', {
      ...data,
      userId: socket.id,
      timestamp: new Date()
    });
  });
  
  socket.on('cursor-position', (data) => {
    socket.to(data.documentId).emit('cursor-update', {
      ...data,
      userId: socket.id
    });
  });
  
  socket.on('ai-generation-start', (data) => {
    socket.to(data.documentId).emit('ai-activity', {
      type: 'generation-start',
      userId: socket.id,
      feature: data.feature
    });
  });
  
  socket.on('ai-generation-complete', (data) => {
    socket.to(data.documentId).emit('ai-activity', {
      type: 'generation-complete',
      userId: socket.id,
      feature: data.feature,
      result: data.result
    });
  });
  
  socket.on('voice-generation-progress', (data) => {
    socket.to(data.documentId).emit('voice-progress-update', {
      progress: data.progress,
      userId: socket.id
    });
  });
  
  socket.on('leave-document', (documentId) => {
    socket.leave(documentId);
    socket.to(documentId).emit('user-left', {
      userId: socket.id,
      timestamp: new Date()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    env: process.env.NODE_ENV || 'development',
    services: {
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      murf: !!process.env.MURF_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
      elevenlabs: !!process.env.ELEVEN_LABS_API_KEY,
      googleTranslate: !!process.env.GOOGLE_TRANSLATE_API_KEY
    }
  });
});

// API documentation route
app.get('/api/docs', (req, res) => {
  res.json({
    endpoints: {
      ai: {
        'POST /api/ai/murf/generate-audio': 'Generate audio using MURF AI',
        'POST /api/ai/ai/generate-content': 'Generate content using AI',
        'POST /api/ai/voice/clone': 'Clone voice from audio sample',
        'POST /api/ai/translate': 'Translate text',
        'GET /api/ai/murf/voices': 'Get available MURF voices'
      },
      documents: {
        'GET /api/documents': 'Get user documents',
        'POST /api/documents': 'Create new document',
        'PUT /api/documents/:id': 'Update document',
        'DELETE /api/documents/:id': 'Delete document'
      },
      auth: {
        'POST /api/auth/register': 'Register user',
        'POST /api/auth/login': 'Login user'
      }
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    availableRoutes: ['/api/health', '/api/docs', '/api/ai/*', '/api/documents/*', '/api/auth/*']
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/docs`);
  
  console.log('\n🔧 Available Services:');
  console.log(`   MURF AI: ${process.env.MURF_API_KEY ? '✅' : '❌'}`);
  console.log(`   OpenAI: ${process.env.OPENAI_API_KEY ? '✅' : '❌'}`);
  console.log(`   ElevenLabs: ${process.env.ELEVEN_LABS_API_KEY ? '✅' : '❌'}`);
  console.log(`   Google Translate: ${process.env.GOOGLE_TRANSLATE_API_KEY ? '✅' : '❌'}`);
});