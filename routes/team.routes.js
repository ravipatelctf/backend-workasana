const {createTeam, getAllTeams, updateTeamById, deleteTeamById} = require("../controllers/team.controllers");

const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
router.use(express.json());

// -------------------- team routes ---------------------

// Create
router.post("/", async (req, res) => {
    const {name, description} = req.body;
    try {
        const newTeam = await createTeam(name, description);
        if (!newTeam) {
            return res
                .status(400)
                .json({error: "Team name is required and must be unique."});
        }

        res
            .status(201)
            .json({message: "Team Created Successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to create team."});
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const allTeams = await getAllTeams();
        if (!allTeams) {
            return res
                .status(404)
                .json({error: "Teams Not found."});
        }

        res
            .status(200)
            .send(allTeams);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch teams."})
    }
})

// Update
router.put("/:teamId", async (req, res) => {
    const {teamId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res
            .status(400)
            .json({error: "Team Id is not a valid ObjectId."})
    }

    const {name, description} = req.body;
    try {
        const updatedTeam = await updateTeamById(teamId, {name, description});
        if (!updatedTeam) {
            return res
                .status(404)
                .json({error: "Team Not found."});
        }

        res
            .status(200)
            .json({message: "Team updated successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to update team."})
    }
});

// Delete
router.delete("/:teamId", async (req, res) => {
    const {teamId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res
            .status(400)
            .json({error: "Team Id is not a valid ObjectId."})
    }

    try {
        const deletedTeam = await deleteTeamById(teamId);
        if (!deletedTeam){
            return res
                .status(404)
                .json({error: "Team Not Found."});
        }

        res
            .status(200)
            .json({message: "Team deleted successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete team."});
    }
})

// ------------------------------------------------------

module.exports = router;