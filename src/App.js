import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import client from './services/apolloClient';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import CharacterList from './pages/CharacterList/CharacterList';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/characters" element={<CharacterList />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ApolloProvider>
  );
}

export default App;