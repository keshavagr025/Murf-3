const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { validateCollaboration } = require('../middleware/validation');

// All routes are protected
router.use(auth);

// @desc    Add collaborator to document
// @route   POST /api/collaboration/:documentId/collaborators
// @access  Private
router.post('/:documentId/collaborators', validateCollaboration, async (req, res) => {
  try {
    const { userEmail, permission = 'view' } = req.body;
    const documentId = req.params.documentId;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Only owner can add collaborators
    if (document.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Only document owner can add collaborators' });
    }

    // Find user to collaborate
    const collaboratorUser = await User.findOne({ email: userEmail.toLowerCase() });
    if (!collaboratorUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Can't collaborate with yourself
    if (collaboratorUser._id.toString() === req.user.id.toString()) {
      return res.status(400).json({ error: 'Cannot add yourself as collaborator' });
    }

    // Check if already collaborator
    const existingCollab = document.collaborators.find(collab => 
      collab.user.toString() === collaboratorUser._id.toString()
    );

    if (existingCollab) {
      // Update existing collaboration
      existingCollab.permission = permission;
    } else {
      // Add new collaborator
      document.collaborators.push({
        user: collaboratorUser._id,
        permission
      });
    }

    await document.save();
    await document.populate('collaborators.user', 'name email');

    res.json({
      success: true,
      message: 'Collaborator added successfully',
      collaborators: document.collaborators
    });
  } catch (error) {
    console.error('Add collaborator error:', error);
    res.status(500).json({ error: 'Server error adding collaborator' });
  }
});

// @desc    Get document collaborators
// @route   GET /api/collaboration/:documentId/collaborators
// @access  Private
router.get('/:documentId/collaborators', async (req, res) => {
  try {
    const document = await Document.findById(req.params.documentId)
      .populate('owner', 'name email')
      .populate('collaborators.user', 'name email');

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check access permissions
    const userPermission = document.getUserPermission(req.user.id);
    if (!userPermission && !document.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      success: true,
      owner: document.owner,
      collaborators: document.collaborators
    });
  } catch (error) {
    console.error('Get collaborators error:', error);
    res.status(500).json({ error: 'Server error getting collaborators' });
  }
});

// @desc    Update collaborator permission
// @route   PUT /api/collaboration/:documentId/collaborators/:userId
// @access  Private
router.put('/:documentId/collaborators/:userId', async (req, res) => {
  try {
    const { permission } = req.body;
    const { documentId, userId } = req.params;

    if (!['view', 'edit', 'admin'].includes(permission)) {
      return res.status(400).json({ error: 'Invalid permission level' });
    }

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Only owner can update permissions
    if (document.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Only document owner can update permissions' });
    }

    const collaborator = document.collaborators.find(collab => 
      collab.user.toString() === userId
    );

    if (!collaborator) {
      return res.status(404).json({ error: 'Collaborator not found' });
    }

    collaborator.permission = permission;
    await document.save();
    await document.populate('collaborators.user', 'name email');

    res.json({
      success: true,
      message: 'Permission updated successfully',
      collaborators: document.collaborators
    });
  } catch (error) {
    console.error('Update permission error:', error);
    res.status(500).json({ error: 'Server error updating permission' });
  }
});

// @desc    Remove collaborator
// @route   DELETE /api/collaboration/:documentId/collaborators/:userId
// @access  Private
router.delete('/:documentId/collaborators/:userId', async (req, res) => {
  try {
    const { documentId, userId } = req.params;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Owner can remove anyone, collaborators can remove themselves
    const canRemove = document.owner.toString() === req.user.id.toString() || 
                      userId === req.user.id.toString();

    if (!canRemove) {
      return res.status(403).json({ error: 'Not authorized to remove this collaborator' });
    }

    document.collaborators = document.collaborators.filter(collab => 
      collab.user.toString() !== userId
    );

    await document.save();
    await document.populate('collaborators.user', 'name email');

    res.json({
      success: true,
      message: 'Collaborator removed successfully',
      collaborators: document.collaborators
    });
  } catch (error) {
    console.error('Remove collaborator error:', error);
    res.status(500).json({ error: 'Server error removing collaborator' });
  }
});

// @desc    Get user's collaborative documents
// @route   GET /api/collaboration/documents
// @access  Private
router.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find({
      'collaborators.user': req.user.id,
      status: 'active'
    })
    .populate('owner', 'name email')
    .populate('collaborators.user', 'name email')
    .sort({ updatedAt: -1 });

    const documentsWithPermissions = documents.map(doc => ({
      ...doc.toObject(),
      userPermission: doc.getUserPermission(req.user.id)
    }));

    res.json({
      success: true,
      documents: documentsWithPermissions
    });
  } catch (error) {
    console.error('Get collaborative documents error:', error);
    res.status(500).json({ error: 'Server error getting collaborative documents' });
  }
});

module.exports = router;