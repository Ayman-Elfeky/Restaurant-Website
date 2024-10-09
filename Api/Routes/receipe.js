const express = require('express');
const { getReceipes, getReceipesById, createRecipe, deleteRecipe,  } = require('../Controllers/receipe.controller');

const router = express.Router()


// create a new receipe (CREATE)
router.post('/', createRecipe);

// Get all recipes (READ)
router.get('/', getReceipes);

// Route to get a recipe by ID
router.get('/:id', getReceipesById);

// Update a recipe (UPDATE)
router.put('/:id', upda)

// Delete a recipe
router.delete('/:id', deleteRecipe);

module.exports = router;