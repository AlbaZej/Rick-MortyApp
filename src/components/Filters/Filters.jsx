import React from 'react';

const Filters = ({ onStatusFilter, onSpeciesFilter, onSortChange, onClearFilters, statusFilter, speciesFilter, sortBy, language }) => {
  return (
    <div className="filters">
      <h2>{language === 'en' ? 'Filters' : 'Filtern'}</h2>
      <select onChange={onStatusFilter} value={statusFilter}>
        <option value="">{language === 'en' ? 'Status' : 'Status'}</option>
        <option value="Alive">{language === 'en' ? 'Alive' : 'Lebendig'}</option>
        <option value="Dead">{language === 'en' ? 'Dead' : 'Tot'}</option>
        <option value="Unknown">{language === 'en' ? 'Unknown' : 'Unbekannt'}</option>
      </select>
      <select onChange={onSpeciesFilter} value={speciesFilter}>
        <option value="">{language === 'en' ? 'Species' : 'Spezie'}</option>
        <option value="Human">{language === 'en' ? 'Human' : 'Mensch'}</option>
        <option value="Alien">{language === 'en' ? 'Alien' : 'Außerirdisch'}</option>
      </select>
      <select onChange={onSortChange} value={sortBy}>
        <option value="name">{language === 'en' ? 'Sort by Name' : 'Nach Name sortieren'}</option>
        <option value="origin">{language === 'en' ? 'Sort by Origin' : 'Nach Herkunft sortieren'}</option>
      </select>
      <button onClick={onClearFilters}>
        {language === 'en' ? 'Clear Filters' : 'Filter zurücksetzen'}
      </button>
    </div>
  );
};

export default Filters;