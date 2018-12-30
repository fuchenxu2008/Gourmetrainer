const mongoose = require("mongoose");

const UserLevelSchema = ({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    levelSet: Object
});

const UserLevel = mongoose.model("UserLevel", UserLevelSchema);

module.exports = UserLevel;
