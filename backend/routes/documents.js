const express = require('express');
const router = express.Router();
const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  duplicateDocument,
  getDocumentVersions
} = require('../controllers/documentController');
const { auth } = require('../middleware/auth');
const { validateDocument } = require('../middleware/validation');

// All routes are protected
router.use(auth);

// Document CRUD operations
router.route('/')
  .get(getDocuments)
  .post(validateDocument, createDocument);

router.route('/:id')
  .get(getDocument)
  .put(validateDocument, updateDocument)
  .delete(deleteDocument);

// Additional document operations
router.post('/:id/duplicate', duplicateDocument);
router.get('/:id/versions', getDocumentVersions);

module.exports = router;