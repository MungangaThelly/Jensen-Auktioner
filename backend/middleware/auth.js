const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Ingen token tillhandahållen. Åtkomst nekad.' });
  }

  try {
    const decoded = jwt.verify(token, 'hemlignyckel');
    req.user = decoded; // Lägg till användarens ID i request-objektet
    next();
  } catch (err) {
    res.status(400).json({ message: 'Ogiltig token.' });
  }
};

module.exports = authMiddleware;