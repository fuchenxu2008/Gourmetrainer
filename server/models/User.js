const mongoose = require("mongoose")
const UserSchema = ({
    nickname: String,
    password: String,
    email: String, 
    gender: String
})
const User = mongoose.model("User",UserSchema)
module.exports = User