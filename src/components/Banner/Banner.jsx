import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Banner = () => {
  const { language } = useLanguage();

  return (
    <div className="banner-container">
      <div className="text-section">
        <h1>{language === 'en' ? 'RICK AND MORTY' : 'RICK UND MORTY'}</h1>
      </div>
      <div className="video-section">
        <video
          src={require('../../assets/videos/Portal2.mov')}
          type="video/mp4"
          autoPlay
          loop
          muted
          className="banner-video"
        />
      </div>
    </div>
  );
};

export default Banner;