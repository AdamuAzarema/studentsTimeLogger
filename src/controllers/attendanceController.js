const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');
const dateUtils = require('../utils/dateUtils');

async function trackEntry(req, res) {
    try {
        const { studentId } = req.body;
        // Logic for tracking entry 
        const entry = await Attendance.create({
            studentId,
            entryTime: new Date()
        });
      res.status(200).send("Student Entry was successful");
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function trackExit(req, res) {
    try {
        const { studentId } = req.body;
        // Logic for tracking exit 
        const exitTime = new Date();
        const attendance = await Attendance.findOneAndUpdate(
            { studentId, exitTime: null },
            { exitTime },
            { new: true }
        );
        if (attendance) {
          res.status(200).send("Student Exited successfully!");

        } else {
            res.status(404).json({ message: 'No active entry found for the specified student.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getEntryTime(req, res) {
  try {
    const { studentId, date } = req.query;
    // Logic for retrieving entry time
    const entry = await Attendance.findOne({
      studentId,
      entryTime: { $gte: date, $lt: dateUtils.getNextDay(date) }
    });

    if (entry) {
      // Adjust the entry time to the local timezone
      const entryTime = new Date(entry.entryTime);
      const localEntryTime = entryTime.toLocaleTimeString();

      if (entry.exitTime) {
        // Adjust the exit time to the local timezone
        const exitTime = new Date(entry.exitTime);
        const localExitTime = exitTime.toLocaleTimeString();

        // Calculate the time spent in milliseconds
        const timeSpent = exitTime - entryTime;

        // Convert the time spent to hours, minutes seconds
        const hours = Math.floor(timeSpent / (1000 * 60 * 60));
        const minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeSpent % (1000 * 60)) / 1000);

        res.status(200).json({ entryTime: localEntryTime, exitTime: localExitTime, hours, minutes, seconds });
      } else {
        res.status(200).json({ entryTime: localEntryTime, exitTime: null, hours: 0, minutes: 0, seconds: 0 });
      }
    } else {
      res.status(404).json({ message: 'No entry found for the specified student and date.' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function getTotalTime(req, res) {
  try {
    const { studentId, startDate, endDate } = req.query;
    // Logic for retrieving total time within a date range
    const entries = await Attendance.find({
      studentId,
      entryTime: { $gte: startDate, $lt: dateUtils.getNextDay(endDate) },
      exitTime: { $exists: true }
    });

    let totalTime = 0;
    for (const entry of entries) {
      const entryTime = new Date(entry.entryTime);
      const exitTime = new Date(entry.exitTime);
      const timeSpent = exitTime - entryTime;
      totalTime += timeSpent;
    }

    // Convert the total time spent to hours, minutes, seconds
    const totalHours = Math.floor(totalTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((totalTime % (1000 * 60)) / 1000);

    res.status(200).json({ totalHours, totalMinutes, totalSeconds });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function getAllTotalTime(req, res) {
  try {
    const { startDate, endDate } = req.query;
    // Logic for retrieving total time for all students within a date range
    const entries = await Attendance.aggregate([
      {
        $match: {
          entryTime: { $gte: new Date(startDate), $lt: dateUtils.getNextDay(new Date(endDate)) },
          exitTime: { $exists: true }
        }
      },
      {
        $group: {
          _id: "$studentId",
          totalTime: { $sum: { $subtract: ["$exitTime", "$entryTime"] } }
        }
      }
    ]);

    const results = [];
    for (const entry of entries) {
      const student = await Student.findById(entry._id);
      const totalHours = Math.floor(entry.totalTime / (1000 * 60 * 60));
      const totalMinutes = Math.floor((entry.totalTime % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((entry.totalTime % (1000 * 60)) / 1000);
      results.push({ studentName: student.name, totalHours, totalMinutes, totalSeconds });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = {
    trackEntry,
    trackExit,
    getEntryTime,
    getTotalTime,
  getAllTotalTime
};






