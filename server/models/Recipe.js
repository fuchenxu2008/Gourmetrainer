const mongoose = require("mongoose")
const RecipeSchema = mongoose.Schema({
    _id: String,
    title: String,  
    tags: String,
    intro: String,
    ingredients: String,
    burden: String,
    albums: Array,
    steps: [{img: String, step: String, _id:false}],
})
const Recipe = mongoose.model("Recipe",RecipeSchema)
module.exports = Recipe