const mongoose = require("mongoose");

const LevelSchema = mongoose.Schema({
    recipe: {
        type: String,
        ref: 'Recipe'
    },
    level: Number
});

const Level = mongoose.model("Level", LevelSchema);

module.exports = Level;