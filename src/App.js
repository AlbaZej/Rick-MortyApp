import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext'; // Import the Language context provider
import client from './apolloClient';
import CharacterList from './CharacterList';
import MainPage from './MainPage'; // Import the new MainPage component
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider> {/* Wrap the entire app with the language context */}
        <Router>
          <div className="App">
            {/* Header with Logo and Menu */}
            <header className="app-header">
              <div className="logo">
                <Link to="/">
                  <img src="\logo.png" alt="Rick and Morty Logo" className="logo-img" />
                </Link>
              </div>
              <nav className="app-menu">
                <ul>
                  <li>
                    <LanguageSwitchLink /> {/* Using the dynamic language link */}
                  </li>
                </ul>
              </nav>
            </header>

            {/* Main Content Section */}
            <main className="main-content">
              <Routes>
                {/* MainPage Route */}
                <Route path="/" element={<MainPage />} />

                {/* CharacterList Route */}
                <Route path="/characters" element={<CharacterList />} />
              </Routes>
            </main>

            {/* Footer with Language Toggle */}
            <Footer /> {/* Include the footer here */}
          </div>
        </Router>
      </LanguageProvider>
    </ApolloProvider>
  );
}

// Language switcher for the "Characters" link
const LanguageSwitchLink = () => {
  const { language } = useLanguage(); // Get current language
  const charactersText = language === 'en' ? 'Characters' : 'Charaktere'; // Switch text based on language

  return (
    <Link to="/characters">{charactersText}</Link>
  );
};

// Footer component that uses the context for language switching
const Footer = () => {
  const { handleLanguageChange } = useLanguage(); // Get the language change function from context

  return (
    <footer className="footer">
      <button onClick={() => handleLanguageChange('en')}>🇬🇧</button>
      <button onClick={() => handleLanguageChange('de')}>🇩🇪</button>
    </footer>
  );
};

export default App;
