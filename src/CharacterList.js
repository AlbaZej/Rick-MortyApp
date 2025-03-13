import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLanguage } from './LanguageContext'; // Import the custom hook
import './CharacterList.css'; // Import your custom styles

const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: {status: $status, species: $species}) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
      info {
        next
        prev
      }
    }
  }
`;

const CharacterList = () => {
  const { language } = useLanguage(); // Access language from context
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Popup state
  const [sortBy, setSortBy] = useState('name'); // Sorting state

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page, status: statusFilter, species: speciesFilter },
  });

  // Handle card click to show more information in a popup
  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    document.body.classList.add('popup-active'); // Add class to show overlay
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedCharacter(null);
    document.body.classList.remove('popup-active'); // Remove class to hide overlay
  };

  // Filter handlers
  const handleStatusFilter = (event) => setStatusFilter(event.target.value);
  const handleSpeciesFilter = (event) => setSpeciesFilter(event.target.value);
  
  // Clear Filters handler
  const handleClearFilters = () => {
    setStatusFilter('');
    setSpeciesFilter('');
    setSortBy('name');  // Reset sorting to 'name'
    setPage(1); // Reset to the first page when filters are cleared
  };

  // Sorting Handler
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Sort characters based on selected field
  const sortedCharacters = data ? [...data.characters.results].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'origin') {
      return a.origin?.name.localeCompare(b.origin?.name);
    }
    return 0;
  }) : [];

  // Format status for better readability
  const formattedStatus = (status) => {
    if (status === 'Alive') return '🟢 Alive';
    if (status === 'Dead') return '🔴 Dead';
    return '⚪ Unknown';
  };

  if (loading) return <p>{language === 'en' ? 'Loading...' : 'Wird geladen...'}</p>;
  if (error) return <p>{language === 'en' ? `Error: ${error.message}` : `Fehler: ${error.message}`}</p>;

  return (
    <div className={`character-list ${selectedCharacter ? 'active' : ''}`}>
      {/* Filters Sidebar */}
      <div className="filters">
        <h2>{language === 'en' ? 'Filters' : 'Filtern'}</h2>
        <select onChange={handleStatusFilter} value={statusFilter}>
          <option value="">{language === 'en' ? 'Status' : 'Status'}</option>
          <option value="Alive">{language === 'en' ? 'Alive' : 'Lebendig'}</option>
          <option value="Dead">{language === 'en' ? 'Dead' : 'Tot'}</option>
          <option value="Unknown">{language === 'en' ? 'Unknown' : 'Unbekannt'}</option>
        </select>

        <select onChange={handleSpeciesFilter} value={speciesFilter}>
          <option value="">{language === 'en' ? 'Species' : 'Spezie'}</option>
          <option value="Human">{language === 'en' ? 'Human' : 'Mensch'}</option>
          <option value="Alien">{language === 'en' ? 'Alien' : 'Außerirdisch'}</option>
        </select>

        <select onChange={handleSortChange} value={sortBy}>
          <option value="name">{language === 'en' ? 'Sort by Name' : 'Nach Name sortieren'}</option>
          <option value="origin">{language === 'en' ? 'Sort by Origin' : 'Nach Herkunft sortieren'}</option>
        </select>

        <button onClick={handleClearFilters}>
          {language === 'en' ? 'Clear Filters' : 'Filter zurücksetzen'}
        </button>
      </div>

      {/* Character Cards */}
      <div className="character-cards">
        {sortedCharacters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => handleCardClick(character)}
          >
            <img
              src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
              alt={character.name}
              className="character-image"
            />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p>{formattedStatus(character.status)}</p>
              <p>{character.species}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay behind the popup */}
      <div className="popup-overlay"></div>

      {/* Character Popup */}
      {selectedCharacter && (
        <div className="character-popup active">
          <button className="close-btn" onClick={handleClosePopup}>X</button>
          
          {/* Character Image */}
          <img
            src={`https://rickandmortyapi.com/api/character/avatar/${selectedCharacter.id}.jpeg`}
            alt={selectedCharacter.name}
            className="character-image"
          />
          
          {/* Character Information */}
          <div className="character-info">
            <h3>{selectedCharacter.name}</h3>
            <p><strong>Status:</strong> {formattedStatus(selectedCharacter.status)}</p>
            <p><strong>Species:</strong> {selectedCharacter.species}</p>
            <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
            <p><strong>Origin:</strong> {selectedCharacter.origin?.name || 'Unknown'}</p>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={!data.characters.info.prev}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={!data.characters.info.next}>Next</button>
      </div>
    </div>
  );
};

export default CharacterList;
