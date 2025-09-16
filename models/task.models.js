const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    }],
    timeToComplete: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed', 'Blocked']
    }
},
{
    timestamps: true
},
);

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;