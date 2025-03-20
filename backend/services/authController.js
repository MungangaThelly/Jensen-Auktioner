// Hantera användare och inloggning

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrera en ny användare
exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).json({ message: 'Användare skapad' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Logga in
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Fel användarnamn eller lösenord' });
    }
    const token = jwt.sign({ id: user._id }, 'hemlignyckel', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};