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
      const response = await login({ username, password });
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (err) {
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