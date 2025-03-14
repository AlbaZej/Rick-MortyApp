import React from 'react';
// import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; // Import the language context
import { gql, useQuery } from '@apollo/client'; // Import Apollo Client's gql and useQuery
import './MainPage.css'; // Optional, create a CSS file for your main page styling

// GraphQL query to fetch main characters
const GET_MAIN_CHARACTERS = gql`
  query getMainCharacters {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

const MainPage = () => {
  const { language, handleLanguageChange } = useLanguage(); // Get current language and function to change language
  const { data, loading, error } = useQuery(GET_MAIN_CHARACTERS);

  // Return loading message if data is still fetching
  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error loading characters: {error.message}</p>;

  // Slice the array to show only the first 4 characters
  const mainCharacters = data.characters.results.slice(0, 4);

  return (
    <div className="main-page">
      {/* Video and Text Section */}
      <div className="banner-container">
        <div className="text-section">
          <h1>{language === 'en' ? 'RICK AND MORTY' : 'RICK UND MORTY'}</h1>
        </div>
        <div className="video-section">
          <video 
            src={require('./videos/Portal2.mov')} 
            type="video/mp4" 
            autoPlay 
            loop 
            muted 
            className="banner-video"
          />
        </div>
      </div>

      {/* Story Section Below the Video */}
      <div className="story-section">
        <div className="story-content">
          <div className="story-image">
            <img src={require('./logo.png')} alt="Rick and Morty" className="story-img" />
          </div>
          <div className="story-text">
            <h1>{language === 'en' ? 'Rick and Morty Story' : 'Rick und Morty Geschichte'}</h1>
            <p>
              {language === 'en' ? (
                `Rick and Morty is a darkly comedic animated series that follows the 
                misadventures of an eccentric, alcoholic scientist named Rick Sanchez and his good-hearted 
                but easily distressed grandson, Morty Smith. Together, they embark on dangerous and often absurd 
                adventures across the multiverse, encountering strange creatures, aliens, and mind-bending dimensions. 
                The show blends humor, philosophy, and sci-fi to explore themes such as the meaning of life, free will, 
                and the consequences of unchecked scientific experimentation.`
              ) : (
                `Rick und Morty ist eine düstere, humorvolle Animationsserie, die die Missgeschicke eines exzentrischen, 
                alkoholkranken Wissenschaftlers namens Rick Sanchez und seines gutmütigen, aber leicht beunruhigten Enkels 
                Morty Smith verfolgt. Zusammen erleben sie gefährliche und oft absurde Abenteuer im Multiversum, begegnen 
                seltsamen Kreaturen, Außerirdischen und denkwürdigen Dimensionen. Die Show kombiniert Humor, Philosophie 
                und Science-Fiction, um Themen wie den Sinn des Lebens, den freien Willen und die Konsequenzen unkontrollierter 
                wissenschaftlicher Experimente zu erforschen.`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Characters Section */}
      <div className="characters-section">
        <h2>{language === 'en' ? 'Main Characters' : 'Hauptfiguren'}</h2>
        <div className="character-cards">
          {mainCharacters.map((character) => (
            <div className="character-card" key={character.id}>
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
              />
              <div className="character-info">
                <h3>{character.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
