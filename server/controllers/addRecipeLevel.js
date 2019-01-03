const Recipe = require("../schema/Recipe/model")

module.exports = {
    // get the length of a specific recipe (by recipe id)
    getReceipeLength: (_id) => {
        Recipe.findById(_id, (error, existingRecipe) => {
            if (error) return console.error("Error finding recipe:", error.errmsg)
            return console.log("recipeFound:", existingRecipe.steps.length)
        })
    },

    // get the recipe with minimum and maximum length of steps in one category
    getMinMax: () => {
        let min = Infinity
        let minID = ""
        let max = -Infinity
        let maxID = ""
        Recipe.find({}, function(err, collection) {
            if (err) return console.error("err:",err.errmsg)  
            for (var i in collection){
                try {
                    if (collection[i].steps.length > max){
                        max = collection[i].steps.length 
                        maxID = collection[i]._id
                    } 
                    if (collection[i].steps.length < min){
                        min = collection[i].steps.length 
                        minID = collection[i]._id
                    }             
                } catch (error) {
                    console.log("error found: ",collection[i].titie," error:",error)        
                } 
            }
            return console.log("max count: ",max,"maxID: ",maxID,"min count: ",min,"minID: ",minID)
        })
    },
}