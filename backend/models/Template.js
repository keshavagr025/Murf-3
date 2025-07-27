const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Template content is required']
  },
  category: {
    type: String,
    enum: ['meeting', 'project', 'report', 'letter', 'proposal', 'other'],
    default: 'other'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  usageCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  thumbnail: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes
templateSchema.index({ category: 1, isPublic: 1 });
templateSchema.index({ creator: 1 });
templateSchema.index({ tags: 1 });
templateSchema.index({ 'rating.average': -1 });

// Method to increment usage count
templateSchema.methods.incrementUsage = function() {
  this.usageCount += 1;
  return this.save();
};

module.exports = mongoose.model('Template', templateSchema);