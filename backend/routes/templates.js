const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const { auth, optionalAuth } = require('../middleware/auth');
const { validateTemplate } = require('../middleware/validation');

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20, sortBy = 'usageCount' } = req.query;
    
    // Build query for public templates or user's templates
    const query = { 
      $or: [
        { isPublic: true },
        ...(req.user ? [{ creator: req.user.id }] : [])
      ]
    };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$and = [
        query.$or ? { $or: query.$or } : {},
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
          ]
        }
      ];
      delete query.$or;
    }

    // Sort options
    const sortOptions = {};
    if (sortBy === 'popular') {
      sortOptions.usageCount = -1;
    } else if (sortBy === 'newest') {
      sortOptions.createdAt = -1;
    } else if (sortBy === 'rating') {
      sortOptions['rating.average'] = -1;
    } else {
      sortOptions.usageCount = -1;
    }

    const templates = await Template.find(query)
      .populate('creator', 'name')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Template.countDocuments(query);

    res.json({
      success: true,
      templates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Server error getting templates' });
  }
});

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
      .populate('creator', 'name email');

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check if user can access this template
    if (!template.isPublic && (!req.user || template.creator._id.toString() !== req.user.id.toString())) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Server error getting template' });
  }
});

// @desc    Create new template
// @route   POST /api/templates
// @access  Private
router.post('/', auth, validateTemplate, async (req, res) => {
  try {
    const { name, description, content, category = 'other', isPublic = true, tags = [] } = req.body;

    const template = await Template.create({
      name,
      description,
      content,
      category,
      creator: req.user.id,
      isPublic,
      tags
    });

    await template.populate('creator', 'name');

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      template
    });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ error: 'Server error creating template' });
  }
});

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private
router.put('/:id', auth, validateTemplate, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Only creator can update
    if (template.creator.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Only template creator can update' });
    }

    const { name, description, content, category, isPublic, tags } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (content) updates.content = content;
    if (category) updates.category = category;
    if (isPublic !== undefined) updates.isPublic = isPublic;
    if (tags) updates.tags = tags;

    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('creator', 'name');

    res.json({
      success: true,
      message: 'Template updated successfully',
      template: updatedTemplate
    });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ error: 'Server error updating template' });
  }
});

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Only creator can delete
    if (template.creator.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Only template creator can delete' });
    }

    await Template.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: 'Server error deleting template' });
  }
});

// @desc    Use template (increment usage count)
// @route   POST /api/templates/:id/use
// @access  Private
router.post('/:id/use', auth, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check access
    if (!template.isPublic && template.creator.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await template.incrementUsage();

    res.json({
      success: true,
      message: 'Template usage recorded',
      template: {
        id: template._id,
        name: template.name,
        content: template.content
      }
    });
  } catch (error) {
    console.error('Use template error:', error);
    res.status(500).json({ error: 'Server error using template' });
  }
});

// @desc    Get template categories
// @route   GET /api/templates/categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Template.aggregate([
      { $match: { isPublic: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      categories: categories.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error getting categories' });
  }
});

// @desc    Get user's templates
// @route   GET /api/templates/my
// @access  Private
router.get('/my/templates', auth, async (req, res) => {
  try {
    const templates = await Template.find({ creator: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      templates
    });
  } catch (error) {
    console.error('Get user templates error:', error);
    res.status(500).json({ error: 'Server error getting user templates' });
  }
});

module.exports = router;