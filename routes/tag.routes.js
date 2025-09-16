const {createTag, getAllTags, deleteTagById} = require("../controllers/tag.controllers");

const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
router.use(express.json());


//----------------------- tag routes -----------------------------

// Create
router.post("/", async (req, res) => {
    
    if (!req.body || !req.body["name"]) {
        return res
            .status(400)
            .json({error: "Invalid tag name."});
    }
    const {name} = req.body;
    try {
        const savedTag = await createTag(name);
        if (savedTag) {
            res
                .status(201)
                .json({message: "Tag created successfully."});
        }
    } catch (error) {
        res
            .status(500)
            .json({message: "Failed to create tag."})
    }
})

// Read
router.get("/", async (req, res) => {
    try {
        const allTags = await getAllTags();
        if (allTags) {
            res
                .status(200)
                .send(allTags);
        }
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to fetch tags."})
    }
})

// Update --- Not needed, just delete old tag and create new tag

// Delete
router.delete("/:tagId", async (req, res) => {
    const {tagId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(tagId)) {
        return req.status(400).json({error: "Invalid ID format."})
    }

    try {
        const deletedTag = await deleteTagById(tagId);
        
        if (!deletedTag) {
            return res
                .status(404)
                .json({error: "Tag Not found."})
        }

        res
            .status(200)
            .json({message: "Tag deleted successfully."})
        
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete tag."})
    }
})
//----------------------------------------------------------------


module.exports = router;