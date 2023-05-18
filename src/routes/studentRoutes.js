const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// Create a student
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const student = await Student.create({ name });
        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Student.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;
