import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const StorySection = () => {
  const { language } = useLanguage();

  return (
    <div className="story-section">
      <div className="story-content">
        <div className="story-image">
          <img src={require('../../assets/logo.png')} alt="Rick and Morty" className="story-img" />
        </div>
        <div className="story-text">
          <h1>{language === 'en' ? 'Rick and Morty Story' : 'Rick und Morty Geschichte'}</h1>
          <p>
            {language === 'en'
              ? `Rick and Morty is a darkly comedic animated series that follows the misadventures of an eccentric, alcoholic scientist named Rick Sanchez and his good-hearted but easily distressed grandson, Morty Smith. Together, they embark on dangerous and often absurd adventures across the multiverse, encountering strange creatures, aliens, and mind-bending dimensions. The show blends humor, philosophy, and sci-fi to explore themes such as the meaning of life, free will, and the consequences of unchecked scientific experimentation. Rick's genius-level intellect allows him to create incredible gadgets and travel between dimensions, but his reckless behavior often puts Morty and the rest of their family in danger. Despite the chaos, the series delves into the complex relationship between Rick and Morty, highlighting themes of family, morality, and existentialism.`
              : `Rick und Morty ist eine düstere, humorvolle Animationsserie, die die Missgeschicke eines exzentrischen, alkoholkranken Wissenschaftlers namens Rick Sanchez und seines gutmütigen, aber leicht beunruhigten Enkels Morty Smith verfolgt. Zusammen erleben sie gefährliche und oft absurde Abenteuer im Multiversum, begegnen seltsamen Kreaturen, Außerirdischen und denkwürdigen Dimensionen. Die Show kombiniert Humor, Philosophie und Science-Fiction, um Themen wie den Sinn des Lebens, den freien Willen und die Konsequenzen unkontrollierter wissenschaftlicher Experimente zu erforschen. Ricks genialer Intellekt ermöglicht es ihm, unglaubliche Gadgets zu erschaffen und zwischen Dimensionen zu reisen, aber sein rücksichtsloses Verhalten bringt Morty und den Rest der Familie oft in Gefahr. Trotz des Chaos beleuchtet die Serie die komplexe Beziehung zwischen Rick und Morty und thematisiert Familie, Moral und Existenzialismus.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorySection;