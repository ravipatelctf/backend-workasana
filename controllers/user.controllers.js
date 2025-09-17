const User = require("../models/user.models");

//--------------------- user controllers ---------------------
// Create
async function createUser(name, email, password) {
    try {
        const newUser = new User({name, email, password});
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}


// Read
async function getAllUsers() {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (error) {
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({email});
        return user;
    } catch (error) {
        throw error;
    }
}


// Update
async function updateUserById(userId, dataToUpdate) {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, dataToUpdate);
        return updatedUser;
    } catch (error) {
        throw error;
    }
}


// Delete
async function deleteUserById(userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        throw error;
    }
}


//------------------------------------------------------------

module.exports = {createUser, getAllUsers, getUserByEmail, updateUserById, deleteUserById};