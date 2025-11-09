import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  // Example dummy data for contact and social media
  const contactInfo = {
    address: "Rue Costa rica 5120 11 cite erriadh sousse 4023",
    phone: "0021654477309",
    email: "contact@tunisiansweets.tn",
    hours: t('footer.hours_value'),
  };

  // ✅ Updated Social Links with real URLs
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/emel.mohamed.948496', icon: 'FB' },
    { name: 'Instagram', url: 'https://www.instagram.com/fadhila.chebbi.9/', icon: 'IG' },
  { name: 'WhatsApp', url: 'https://wa.me/21654477309', icon: 'WA' },
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
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                <span className="icon-placeholder">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {t('site.title')}. {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
