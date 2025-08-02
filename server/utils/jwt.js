const jwt = require('jsonwebtoken');
const SECRET = 'your_secret_key'; // store in .env in production

function generateToken(user) {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECRET, { expiresIn: '2h' });
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admins only' });
  next();
}

module.exports = { generateToken, verifyToken, requireAdmin };

