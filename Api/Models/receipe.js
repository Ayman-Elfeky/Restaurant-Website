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
    required: false
},
preparation: {
    type: [String], // Array of steps for preparation
    required: false
},
category: {
    type: String,
    required: false
},
prep_time: {
    type: String,
    required: false
},
cook_time: {
    type: String,
    required: false
},
servings: {
    type: Number,
    required: false
},
createdAt: { // Adding createdAt field
    type: Date,
    default: Date.now // Automatically set to the current date when created
}
});
const Receipe = mongoose.model('Receipe', RecipeSchema);
module.exports = Receipe;