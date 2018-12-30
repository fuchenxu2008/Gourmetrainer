const { makeExecutableSchema } = require('apollo-server-express');

const { CookedHistoryType, CookedHistoryQuery, CookedHistoryMutation } = require('./CookedHistory');
const { UserLevelType, UserLevelQuery, UserLevelMutation } = require('./UserLevel');
const { RecipeType, RecipeQuery } = require('./Recipe');
const { UserType, UserQuery, UserMutation } = require('./User');


const Root = /* GraphQL */`
    type Query {
        getUser(_id: String, email: String): User
        getRecipe(_id: String!): Recipe
        getRecipes(title: String, tags: String, level: Int, limit: Int): [Recipe]
        getRandomRecipes(limit: Int): [Recipe]
        getCookedHistory(_id: String!): CookedHistory
        getCookedHistories(user: String, recipe: String): [CookedHistory]
        loginUser(email:String!, password: String!): User
        getUserLevel(userid:String!): UserLevel
    }

    type Mutation {
        addCookedHistory(user: String!, recipe: String!, rating: Float): CookedHistory!
        removeCookedHistory(_id: String!): CookedHistory
        createUser(params: UserInput!): User
        updateUser(_id: String!, params: UserInput!): User!
        deleteUser(_id: String!): User
        updateUserLevel(category:String!, userid:String!): UserLevel
    }
`;

const resolvers = [
    /**
     * Queries
     */
    CookedHistoryQuery,
    UserLevelQuery,
    RecipeQuery,
    UserQuery,
    /**
     * Mutation
     */
    CookedHistoryMutation,
    UserMutation,
    UserLevelMutation
];

module.exports = makeExecutableSchema({
    typeDefs: [Root, CookedHistoryType, UserLevelType, RecipeType, UserType],
    resolvers,
})