const UserLevel= require('./model');


const resolvers = {
    Mutation: {
        updateUserLevel: async (_, { category, userid }) => {
            // category = category name String
            try{
                const userLevel = await UserLevel.findOne({userid})
                if(userLevel){
                    let { levelSet } = userLevel;
                    levelSet = {
                        ...levelSet,
                        [category]: levelSet[category] ? levelSet[category] + 1 : 1 
                    }
                    const newUserLevel = await UserLevel.findOneAndUpdate({userid},
                        {
                            levelSet
                        },
                        {
                            new: true
                        }
                    )
                    return newUserLevel
                }
            }catch(err){
                return console.log("error found:", err)
            }
        
        }
    }
}

module.exports = resolvers;