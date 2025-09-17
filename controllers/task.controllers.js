const Task = require("../models/task.models");


// -------------------- task controllers -------------------

// Create
async function createTask(newTaskData) {
    try {
        const newTask = new Task(newTaskData);
        const savedTask = await newTask.save();
        return savedTask;
    } catch (error) {
        throw error;
    }
}

// Read
async function getAllTasks() {
    try {
        const allTasks = await Task.find();
        return allTasks;
    } catch (error) {
        throw error;
    }
}

// Update
async function updateTaskById(taskId, dataToUpdate) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, dataToUpdate);
        return updatedTask;
    } catch (error) {
        throw error;
    }
}

// Delete
async function deleteTaskById(taskId) {
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        return deletedTask;
    } catch (error) {
        throw error;
    }
}

// -------------------------------------------------------

module.exports = {createTask, getAllTasks, updateTaskById, deleteTaskById};