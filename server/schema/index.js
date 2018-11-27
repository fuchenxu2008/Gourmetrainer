const { makeExecutableSchema } = require('apollo-server-express');

const { CookedHistoryType, CookedHistoryQuery } = require('./CookedHistory');
const { LevelType, LevelQuery } = require('./Level');
const { RecipeType, RecipeQuery } = require('./Recipe');
const { UserType, UserQuery } = require('./User');

const Root = /* GraphQL */`
    type Query {
        getUser(_id: String, email: String): User
        getRecipe(_id: String): Recipe
        getRecipes(title: String, tags: String): [Recipe]
        getLevel(_id: String, recipe: String): Level
        getLevels(level: Int): [Level]
        getCookedHistory(_id: String): CookedHistory
        getCookedHistories(user: String, recipe: String): [CookedHistory]
    }
`;

const resolvers = [
    /**
     * Queries
     */
    CookedHistoryQuery,
    LevelQuery,
    RecipeQuery,
    UserQuery
];

module.exports = makeExecutableSchema({
    typeDefs: [Root, CookedHistoryType, LevelType, RecipeType, UserType],
    resolvers,
})