// Provides helper functions for date manipulation.
// Get the next day's date
function getNextDay(date) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
}

// Get attendance rate for a student within a selected time frame
function calculateAttendanceRate(attendanceRecords, startDate, endDate) {
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  const attendedDays = attendanceRecords.length;
  const attendanceRate = (attendedDays / totalDays) * 100;
  return attendanceRate.toFixed(2); 
}

module.exports = {
  getNextDay,
  calculateAttendanceRate
};
