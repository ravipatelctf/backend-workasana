const {createProject, getAllProjects, updateProjectById, deleteProjectById} = require("../controllers/project.controllers");

const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
router.use(express.json());

//----------------------- project routes -----------------------------

// Create
router.post("/", async (req, res) => {
    const {name, description} = req.body;
    try {
        const newProject = await createProject(name, description);
        if (!newProject) {
            return res
                .status(400)
                .json({error: "Project name is required and it must be unique."})
        }

        res
            .status(201)
            .json({message: "Project created successfully."});

    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to create project."})
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const allProjects = await getAllProjects();
        if (!allProjects) {
            return res
                .status(404)
                .json({error: "Projects Not Found."});
        }

        res
            .status(200)
            .send(allProjects);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch projects."})
    }
})

// Update
router.put("/:projectId", async (req, res) => {
    const {projectId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res
            .status(400)
            .json({error: "Project Id is not a valid ObjectId."});
    }
    
    const {name, description} = req.body;

    try {
        const updatedProject = await updateProjectById(projectId, {name, description});
        if (!updatedProject) {
            res
                .status(404)
                .json({error: "Project Not Found."});
        }

        res
            .status(200)
            .json({message: "Project updated successfully."})
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to update project."})
    }
})

// Delete
router.delete("/:projectId", async (req, res) => {
    const {projectId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res
            .status(400)
            .json({error: "Project Id is not a valid Id."});
    }
    try {
        const deletedProject = await deleteProjectById(projectId);
        if (!deletedProject) {
            return res
                .status(404)
                .json({error: "Project Not Found."});
        }

        res
            .status(200)
            .json({message: "Project deleted successfully."})
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete project."});
    }
})

//----------------------------------------------------------------

module.exports = router;