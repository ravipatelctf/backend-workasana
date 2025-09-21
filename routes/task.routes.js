const {createTask, getAllTasks, updateTaskById, deleteTaskById} = require("../controllers/task.controllers");

const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
router.use(express.json());

// ----------------------- task routes ----------------------

// Create
router.post("/", async (req, res) => {
    const {name, project, team, tags, dueDate, status} = req.body;

    if (!mongoose.Types.ObjectId.isValid(project)) {
        return res.status(400).json({error: `${project} is not a valid ObjectId.`});
    }

    if (!mongoose.Types.ObjectId.isValid(team)) {
        return res.status(400).json({error: `${team} is not a valid ObjectId.`});
    }

    try {
        const newTask = await createTask({name, project, team, tags, dueDate, status});
        
        if (newTask) {
            res
                .status(201)
                .json({message: "Task created successfully."});
        }
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to create task."});
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const allTasks = await getAllTasks(req.query);
        if (!allTasks) {
            return res
                .status(404)
                .json({error: "Tasks Not Found."});
        }

        res
            .status(200)
            .send(allTasks);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to Fetch tasks."})
    }
})

// Update
router.put("/:taskId", async (req, res) => {
    const {taskId} = req.params;
    const {name, project, team, tags, dueDate, status} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({error: `${taskId} is not a valid ObjectId.`});
    }

    if (!mongoose.Types.ObjectId.isValid(project)) {
        return res.status(400).json({error: `${project} is not a valid ObjectId.`});
    }

    if (!mongoose.Types.ObjectId.isValid(team)) {
        return res.status(400).json({error: `${team} is not a valid ObjectId.`});
    }

    try {
        const updatedTask = await updateTaskById(taskId, {name, project, team, tags, dueDate, status});
        if (!updatedTask) {
            return res
                .status(404)
                .json({error: "Task Not Found."});
        }

        res
            .status(200)
            .json({message: "Task updated successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to update task."});
    }
})

// Delete
router.delete("/:taskId", async (req, res) => {
    const {taskId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({error: `${taskId} is not a valid ObjectId.`});
    }

    try {
        const deletedTask = await deleteTaskById(taskId);
        if (!deletedTask) {
            return res
                .status(404)
                .json({error: "Task not found."});
        }

        res
            .status(200)
            .json({message: "Task deleted successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete task."});
    }
})

// ----------------------------------------------------------

module.exports = router;