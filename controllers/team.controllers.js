const Team = require("../models/team.models");

// ------------------ team controllers -------------------

// Create
async function createTeam(name, description) {
    try {
        const newTeam = new Team({name, description});
        const savedTeam = await newTeam.save();
        return savedTeam;
    } catch (error) {
        throw error;
    }
}

// Read
async function getAllTeams() {
    try {
        const allTeams = await Team.find();
        return allTeams;
    } catch (error) {
        throw error;
    }
}

// Update
async function updateTeamById(teamId, dataToUpdate) {
    try {
        const updatedProject = await Team.findByIdAndUpdate(teamId, dataToUpdate);
        return updatedProject;
    } catch (error) {
        throw error;
    }
}

// Delete
async function deleteTeamById(teamId) {
    try {
        const deletedTeam = await Team.findByIdAndDelete(teamId);
        return deletedTeam;
    } catch (error) {
        throw error;
    }
}

// -------------------------------------------------------

module.exports = {createTeam, getAllTeams, updateTeamById, deleteTeamById};