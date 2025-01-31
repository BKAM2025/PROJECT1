
const jwt = require('jsonwebtoken');

module.exports=(req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    jwt.verify(refreshToken, "1234", (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        // Extract user ID and role from the refresh token
        const { id, role } = user;

   

        // Attach the new access token and user info to the request object
        req.user = { id, role };

        next();
    });
};
