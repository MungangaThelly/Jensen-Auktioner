import React, { useState } from 'react';
import { register } from '../services/api'; // Se till att din API-funktion accepterar e-post
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [email, setEmail] = useState(''); // Håller reda på användarens e-post
  const [username, setUsername] = useState(''); // Håller reda på användarnamn
  const [password, setPassword] = useState(''); // Håller reda på lösenord
  const [confirmPassword, setConfirmPassword] = useState(''); // Håller reda på bekräftat lösenord
  const [error, setError] = useState(''); // För att lagra eventuella felmeddelanden
  const navigate = useNavigate(); // För att navigera användaren efter registrering

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontrollera att lösenorden matchar
    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    // Kontrollera att alla fält är ifyllda
    if (!email || !username || !password) {
      setError('Alla fält måste fyllas i');
      return;
    }

    try {
      // Skicka registreringsinformation till servern
      const response = await register({ email, username, password });
      
      // Om registreringen lyckas, spara token i localStorage och logga in användaren direkt
      localStorage.setItem('token', response.token);
      
      // Navigera till hemsidan eller en annan sida efter registrering
      navigate('/');
      
      // Rensa alla fält efter lyckad registrering
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Om ett fel inträffar under registreringen, visa ett felmeddelande
      setError('Något gick fel vid registreringen');
    }
  };

  return (
    <div className={styles.register}>
      <h1>Registrera dig</h1>
      <form onSubmit={handleSubmit}>
        {/* Användarnamn */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn"
          required
        />

        {/* E-postinmatning */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-post"
          required
        />
        
        {/* Lösenord */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
          required
        />
        
        {/* Bekräfta lösenord */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Bekräfta lösenord"
          required
        />
        
        {/* Registrera-knapp */}
        <button type="submit">Registrera</button>
        
        {/* Felmeddelande */}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
