import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

// Google Analytics consent mode configuration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookie_consent');
    
    if (!consentStatus) {
      // Show banner if no consent recorded
      setShowBanner(true);
    } else if (consentStatus === 'accepted') {
      // Load analytics if previously accepted
      loadGoogleAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
    loadGoogleAnalytics();
    
    // Update consent mode
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
    
    // Deny consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  const loadGoogleAnalytics = () => {
    // Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
    const GA_MEASUREMENT_ID = 'G-94V9QRLYKP';
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
    
    // Set default consent to denied
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      wait_for_update: 500,
    });
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.gtag!('js', new Date());
      window.gtag!('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true, // Anonymize IP addresses for privacy
        cookie_flags: 'SameSite=None;Secure',
      });
      
      // Grant consent since user accepted
      window.gtag!('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    };
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner" role="dialog" aria-live="polite" aria-label={t('cookie.banner_label', 'Cookie consent')}>
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <strong>{t('cookie.heading', 'We use cookies')}</strong>
          <p>
            {t('cookie.message', 
              'We use cookies and similar technologies to improve your experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.'
            )}
            {' '}
            <Link to="/privacy" style={{ color: 'var(--accent-color, #f9c74f)', textDecoration: 'underline' }}>
              {t('cookie.privacy_link', 'Learn more')}
            </Link>
          </p>
        </div>
        <div className="cookie-consent-buttons">
          <button 
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
            aria-label={t('cookie.accept', 'Accept cookies')}
          >
            {t('cookie.accept', 'Accept')}
          </button>
          <button 
            className="cookie-btn cookie-btn-decline"
            onClick={handleDecline}
            aria-label={t('cookie.decline', 'Decline cookies')}
          >
            {t('cookie.decline', 'Decline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
