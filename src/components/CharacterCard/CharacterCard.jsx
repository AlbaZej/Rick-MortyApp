import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CharacterCard = ({ character, onClick }) => {
  const { language } = useLanguage();

  console.log('Current language:', language); 

  return (
    <div className="character-card" onClick={onClick}>
      <img
        src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
        alt={character.name}
        className="character-image"
      />
      <div className="character-info">
        <h2>{character.name}</h2>
        <p>{character.status}</p>
        <p>{character.species}</p>
        <div className="view-text">
          {language === 'en' ? 'View Details' : 'Details anzeigen'}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;