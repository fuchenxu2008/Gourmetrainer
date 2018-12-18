const RecipeModel = require('./model');

const resolvers = {
    Query: {
        getRecipe: async (_, { _id }) => await RecipeModel.findById(_id),
        getRecipes: async (_, { title, tags, level, limit }) => await RecipeModel.find({
            title: new RegExp(title, 'i'),
            tags: new RegExp(tags, 'i'),
            level,
        }).limit(limit),
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