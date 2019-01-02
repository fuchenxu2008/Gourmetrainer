const UserLevel= require('./model');

//declare all data mutation function here
const resolvers = {
    Mutation: {
        updateUserLevel: async (_, { category, userid }) => {
            // category = category name String
            try{
                const userLevel = await UserLevel.findOne({userid})
                if(userLevel) {
                    let { levelSet } = userLevel;
                    levelSet = {
                        ...levelSet,
                        // if level set already exist, add the level by 1, or set it to 1
                        [category]: levelSet[category] ? levelSet[category] + 1 : 1 
                    }
                    const newUserLevel = await UserLevel.findOneAndUpdate({ userid }, { levelSet }, { new: true })
                    return newUserLevel;
                } else {
                    return await UserLevel.create({
                        userid,
                        levelSet: {
                            [category]: 1
                        },
                    })
                }
            }catch(err){
                return console.log("error found:", err)
            }
        
        }
    }
}

module.exports = resolvers;