const CookedHistoryModel = require('./model');
const UserModel = require('../User/model');
const RecipeModel = require('../Recipe/model');

//declare all data query function here
const resolvers = {
    Query: {
        getCookedHistory: async (_, { _id }) => await CookedHistoryModel.findById(_id),
        getCookedHistories: async (_, params) => await CookedHistoryModel.find(params),
    },
    CookedHistory: {
        user: async (cookedHistory) => await UserModel.findById(cookedHistory.user),
        recipe: async (cookedHistory) => await RecipeModel.findById(cookedHistory.recipe),
    }
}

module.exports = resolvers;