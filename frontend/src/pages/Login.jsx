import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Försök att logga in med användarnamn och lösenord
      const response = await login({ username, password });

      // Spara token i localStorage för att hålla användaren inloggad
      localStorage.setItem('token', response.token);
      
      // Navigera användaren till startsidan eller annan sida
      navigate('/');

      // Visa ett alert meddelande efter lyckad inloggning
      alert('Inloggning lyckades!');

      // Rensa alla fält efter lyckad inloggning
      setUsername('');
      setPassword('');
    } catch (err) {
      // Om inloggningen misslyckas, visa ett felmeddelande
      setError('Fel användarnamn eller lösenord');
    }
  };

  return (
    <div className={styles.login}>
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
          required
        />
        <button type="submit">Logga in</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
