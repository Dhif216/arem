import React, { useState } from 'react'; // 💡 Import useState
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  // 💡 STATE: Track if the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // 💡 Close menu when language is switched
    setIsMenuOpen(false); 
  };
  
  // 💡 TOGGLE: Function to open/close the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const currentLang = i18n.language;

  return (
    <header className="header">
      
      {/* 🚀 Site Title / Logo */}
      <div className="header-title">
        {/* Close menu when clicking logo */}
        <Link to="/" onClick={closeMenu}><h1>{t('site.title')}</h1></Link> 
      </div>

      {/* 🌐 Language Switcher (Remains outside the menu for quick access) */}
      <div className="language-switcher">
        {/* ... buttons remain the same ... */}
        <button
          className={`lang-button ${currentLang === 'fr' ? 'active' : ''}`}
          onClick={() => changeLanguage('fr')}
          aria-label="Switch to French"
        >
          FR
        </button>
        <button
          className={`lang-button ${currentLang === 'tn' ? 'active' : ''}`}
          onClick={() => changeLanguage('tn')}
          aria-label="Switch to Tunisian"
        >
          TN
        </button>
      </div>
      
      {/* 🍔 Hamburger Button (Visible only on mobile) */}
      <button 
        className="hamburger-button" 
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
        aria-label={isMenuOpen ? t('nav.close_menu', 'Close menu') : t('nav.open_menu', 'Open menu')}
      >
        {isMenuOpen ? '✕' : '☰'} 
      </button>

      {/* 🧭 Navigation: Conditionally rendered/styled based on state */}
      <nav 
        id="mobile-nav" 
        className={`header-nav ${isMenuOpen ? 'open' : ''}`}
      >
        <ul>
          {/* Close menu when a link is clicked */}
          <li><Link to="/" onClick={closeMenu}>{t('nav.home')}</Link></li>
          <li><Link to="/products" onClick={closeMenu}>{t('nav.products')}</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>{t('nav.contact')}</Link></li>
        </ul>
      </nav>
      
    </header>
  );
};

export default Header;