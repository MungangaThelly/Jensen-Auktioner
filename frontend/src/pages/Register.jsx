import React, { useState } from 'react';
import { register } from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [email, setEmail] = useState(''); 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState(''); // För att lagra eventuella felmeddelanden
  const navigate = useNavigate(); // För att navigera användaren efter registrering

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Här kontrollerar vi att lösenorden matchar
    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    // Här kontrollerar vi att alla fält är ifyllda
    if (!email || !username || !password) {
      setError('Alla fält måste fyllas i');
      return;
    }

    try {
      // Skicka registreringsinformation till servern
      const response = await register({ email, username, password });
      
      // Om registreringen lyckas, spara token i localStorage och logga in användaren direkt
      localStorage.setItem('token', response.token);
      
      // Visa ett alert meddelande efter lyckad registrering
      alert('Skapning lyckades! tack.');

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
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-post"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
          required
        />
        
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Bekräfta lösenord"
          required
        />
        
        <button type="submit">Registrera</button>
        
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
