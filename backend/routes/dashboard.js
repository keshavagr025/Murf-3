const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const Template = require('../models/Template');
const { auth } = require('../middleware/auth');

// All routes are protected
router.use(auth);

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;

    // Count of documents owned by user
    const ownedDocuments = await Document.countDocuments({
      owner: userId,
      status: 'active',
    });

    // Count of documents where user is a collaborator
    const collaborativeDocuments = await Document.countDocuments({
      'collaborators.user': userId,
      status: 'active',
    });

    // Count of templates created by the user
    const templatesCreated = await Template.countDocuments({
      creator: userId,
    });

    // Recent documents (owned or collaborated)
    const recentDocuments = await Document.find({
      $or: [
        { owner: userId },
        { 'collaborators.user': userId },
      ],
      status: 'active',
    })
      .populate('owner', 'name email')
      .populate('lastEditedBy', 'name email')
      .sort({ updatedAt: -1 })
      .limit(5);

    // Popular public templates
    const popularTemplates = await Template.find({ isPublic: true })
      .sort({ usageCount: -1 })
      .limit(5)
      .select('name category usageCount');

    // Activity in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await Document.find({
      $or: [
        { owner: userId },
        { 'collaborators.user': userId },
      ],
      updatedAt: { $gte: sevenDaysAgo },
    }).select('title updatedAt');

    // Send aggregated data
    res.status(200).json({
      ownedDocuments,
      collaborativeDocuments,
      templatesCreated,
      recentDocuments,
      popularTemplates,
      recentActivity,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard statistics' });
  }
});

module.exports = router;
