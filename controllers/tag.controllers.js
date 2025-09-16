const Tag = require("../models/tag.models");


//----------------------- tag controllers -----------------------------

// Create
async function createTag(name) {
    try {
        const newTag = new Tag({name});
        const savedTag = await newTag.save();
        return savedTag;
    } catch (error) {
        throw error;
    }
}

// Read
async function getAllTags() {
    try {
        const allTags = await Tag.find();
        return allTags;
    } catch (error) {
        throw error;   
    }
}

// Update --- Not needed, just delete old tag and create new tag

// Delete
async function deleteTagById(tagId) {
    try {
        const deletedTag = await Tag.findByIdAndDelete(tagId);
        return deletedTag;
    } catch (error) {
        throw error;
    }
}
//----------------------------------------------------------------

module.exports = {createTag, getAllTags, deleteTagById};