const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
},
{
    timestamps: true
},
);

const Team = mongoose.model("Team", teamSchema, "teams");

module.exports = Team;