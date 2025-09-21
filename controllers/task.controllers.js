const Project = require("../models/project.models");
const Tag = require("../models/tag.models");
const Task = require("../models/task.models");
const Team = require("../models/team.models");


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
async function getAllTasks(queryData) {
    const queryObj = {};

    try {
        if (queryData.name) {
            queryObj["name"] = queryData.name;
        }

        if (queryData.project) {
            const projectObj = await Project.findOne({name: queryData.project})
            if (projectObj) {
                queryObj["project"] = (projectObj._id);
            }
        }
        
        if (queryData.team) {
            const teamObj = await Team.findOne({name: queryData.team});
            if (teamObj) {
                queryObj["team"] = (teamObj._id);
            }
        }

        if (queryData.tags) {
            
            const tagsArray = []
            if (Array.isArray(queryData.tags)) {
                for (const tag of queryData.tags) {
                    const tagObj = await Tag.findOne({name: tag});
                    tagsArray.push((tagObj._id));
                }
            } else {
                const tagObj = await Tag.findOne({name: queryData.tags});
                tagsArray.push((tagObj._id));
            }
            queryObj["tags"] = { $in: tagsArray}
        }

        if (queryData.dueDate) {
            queryObj["dueDate"] = queryData.dueDate;
        }

        if (queryData.status) {
            queryObj["status"] = queryData.status;
        }
        const allTasks = await Task.find(queryObj).populate(["project", "team", "tags"]);
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