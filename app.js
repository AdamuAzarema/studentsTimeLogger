require('dotenv').config();
const express = require('express');
const compression = require("compression");
const cors = require("cors");
const { default: helmet } = require("helmet");
const connectDB = require('./config/database');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const authRoutes = require('./src/routes/authRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const errorHandler = require('./src/middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/attendance', attendanceRoutes);
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




