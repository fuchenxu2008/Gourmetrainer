const RecipeModel = require('./model');

//declare all data query function here
const resolvers = {
    Query: {
        getRecipe: async (_, { _id }) => await RecipeModel.findById(_id),
        getRecipes: async (_, { title, tags, level, limit }) => {
            const searchTerm = {
                title: new RegExp(title, 'i'),
                tags: new RegExp(tags, 'i'),
            }
            if (level) searchTerm['level'] = level;
            return await RecipeModel.find(searchTerm).limit(limit)
        },
        // get a random number of recipes that can be shown in the homepage
        getRandomRecipes: async (_, { limit }) => { 
            const getRandom = () => new Promise((resolve, reject) => {           
                RecipeModel.findRandom({}, {}, { limit }, (err, result) => {
                    return err ? reject(err) : resolve(result);
                });                                                                                            
            });
            return await getRandom();
        },
        
    }
}

module.exports = resolvers;