const jwt = require('jsonwebtoken')
const UserModel = require('../schema/User/model')

// used for verifiction of user 
module.exports = {
    fetchUser: async (token) =>{
        if(!token) return null
        const { email, _id } = jwt.verify(token, "a million dollars")    
        return UserModel.findById(_id)
    }   
}