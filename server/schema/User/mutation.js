const UserModel = require('./model');

const resolvers = {
    Mutation: {
        createUser: async (_, { params }) => await UserModel.create(params),
        updateUser: async (_, { _id, params }) => await UserModel.findByIdAndUpdate(_id, params, { new: true }),
        deleteUser: async (_, { _id }) => await UserModel.findByIdAndDelete(_id)
    }
}

module.exports = resolvers;