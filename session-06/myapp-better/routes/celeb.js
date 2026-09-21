const express = require('express');
const router = express.Router()
const celebController = require('../controllers/celebController');

// GET: celeb list
router.get('/', celebController.getCelebs);

// GET: celeb info by ID
router.get('/:id', celebController.getCelebsbById);

module.exports = router;