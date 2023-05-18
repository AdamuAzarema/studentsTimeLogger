// Error handling middleware
function errorHandler(err, req, res, next){
    console.error(err.stack);

    // Handle MongoDB validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    // Handle JWT authentication errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Handle other errors
    res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;