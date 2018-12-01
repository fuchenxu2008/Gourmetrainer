const mongoose = require("mongoose");

const UserSchema = ({
    nickname: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    gender: String,
    avatar: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;