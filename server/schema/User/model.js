const mongoose = require("mongoose");

const UserSchema = ({
    nickname: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    gender: String,
    avatar: {
        type: String,
        default: 'https://ws1.sinaimg.cn/large/006tNbRwgy1fxobhem2wuj30e80e874m.jpg'
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;