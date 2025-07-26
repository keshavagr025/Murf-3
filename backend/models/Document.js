const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Document title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['view', 'edit', 'admin'],
      default: 'view'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateCategory: {
    type: String,
    enum: ['meeting', 'project', 'report', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'archived'],
    default: 'active'
  },
  version: {
    type: Number,
    default: 1
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Indexes for better performance
documentSchema.index({ owner: 1, status: 1 });
documentSchema.index({ 'collaborators.user': 1 });
documentSchema.index({ isPublic: 1, status: 1 });
documentSchema.index({ tags: 1 });
documentSchema.index({ createdAt: -1 });

// Virtual for checking if user is collaborator
documentSchema.virtual('isCollaborator').get(function() {
  return function(userId) {
    return this.collaborators.some(collab => 
      collab.user.toString() === userId.toString()
    );
  };
});

// Method to check user permissions
documentSchema.methods.getUserPermission = function(userId) {
  if (this.owner.toString() === userId.toString()) {
    return 'owner';
  }
  
  const collaborator = this.collaborators.find(collab => 
    collab.user.toString() === userId.toString()
  );
  
  return collaborator ? collaborator.permission : null;
};

// Method to add collaborator
documentSchema.methods.addCollaborator = function(userId, permission = 'view') {
  const existingCollab = this.collaborators.find(collab => 
    collab.user.toString() === userId.toString()
  );
  
  if (existingCollab) {
    existingCollab.permission = permission;
  } else {
    this.collaborators.push({ user: userId, permission });
  }
  
  return this.save();
};

// Method to remove collaborator
documentSchema.methods.removeCollaborator = function(userId) {
  this.collaborators = this.collaborators.filter(collab => 
    collab.user.toString() !== userId.toString()
  );
  
  return this.save();
};

// Pre-save middleware to update version
documentSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('Document', documentSchema);