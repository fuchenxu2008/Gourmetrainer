const mongoose = require("mongoose");

const CookedHistorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: String,
        ref: 'Recipe'
    },
    rating: Number,
    time: {
        type: String,
        default: () => new Date().toLocaleString(),
    }
})

const CookedHistory = mongoose.model("CookedHistory", CookedHistorySchema);

module.exports = CookedHistory;