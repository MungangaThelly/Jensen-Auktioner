import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Jensen Auktioner. Alla rättigheter förbehållna.</p>
      <p>Kontakt: support@jensenauktioner.se</p>
    </footer>
  );
}

export default Footer;