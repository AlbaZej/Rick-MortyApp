import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { handleLanguageChange } = useLanguage();

  return (
    <footer className="footer">
      <button onClick={() => handleLanguageChange('en')}>🇬🇧</button>
      <button onClick={() => handleLanguageChange('de')}>🇩🇪</button>
    </footer>
  );
};

export default Footer;