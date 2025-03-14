import React, { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLanguage } from "./LanguageContext";
import "./CharacterList.css";

const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
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
      }
    }
  }
`;

const CharacterList = () => {
  const { language } = useLanguage();
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const loader = useRef(null);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page, status: statusFilter, species: speciesFilter },
    onCompleted: (newData) => {
      if (newData?.characters?.results) {
        setCharacters((prev) => [...prev, ...newData.characters.results]);
      }
    },
  });

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    document.body.classList.add("popup-active");
  };

  const handleClosePopup = () => {
    setSelectedCharacter(null);
    document.body.classList.remove("popup-active");
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
    setStatusFilter(""); // Clear status filter
    setSpeciesFilter(""); // Clear species filter
    setSortBy("name"); // Reset sorting to 'name'
    setPage(1); // Reset to the first page
    setCharacters([]); // Clear the list of characters
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "origin")
      return a.origin?.name.localeCompare(b.origin?.name);
    return 0;
  });

  const formattedStatus = (status) => {
    if (status === "Alive") return "🟢 Alive";
    if (status === "Dead") return "🔴 Dead";
    return "⚪ Unknown";
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && data?.characters?.info?.next) {
        setPage((prev) => prev + 1);
        fetchMore({
          variables: { page: page + 1 },
        });
      }
    },
    [data, fetchMore, page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (loading && characters.length === 0)
    return <p>{language === "en" ? "Loading..." : "Wird geladen..."}</p>;
  if (error)
    return (
      <p>
        {language === "en"
          ? `Error: ${error.message}`
          : `Fehler: ${error.message}`}
      </p>
    );

  return (
    <div className={`character-list ${selectedCharacter ? "active" : ""}`}>
      {/* Filters Sidebar */}
      <div className="filters">
        <h2>{language === "en" ? "Filters" : "Filtern"}</h2>
        <select onChange={handleStatusFilter} value={statusFilter}>
          <option value="">{language === "en" ? "Status" : "Status"}</option>
          <option value="Alive">
            {language === "en" ? "Alive" : "Lebendig"}
          </option>
          <option value="Dead">{language === "en" ? "Dead" : "Tot"}</option>
          <option value="Unknown">{language === "en" ? "Unknown" : "Unbekannt"}</option>
        </select>
        <select onChange={handleSpeciesFilter} value={speciesFilter}>
          <option value="">{language === "en" ? "Species" : "Spezie"}</option>
          <option value="Human">
            {language === "en" ? "Human" : "Mensch"}
          </option>
          <option value="Alien">
            {language === "en" ? "Alien" : "Außerirdisch"}
          </option>
        </select>
        <select onChange={handleSortChange} value={sortBy}>
          <option value="name">
            {language === "en" ? "Sort by Name" : "Nach Name sortieren"}
          </option>
          <option value="origin">
            {language === "en" ? "Sort by Origin" : "Nach Herkunft sortieren"}
          </option>
        </select>
        <button onClick={handleClearFilters}>
          {language === "en" ? "Clear Filters" : "Filter zurücksetzen"}
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
              <div className="view-text">View Details</div> {/* View button */}
            </div>
          </div>
        ))}
      </div>

      {/* Popup and overlay */}
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
              <strong>Origin:</strong>{" "}
              {selectedCharacter.origin?.name || "Unknown"}
            </p>
          </div>
        </div>
      )}

      {/* Dark overlay behind the popup */}
      <div className="popup-overlay"></div>

      <div ref={loader}></div>
    </div>
  );
};

export default CharacterList;
