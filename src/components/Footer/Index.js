import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.year}>© {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
