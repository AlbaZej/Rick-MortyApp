import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard'; 

const CharacterCards = ({ characters, onCardClick }) => {
  return (
    <div className="character-cards">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => onCardClick(character)} 
        />
      ))}
    </div>
  );
};

export default CharacterCards;