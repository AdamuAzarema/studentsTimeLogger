const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    entryTime: {
        type: Date,
        required: true,
    },
    exitTime: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
