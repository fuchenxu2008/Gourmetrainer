const UserModel = require('./model');
const CookedHistoryModel = require('../CookedHistory/model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const resolvers = {
    Query: {
        getUser: async (_, param) => await UserModel.findOne(param),
        loginUser: async (_, {email,password}) => {
            const user = await UserModel.findOne({ email })
            if (!user) {
                throw new Error('No user with that email')
            }
            const valid = await bcrypt.compare(password, user.password)
            if (!valid) {
                throw new Error('Incorrect password')
            }
            const token = jwt.sign({ id: user._id, email: user.email }, "a million dollars", {
                expiresIn: 86400 // expires in 24 hours
            });
            
            return {
                ...user._doc,
                token
            }
        }
    },
    User: {
        cookedHistories: async (user) => await CookedHistoryModel.find({ user })
    }
}

module.exports = resolvers;