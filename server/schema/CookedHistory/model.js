const mongoose = require("mongoose");


// declare the data schema for users cooking history  (using Mongoose populate)
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

// export schema as "CookedHistory" 
module.exports = CookedHistory;