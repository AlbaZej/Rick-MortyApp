import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../services/queriesCharacter';
import { useLanguage } from '../../context/LanguageContext';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './CharacterList.css';

const CharacterList = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page, status: statusFilter, species: speciesFilter },
    onCompleted: (newData) => {
      if (newData?.characters?.results) {
        setCharacters((prev) => [...prev, ...newData.characters.results]);
      }
    },
  });

  const hasMore = data?.characters?.info?.next;

  const loader = useInfiniteScroll(() => {
    if (hasMore) {
      fetchMore({
        variables: { page: page + 1 },
      });
      setPage((prev) => prev + 1);
    }
  }, hasMore);

  const sortedCharacters = [...characters].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'origin') return a.origin?.name.localeCompare(b.origin?.name);
    return 0;
  });

  const formattedStatus = (status) => {
    if (status === 'Alive') return '🟢 Alive';
    if (status === 'Dead') return '🔴 Dead';
    return '⚪ Unknown';
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
    setCharacters([]);
  };

  const handleSpeciesFilter = (event) => {
    setSpeciesFilter(event.target.value);
    setPage(1);
    setCharacters([]);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setSpeciesFilter('');
    setSortBy('name');
    setPage(1);
    setCharacters([]);
  };

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    document.body.classList.add('popup-active');
  };

  const handleClosePopup = () => {
    setSelectedCharacter(null);
    document.body.classList.remove('popup-active');
  };

  if (loading && characters.length === 0)
    return <p>{language === 'en' ? 'Loading...' : 'Wird geladen...'}</p>;
  if (error)
    return (
      <p>
        {language === 'en' ? `Error: ${error.message}` : `Fehler: ${error.message}`}
      </p>
    );

  return (
    <div className={`character-list ${selectedCharacter ? 'active' : ''}`}>
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
              <div className="view-text">
                {language === 'en' ? 'View Details' : 'Details anzeigen'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="character-popup active">
          <button className="close-btn" onClick={handleClosePopup}>
            X
          </button>
          <img
            src={`https://rickandmortyapi.com/api/character/avatar/${selectedCharacter.id}.jpeg`}
            alt={selectedCharacter.name}
            className="character-image"
          />
          <div className="character-info">
            <h3>{selectedCharacter.name}</h3>
            <p>
              <strong>Status:</strong> {formattedStatus(selectedCharacter.status)}
            </p>
            <p>
              <strong>Species:</strong> {selectedCharacter.species}
            </p>
            <p>
              <strong>Gender:</strong> {selectedCharacter.gender}
            </p>
            <p>
              <strong>Origin:</strong> {selectedCharacter.origin?.name || 'Unknown'}
            </p>
          </div>
        </div>
      )}

      <div className="popup-overlay"></div>

      <div ref={loader}></div>
    </div>
  );
};

export default CharacterList;