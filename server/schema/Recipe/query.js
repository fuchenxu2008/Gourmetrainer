const RecipeModel = require('./model');

const resolvers = {
    Query: {
        getRecipe: async (_, { _id }) => await RecipeModel.findById(_id),
        getRecipes: async (_, params) => await RecipeModel.find(params),
    }
}

module.exports = resolvers;