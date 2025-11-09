import React from 'react';
import './FloatingWhatsApp.css';

const FloatingWhatsApp: React.FC = () => {
  const phone = '21654477309';
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      WA
    </a>
  );
};

export default FloatingWhatsApp;
