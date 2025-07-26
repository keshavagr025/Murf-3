const Document = require('../models/Document');
const User = require('../models/User');

// @desc    Get all user documents
// @route   GET /api/documents
// @access  Private
const getDocuments = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, sortBy = 'updatedAt', sortOrder = 'desc' } = req.query;
    
    // Build query
    const query = {
      $or: [
        { owner: req.user.id },
        { 'collaborators.user': req.user.id }
      ]
    };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const documents = await Document.find(query)
      .populate('owner', 'name email')
      .populate('collaborators.user', 'name email')
      .populate('lastEditedBy', 'name email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Document.countDocuments(query);

    res.json({
      success: true,
      documents,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Server error getting documents' });
  }
};

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
const getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('collaborators.user', 'name email')
      .populate('lastEditedBy', 'name email');

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check access permissions
    const userPermission = document.getUserPermission(req.user.id);
    if (!userPermission && !document.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Increment view count if not owner
    if (document.owner._id.toString() !== req.user.id.toString()) {
      document.viewCount += 1;
      await document.save();
    }

    res.json({
      success: true,
      document,
      userPermission
    });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: 'Server error getting document' });
  }
};

// @desc    Create new document
// @route   POST /api/documents
// @access  Private
const createDocument = async (req, res) => {
  try {
    const { title, content = '', isPublic = false, tags = [] } = req.body;

    const document = await Document.create({
      title,
      content,
      owner: req.user.id,
      isPublic,
      tags,
      lastEditedBy: req.user.id
    });

    await document.populate('owner', 'name email');

    res.status(201).json({
      success: true,
      message: 'Document created successfully',
      document
    });
  } catch (error) {
    console.error('Create document error:', error);
    res.status(500).json({ error: 'Server error creating document' });
  }
};

// @desc    Update document
// @route   PUT /api/documents/:id
// @access  Private
const updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check edit permissions
    const userPermission = document.getUserPermission(req.user.id);
    if (!userPermission || (userPermission === 'view')) {
      return res.status(403).json({ error: 'Edit access denied' });
    }

    const { title, content, isPublic, tags, status } = req.body;
    const updates = { lastEditedBy: req.user.id };

    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (tags !== undefined) updates.tags = tags;

    // Only owner can change public status and document status
    if (userPermission === 'owner') {
      if (isPublic !== undefined) updates.isPublic = isPublic;
      if (status !== undefined) updates.status = status;
    }

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('owner', 'name email')
     .populate('collaborators.user', 'name email')
     .populate('lastEditedBy', 'name email');

    res.json({
      success: true,
      message: 'Document updated successfully',
      document: updatedDocument
    });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({ error: 'Server error updating document' });
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Only owner can delete
    if (document.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Only document owner can delete' });
    }

    await Document.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ error: 'Server error deleting document' });
  }
};

// @desc    Duplicate document
// @route   POST /api/documents/:id/duplicate
// @access  Private
const duplicateDocument = async (req, res) => {
  try {
    const originalDocument = await Document.findById(req.params.id);

    if (!originalDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check read access
    const userPermission = originalDocument.getUserPermission(req.user.id);
    if (!userPermission && !originalDocument.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const duplicatedDocument = await Document.create({
      title: `${originalDocument.title} (Copy)`,
      content: originalDocument.content,
      owner: req.user.id,
      tags: originalDocument.tags,
      lastEditedBy: req.user.id,
      isPublic: false // Always create as private
    });

    await duplicatedDocument.populate('owner', 'name email');

    res.status(201).json({
      success: true,
      message: 'Document duplicated successfully',
      document: duplicatedDocument
    });
  } catch (error) {
    console.error('Duplicate document error:', error);
    res.status(500).json({ error: 'Server error duplicating document' });
  }
};

// @desc    Get document versions (basic implementation)
// @route   GET /api/documents/:id/versions
// @access  Private
const getDocumentVersions = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check access permissions
    const userPermission = document.getUserPermission(req.user.id);
    if (!userPermission && !document.isPublic) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // This is a basic implementation - in a real app you'd store version history
    res.json({
      success: true,
      versions: [{
        version: document.version,
        updatedAt: document.updatedAt,
        updatedBy: document.lastEditedBy
      }]
    });
  } catch (error) {
    console.error('Get document versions error:', error);
    res.status(500).json({ error: 'Server error getting document versions' });
  }
};

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  duplicateDocument,
  getDocumentVersions
};