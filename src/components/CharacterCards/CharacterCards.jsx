import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CharacterCards = ({ characters, showViewDetails = true }) => {
  const { language } = useLanguage();

  return (
    <div className="character-cards">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
          />
          <div className="character-info">
            <h3>{character.name}</h3>
            <p>{character.status}</p>
            <p>{character.species}</p>
            {showViewDetails && ( 
              <div className="view-text">
                {language === 'en' ? 'View Details' : 'Details anzeigen'}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterCards;