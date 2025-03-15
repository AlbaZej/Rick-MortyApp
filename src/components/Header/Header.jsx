import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitchLink from '../LanguageSwitchLink/LanguageSwitchLink';
import logo from '../../assets/logo.png'; 

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Rick and Morty Logo" className="logo-img" />
        </Link>
      </div>
      <nav className="app-menu">
        <ul>
          <li>
            <LanguageSwitchLink />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;