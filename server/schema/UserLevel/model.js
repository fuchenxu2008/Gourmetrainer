const mongoose = require("mongoose");

const UserLevelSchema = ({
    _id:String,
    levelSet: Object
});

const UserLevel = mongoose.model("UserLevel", UserLevelSchema);

module.exports = UserLevel;
