require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


// Middleware function to verify the JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}



module.exports = { verifyToken };
