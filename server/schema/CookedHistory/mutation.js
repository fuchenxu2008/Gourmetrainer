const CookedHistoryModel = require('./model');

const resolvers = {
    Mutation: {
        addCookedHistory: async (_, params) => await CookedHistoryModel.create(params),
        removeCookedHistory: async (_, { _id }) => await CookedHistoryModel.findByIdAndDelete(_id),
    }
}

module.exports = resolvers;