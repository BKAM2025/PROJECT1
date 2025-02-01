const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        jwt.verify(token, "1234", (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(403).json({ 
                    message: 'Invalid or expired token',
                    error: err.message 
                });
            }

            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            console.log('Authenticated user:', req.user); // Debug log
            next();
        });
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ 
            message: 'Authentication error', 
            error: error.message 
        });
    }
};