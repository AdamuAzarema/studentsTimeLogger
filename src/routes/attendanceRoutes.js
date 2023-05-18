const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middleware/authMiddleware');

// Track entry
router.post('/entry', verifyToken, attendanceController.trackEntry);

// Track exit
router.post('/exit', verifyToken, attendanceController.trackExit);

// Get entry time for a student on a specific date
router.get('/entry-time', verifyToken, attendanceController.getEntryTime);

// Get total hours, minutes, and seconds spent by a student within a date range
router.get('/total-time', verifyToken, attendanceController.getTotalTime);

// Get total hours, minutes, and seconds spent by all students within a date range
router.get('/all-total-time', verifyToken, attendanceController.getAllTotalTime);

module.exports = router;











