const validator = require('validator');

// Validation middleware for user registration
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.trim().length > 50) {
    errors.push('Name cannot exceed 50 characters');
  }

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  } else if (password.length > 128) {
    errors.push('Password cannot exceed 128 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

// Validation middleware for user login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

// Validation middleware for document creation
const validateDocument = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Document title is required');
  } else if (title.trim().length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }

  if (content && content.length > 1000000) { // 1MB limit
    errors.push('Document content is too large');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

// Validation middleware for collaboration
const validateCollaboration = (req, res, next) => {
  const { userEmail, permission } = req.body;
  const errors = [];

  if (!userEmail) {
    errors.push('User email is required');
  } else if (!validator.isEmail(userEmail)) {
    errors.push('Please provide a valid email');
  }

  if (permission && !['view', 'edit', 'admin'].includes(permission)) {
    errors.push('Invalid permission level');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

// Validation middleware for template creation
const validateTemplate = (req, res, next) => {
  const { name, content, category } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Template name is required');
  } else if (name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  if (!content || content.trim().length === 0) {
    errors.push('Template content is required');
  }

  if (category && !['meeting', 'project', 'report', 'letter', 'proposal', 'other'].includes(category)) {
    errors.push('Invalid template category');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateDocument,
  validateCollaboration,
  validateTemplate
};