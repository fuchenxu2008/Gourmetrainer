const CookedHistoryModel = require('./model');
const UserModel = require('../User/model');
const RecipeModel = require('../Recipe/model');

const resolvers = {
    Query: {
        getCookedHistory: async (_, param) => await CookedHistoryModel.findOne(param),
        getCookedHistories: async (_, params) => await CookedHistoryModel.find(params),
    },
    CookedHistory: {
        user: async (cookedHistory) => await UserModel.findById(cookedHistory.user),
        recipe: async (cookedHistory) => await RecipeModel.findById(cookedHistory.recipe),
    }
}

module.exports = resolvers;