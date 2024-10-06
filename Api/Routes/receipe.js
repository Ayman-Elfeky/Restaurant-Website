const express = require('express');
const { getReceipes, getReceipesById } = require('../Controllers/receipe.controller');

const router = express.Router()

router.get('/', getReceipes)

// Route to get a recipe by ID
router.get('/:id', getReceipesById);

module.exports = router;