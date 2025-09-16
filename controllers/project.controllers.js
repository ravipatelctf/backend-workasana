const Project = require("../models/project.models");


//----------------------- project controllers -----------------------------

// Create
async function createProject(name, description) {
    try {
        const newProject = new Project({name, description});
        const savedProject = await newProject.save();
        return savedProject;
    } catch (error) {
        throw error;
    }
}

// Read
async function getAllProjects() {
    try {
        const allProjects = await Project.find();
        return allProjects;
    } catch (error) {
        throw error;
    }
}

// Update
async function updateProjectById(projectId, dataToUpdate) {
    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, dataToUpdate);
        return updatedProject;
    } catch (error) {
        throw error;
    }
}

// Delete
async function deleteProjectById(projectId) {
    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        return deletedProject;
    } catch (error) {
        throw error;
    }
}

//----------------------------------------------------------------

module.exports = {createProject, getAllProjects, updateProjectById, deleteProjectById};