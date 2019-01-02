const CookedHistoryModel = require('./model');

//declare all data mutation function here
const resolvers = {
    Mutation: {
        addCookedHistory: async (_, params) => await CookedHistoryModel.create(params),
        removeCookedHistory: async (_, { _id }) => await CookedHistoryModel.findByIdAndDelete(_id),
    }
}

module.exports = resolvers;