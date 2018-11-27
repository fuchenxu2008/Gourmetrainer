const RecipeModel = require('../Recipe/model');

const resolvers = {
    Query: {
        getRecipe: async (_, param) => await RecipeModel.findOne(param),
        getRecipes: async (_, params) => await RecipeModel.find(params),
    }
}

module.exports = resolvers;