import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  // Example dummy data for contact and social media
  const contactInfo = {
    address: "24 Rue de la Pâtisserie, Tunis, Tunisie",
    phone: "+216 98 765 432",
    email: "contact@tunisiansweets.tn",
    hours: t('footer.hours_value'),
  };

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: 'FB' },
    { name: 'Instagram', url: '#', icon: 'IG' },
    { name: 'WhatsApp', url: '#', icon: 'WA' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* 1. Brand/Slogan Section */}
        <div className="footer-section brand-section">
          <h3>{t('site.title')}</h3>
          <p className="slogan">{t('footer.slogan') || 'Your Daily Dose of Tunisian Delight.'}</p>
        </div>

        {/* 2. Navigation Links */}
        <div className="footer-section nav-section">
          <h4>{t('nav.products')}</h4>
          <ul>
            <li><Link to="/products/baklawa">Baklawa</Link></li>
            <li><Link to="/products/makroudh">Makroudh</Link></li>
            <li><Link to="/products/kaak">Ka'ak</Link></li>
          </ul>
        </div>
        
        {/* 3. Contact Information */}
        <div className="footer-section contact-section">
          <h4>{t('nav.contact')}</h4>
          <p>{t('footer.address')}: {contactInfo.address}</p>
          <p>{t('footer.phone')}: {contactInfo.phone}</p>
          <p>{t('footer.email')}: {contactInfo.email}</p>
          <p>{t('footer.hours_label')}: {contactInfo.hours}</p>
        </div>

        {/* 4. Social Media */}
        <div className="footer-section social-section">
          <h4>{t('footer.follow_us')}</h4>
          <div className="social-icons">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <span className="icon-placeholder">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('site.title')}. {t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;