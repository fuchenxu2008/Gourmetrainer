const UserLevel = require('./model');
const UserModel = require('../User/model')
const GraphQLJSON = require('graphql-type-json')

//declare all data query function here
const resolvers = {
    // find user level by the userid
    Query: {
        getUserLevel: async (_, param) => await UserLevel.findOne({userid: param.userid})
    },
    UserLevel: {
        user: async(userLevel) => await UserModel.findById(userLevel.userid)  
    },
    JSON: GraphQLJSON
}

module.exports = resolvers;

