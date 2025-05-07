const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user information to the request object
        next(); // Call the next middleware or route handler
    } 
    catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = authenticateToken;