const Tag = require("../models/tag.models");
const User = require("../models/user.models");
const Project = require("../models/project.models");
const Team = require("../models/team.models");
const Task = require("../models/task.models");

async function seedTagsCollection() {
    try {
        const newTag = new Tag({
            name: "bug"
        });
        await newTag.save();
    } catch (error) {
        throw error;
    }
}

async function seedUsersCollection() {
    try {
        const newUser = new User({
            name: "Ravi Shankar Patel",
            email: "ravipatelctf@gmail.com",
            password: "12345678"
        });
        await newUser.save();
    } catch (error) {
        throw error;
    }
}

async function seedProjectsCollection() {
    try {
        const newProject = new Project({
            name: "workasana",
            description: "Workasana is a task management and team collaboration tool."
        });
        await newProject.save();
    } catch (error) {
        throw error;
    }
}

async function seedTeamsCollection() {
    try {
        const newTeam = new Team({
            name: "CRUD Monkeys",
            description: "This team is tasked with creating CRUD features in backend."
        });
        await newTeam.save();
    } catch (error) {
        throw error;
    }
}

async function seedTasksCollection() {
    try {
        const newTask = new Task({
            name: "feat:search projects by name",
            project: "68c97c0e0b73841b91d3c7cf",
            team: "68c97e3ebe0a441b63eb1320",
            teamMembers: ["68c979faf6d2755bd218abf8"],
            tags: ["68c977f1aebbd8f28a279e76"],
            timeToComplete: 10,
            status: "In Progress"
        });
        await newTask.save();
    } catch (error) {
        throw error;
    }
}

// -----------------------------------------------------------
// uncomment the following code for seeding data
// seedTasksCollection();
// seedTagsCollection();
// seedUsersCollection();
// seedProjectsCollection();
// seedTeamsCollection();
// seedTasksCollection();
// -----------------------------------------------------------

// module.exports = {seedTasksCollection, seedTeamsCollection, seedProjectsCollection, seedUsersCollection, seedTagsCollection}
