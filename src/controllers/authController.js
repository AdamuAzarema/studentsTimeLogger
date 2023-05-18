const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/userModel');


// Register a user
async function registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
     
}

// User login
async function loginUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    return token;
}

module.exports = { registerUser, loginUser };

