const UserModel = require('./model');
const CookedHistoryModel = require('../CookedHistory/model');

const resolvers = {
    Query: {
        getUser: async (_, param) => await UserModel.findOne(param),
    },
    User: {
        cookedHistories: async (user) => await CookedHistoryModel.find({ user })
    }
}

module.exports = resolvers;