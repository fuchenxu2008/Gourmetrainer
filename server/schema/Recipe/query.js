const RecipeModel = require('./model');

const resolvers = {
    Query: {
        getRecipe: async (_, { _id }) => await RecipeModel.findById(_id),
        getRecipes: async (_, { title, tags, limit }) => await RecipeModel.find({
            title: new RegExp(title, 'i'),
            tags: new RegExp(tags, 'i'),
        }).limit(limit),
    }
}

module.exports = resolvers;