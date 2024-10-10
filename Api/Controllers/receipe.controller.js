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

  const createRecipe = async (req, res, next)=> {
  // console.log('Creating recipe');
  // console.log(req.body);
    try {
      const newRecipe = new Receipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        category: req.body.category,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        servings: req.body.servings
        })
        await newRecipe.save();
        next(createSuccess(200, 'Recipe created Successfully'));
    } catch (error) {
      console.log(error);
      next(createError(500, error));
    }
  }

  const updateRecipe = async (req, res, next)=> {
    try {
      const recipe = await Receipe.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
      })
      next(createSuccess(200, 'Recipe Updated Successfully'));
    } catch (error) {
      console.log(error);
      next(createError(500, error))
    }
  }

  const deleteRecipe = async (req, res, next)=> {
    console.log(req.params.id);
    try {
      const receipe = await Receipe.findByIdAndDelete(req.params.id);
      console.log('Deleted Successfully');
      next(createSuccess(200, 'Deleted Successfully'));
    } catch (error) {
      next(createError(500, error));
    }
  }

module.exports = {
    getReceipes,
    getReceipesById,
    createRecipe,
    deleteRecipe,
    updateRecipe
};