import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitchLink = () => {
  const { language } = useLanguage();
  const charactersText = language === 'en' ? 'Characters' : 'Charaktere';

  return <Link to="/characters">{charactersText}</Link>;
};

export default LanguageSwitchLink;