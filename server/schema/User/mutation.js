const UserModel = require('./model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//declare all data mutation function here
const resolvers = {
    Mutation: {
        createUser: async (_, { params }) => {
            params['avatar'] = params.gender === 'male' ? 'default_male.png' : 'default_female.png'
            const user = await UserModel.create({
                ...params,
                password: await bcrypt.hash(params.password,10)
            });
            // token 
            const token = jwt.sign({ id: user._id, email: user.email }, "a million dollars", {
                expiresIn: 86400 // expires in 24 hours
            });
            return {
                ...user._doc,
                token
            }
        },
        updateUser: async (_, { _id, params }) => await UserModel.findByIdAndUpdate(_id, params, { new: true }),
        deleteUser: async (_, { _id }) => await UserModel.findByIdAndDelete(_id),
    }
}

module.exports = resolvers;