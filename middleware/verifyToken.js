const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const createToken = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    return token;
  } catch (err) {
    console.log(err);
    throw new Error('Token creation failed');
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      console.log('Authorization header missing');
      return res.status(403).json({ error: 'Authorization header missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      console.log('Token missing in authorization header');
      return res.status(403).json({ error: 'Token missing' });
    }

    console.log(token, ' <-- this is the token');
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      console.log('Token verification failed');
      return res.status(400).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    console.log('Decoded user:', req.user); // Debugging log to check the decoded user
    next();
  } catch (err) {
    console.log('Error in verifyToken middleware:', err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Expired authentication token' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
