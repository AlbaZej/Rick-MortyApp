import React, { createContext, useState, useContext } from 'react';

// Create context
const LanguageContext = createContext();

// Provider component to wrap around the app
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
