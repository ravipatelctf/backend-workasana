const {createUser, getAllUsers, getUserByEmail, updateUserById, deleteUserById} = require("../controllers/user.controllers");

const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
router.use(express.json());


// ------------------------- user routes -------------------------

// Create
router.post("/", async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const newUser = await createUser(name, email, password);
        if (!newUser) {
            return res
                .status(404)
                .json({error: "Name, email or password is invalid."});
        }

        res
            .status(201)
            .json({message: "User created successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to create user."})
    }
})


// Read
router.get("/", async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        if (!allUsers) {
            return res
                .status(404)
                .json({error: "Users Not Found."});
        }

        res
            .status(200)
            .send(allUsers);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch users."})
    }
})

router.get("/:userEmail", async (req, res) => {
    try {
        const user = await getUserByEmail(req.params.userEmail);
        if (!user) {
            return res
                .status(404)
                .json({error: "User Not Found."});
        }

        res
            .status(200)
            .send(user);
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch user."})
    }
})


// Update
router.put("/:userId", async (req, res) => {
    const {userId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
            .status(400)
            .json({error: "User Id is not a valid ObjectId."});
    }
    try {
        const updatedUser = await updateUserById(userId, req.body);
        if (!updatedUser) {
            return res
                .status(404)
                .json({error: "User Not found."});
        }

        res
            .status(200)
            .json({message: "User updated successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to update user."});
    }
})


// Delete
router.delete("/:userId", async (req, res) => {
    try {
        const deletedUser = await deleteUserById(req.params.userId);
        console.log("deletedUser:", deletedUser);
        if (!deletedUser) {
            return res
                .status(404)
                .json({error: "User Not Found."});
        }

        res
            .status(200)
            .json({message: "User deleted successfully."});
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete user."})
    }
})


// ---------------------------------------------------------------

module.exports = router;