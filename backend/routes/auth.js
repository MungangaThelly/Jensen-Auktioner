const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registrera en ny användare
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Kontrollera om användaren redan finns
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Användarnamnet är upptaget.' });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa en ny användare
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    res.status(201).json({ message: 'Användare skapad.' });
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel. Försök igen senare.' });
  }
});

// Logga in
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hitta användaren
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Fel användarnamn eller lösenord.' });
    }

    // Jämför lösenord
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Fel användarnamn eller lösenord.' });
    }

    // Skapa JWT-token
    const token = jwt.sign({ id: user._id }, 'hemlignyckel', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Något gick fel. Försök igen senare.' });
  }
});

module.exports = router;