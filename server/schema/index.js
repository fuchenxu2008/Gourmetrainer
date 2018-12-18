const { makeExecutableSchema } = require('apollo-server-express');

const { CookedHistoryType, CookedHistoryQuery, CookedHistoryMutation } = require('./CookedHistory');
const { LevelType, LevelQuery } = require('./Level');
const { RecipeType, RecipeQuery } = require('./Recipe');
const { UserType, UserQuery, UserMutation } = require('./User');

const Root = /* GraphQL */`
    type Query {
        getUser(_id: String, email: String): User
        getRecipe(_id: String!): Recipe
        getRecipes(title: String, tags: String, level: Int, limit: Int): [Recipe]
        getRandomRecipes(limit: Int): [Recipe]
        getLevel(_id: String, recipe: String): Level
        getLevels(level: Int!): [Level]
        getCookedHistory(_id: String!): CookedHistory
        getCookedHistories(user: String, recipe: String): [CookedHistory]
        loginUser(email:String!, password: String!): User
    }

    type Mutation {
        addCookedHistory(user: String!, recipe: String!, rating: Float): CookedHistory!
        removeCookedHistory(_id: String!): CookedHistory
        createUser(params: UserInput!): User
        updateUser(_id: String!, params: UserInput!): User!
        deleteUser(_id: String!): User
    }
`;

const resolvers = [
    /**
     * Queries
     */
    CookedHistoryQuery,
    LevelQuery,
    RecipeQuery,
    UserQuery,
    /**
     * Mutation
     */
    CookedHistoryMutation,
    UserMutation,
];

module.exports = makeExecutableSchema({
    typeDefs: [Root, CookedHistoryType, LevelType, RecipeType, UserType],
    resolvers,
})