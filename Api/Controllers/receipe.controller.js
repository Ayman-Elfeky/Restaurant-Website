const Receipe = require("../Models/receipe.js");
const createError = require("../utilities/error");
const createSuccess = require("../utilities/success");

const getReceipes = async (req, res, next)=>{
    try {
        const receipes = await Receipe.find();
        next(createSuccess(200, 'All Receipes Fetched', receipes))
    } catch (error) {
        next(createError(500, 'Internal Server Error'))
    }
}

const getReceipesById = async (req, res, next) => {
    try {
      const recipe = await Receipe.findById(req.params.id);
      if (!recipe) {
        return next(createError(404, 'Recipe Not Found!'));
      }
      res.json({ data: recipe });
    } catch (err) {
        return next(createError(500, 'Internal Server Error'));
    }
  }

module.exports = {
    getReceipes,
    getReceipesById
};