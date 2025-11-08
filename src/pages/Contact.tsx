import React from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css'; 

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('contact.form_submission_alert')); 
  };

  return (
    <div className="contact-page">
      <h1 className="page-heading">{t('nav.contact')}</h1>
      <p className="sub-heading">{t('contact.sub_heading')}</p>

      <div className="contact-container">
        
        {/* Contact Form Section (Left side on desktop) */}
        <section className="contact-form-section">
          <h2>{t('contact.form_title')}</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{t('contact.form_name_label')}</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.form_email_label')}</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.form_message_label')}</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="submit-button">
              {t('contact.form_submit_button')}
            </button>
          </form>
        </section>

        {/* Location & Info Section (Right side on desktop) */}
        <section className="contact-info-section">
          <h2>{t('contact.info_title')}</h2>
          <div className="info-details">
            <p><strong>{t('footer.address')}:</strong> 24 Rue de la Pâtisserie, Tunis, Tunisie</p>
            <p><strong>{t('footer.phone')}:</strong> +216 98 765 432</p>
            <p><strong>{t('footer.email')}:</strong> contact@tunisiansweets.tn</p>
            <p><strong>{t('footer.hours_label')}:</strong> {t('footer.hours_value')}</p>
          </div>
          
          {/* Map Embed */}
          <div className="map-placeholder">
            {/* The embedded Google Maps iframe */}
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d491.09139638512784!2d10.59840924948169!3d35.796846738498544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scity%20eriadh%20sousse!5e1!3m2!1sen!2sfi!4v1762624119742!5m2!1sen!2sfi" 
                title="Tunisian Sweets Location"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;