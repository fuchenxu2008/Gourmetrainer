const mongoose = require("mongoose")
const CookedHistorySchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    recipe: {type: String, ref: 'Recipe'},
    rating: Number
})

const CookedHistory = mongoose.model("CookedHistory", CookedHistorySchema)
module.exports = CookedHistory