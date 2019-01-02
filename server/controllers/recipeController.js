const Recipe = require("../models/Recipe")

module.exports = {
    // method that can add the recipes crawled from external API and store them in the database
    addReceipe: (recipe, cata) => {
        Recipe.findById(recipe.id, (error, existingRecipe) => {
            if (error) return console.error("Error finding recipe:", error.errmsg)
            if (existingRecipe) return console.log("Recipe exist:", existingRecipe._id, existingRecipe.title)
            Recipe.create(Object.assign(recipe, {
                _id: recipe.id,
                intro: recipe.imtro,
                tags: cata
            }), (error) => {
                if (error) return console.error("Error creating recipe:", error.errmsg)
                return console.log("recipe title:", recipe.id,recipe.title, "added")
            })
        })
    },
}