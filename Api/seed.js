const menuJson = require('./menu.receipes.json');
const Receipe = require('./Models/receipe.js')

const seedRecipeData = async ()=> {
    // connection to DB
    try {
        await Receipe.deleteMany({});
        await Receipe.insertMany(menuJson)
        console.log('Data Seeded Successfully')
    } catch (error) {
        console.log("Error: ", error)
    }
}

module.exports = {
    seedRecipeData
};