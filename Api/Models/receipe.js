const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
ingredients: {
    type: [String], // Array of strings for the ingredients
    required: true
},
preparation: {
    type: [String], // Array of steps for preparation
    required: true
},
category: {
    type: String,
    required: true  },  prep_time: {
    type: String,
    required: true
},
cook_time: {
    type: String,
    required: true
},
servings: {
    type: Number,
    required: true
},
createdAt: { // Adding createdAt field
    type: Date,
    default: Date.now // Automatically set to the current date when created
}
});
const Receipe = mongoose.model('Receipe', RecipeSchema);
module.exports = Receipe;