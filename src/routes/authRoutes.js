const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

// Register a User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    res.status(201).send("User Successfully Registered"); 
});
// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await loginUser(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Get all registered users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Update a user's particular record
router.put('/users/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Delete a particular user
router.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;


