const LevelModel = require('./model');
const RecipeModel = require('../Recipe/model');

const resolvers = {
    Query: {
        getLevel: async (_, param) => await LevelModel.findOne(param),
        getLevels: async (_, params) => await LevelModel.find(params),
    },
    Level: {
        recipe: async (level) => await RecipeModel.findById(level.recipe)
    }
}

module.exports = resolvers;