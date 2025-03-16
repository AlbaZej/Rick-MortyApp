import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MAIN_CHARACTERS } from '../../services/queries';
import { useLanguage } from '../../context/LanguageContext';
import Banner from '../../components/Banner/Banner';
import StorySection from '../../components/StorySection/StorySection';
import CharacterCards from '../../components/CharacterCards/CharacterCards';
import './MainPage.css';

const MainPage = () => {
  const { language } = useLanguage();
  const { data, loading, error } = useQuery(GET_MAIN_CHARACTERS);

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error loading characters: {error.message}</p>;

  const mainCharacters = data.characters.results.slice(0, 4);

  return (
    <div className="main-page">
      <Banner />
      <StorySection />
      <div className="characters-section">
        <h2>{language === 'en' ? 'Main Characters' : 'Hauptfiguren'}</h2>
        <CharacterCards characters={mainCharacters} showViewDetails={false} /> 
      </div>
    </div>
  );
};

export default MainPage;