const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    jwt.verify(token, '1234', (err, decoded) => {
       if (err) {
          console.error("JWT verification failed:", err);
          return res.status(403).json({ message: 'Invalid token' });
       }
 
       // Optionally check userId or roles
    //    if (!decoded.userId) {
    //       return res.status(403).json({ message: 'Token does not contain userId' });
    //    }
 
       req.user = decoded; // Attach decoded user to the request
       next(); // Proceed to the next middleware/controller
    });
 };
 

module.exports = {
    authenticateToken
};
