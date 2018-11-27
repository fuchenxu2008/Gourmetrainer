const UserModel = require('../User/model');
// const CookedHistoryModel = require('../CookedHistory/model');

const resolvers = {
    Query: {
        getUser: async (_, param) => await UserModel.findOne(param),
    },
}

module.exports = resolvers;