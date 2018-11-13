const Recipe = require("../models/Recipe")


//Create
module.exports = {
    addReceipe:(recipe,cata)=>{
        Recipe.findById(recipe.id,(error,existingRecipe)=>{
            if(error) return console.error("Error finding recipe:", error.errmsg)
            if(existingRecipe) return console.log("Recipe exist:",existingRecipe._id,existingRecipe.title)
            Recipe.create(Object.assign(recipe, { _id: recipe.id, intro: recipe.imtro, tags:cata}),(error)=>{
                if(error) return console.error("Error creating recipe:", error.errmsg)
                return 
                // console.log("recipe title:", recipe.id,recipe.title, "added")
            })
        })        
    },

    //Read
    getRecipe:(param)=>{
        Recipe.find(param,(error,recipes)=>{
            if(error) return res.status(400).send("Error in finding recipes")
            return console.log("recipe found:")+recipes
        })
    }
}

