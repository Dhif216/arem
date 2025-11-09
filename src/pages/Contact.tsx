import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; // <-- make sure this path matches your setup
import './Contact.css'; 

interface ProductOption {
  name: string;
  name_tn: string;
  price: number;
}

// All products list
const products: ProductOption[] = [
  { name: 'Makroudh', name_tn: 'مقروض', price: 28 },
  { name: 'Zlabia', name_tn: 'زلابية', price: 15 },
  { name: 'Samsa', name_tn: 'سمسة', price: 38 },
  { name: 'Ghraiba', name_tn: 'غريبة', price: 25 },
  { name: 'Borek Hlou', name_tn: 'بوريك حلو', price: 35 },
  { name: 'Kaab Ghazal', name_tn: 'كعب غزال', price: 40 },
  { name: 'Ftayer bel 3assel', name_tn: 'فطاير بالعسل', price: 8 },
  { name: 'Kaak Anber', name_tn: 'كعك عنبر', price: 32 },
  { name: 'Bastila Hlowa', name_tn: 'بسطيلة حلوة', price: 45 },
  { name: 'Makhbadh', name_tn: 'مخبذ', price: 30 },
  { name: 'Samsa Dattes', name_tn: 'سمسة بالتمر', price: 34 },
  { name: 'Zlabia Amandes', name_tn: 'زلابية باللوز', price: 20 },
  { name: 'Ftira bel 3assel', name_tn: 'فتيرة بالعسل', price: 10 },
  { name: 'Hlou Semid', name_tn: 'حلو سميد', price: 18 },
  { name: 'Borek Amandes', name_tn: 'بوريك لوز', price: 38 },
  { name: 'Kaab Ghazal Amandes', name_tn: 'كعب غزال لوز', price: 42 },
  { name: 'Ghraiba Semid', name_tn: 'غريبة سميد', price: 22 },
  { name: 'Ftira Hlou', name_tn: 'فتيرة حلوة', price: 12 },
  { name: 'Makroudh 3assel', name_tn: 'مقروض بالعسل', price: 30 },
  { name: 'Kaak Zohra', name_tn: 'كعك زهرة', price: 28 },
];

const Contact: React.FC = () => {
  const { t } = useTranslation();

  // detect current language
  const currentLang = i18n.language.split('-')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
    product: products[0].name,
    price: products[0].price,
  });

  // handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'product') {
      const selected = products.find(p => p.name === value || p.name_tn === value);
      setFormData(prev => ({ ...prev, product: value, price: selected?.price || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // submit handler (WhatsApp)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the new store number; sanitize for wa.me (no leading 00)
    const whatsappNumber = '21654477309';
    const message = `طلب جديد:
الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
العنوان: ${formData.address}
المنتج: ${formData.product}
السعر: ${formData.price} TND
رسالة: ${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contact-page">
      <h1 className="page-heading">{t('nav.contact')}</h1>
      <p className="sub-heading">{t('contact.sub_heading')}</p>

      <div className="contact-container">
        {/* Contact Form */}
        <section className="contact-form-section">
          <h2>{t('contact.form_title')}</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            
            <div className="form-group">
              <label htmlFor="name">{t('contact.form_name_label')}</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.form_email_optional_label') || t('contact.form_email_label')}</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="address">
                {t('contact.form_address_label') || (currentLang === 'tn' ? 'العنوان' : 'Adresse de Livraison')}
              </label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="product">
                {t('contact.form_product_label') || (currentLang === 'tn' ? 'اختر المنتج' : 'Choisissez un Produit')}
              </label>
              <select id="product" name="product" value={formData.product} onChange={handleChange}>
                {products.map((p) => (
                  <option key={p.name} value={currentLang === 'tn' ? p.name_tn : p.name}>
                    {currentLang === 'tn' ? p.name_tn : p.name} - {p.price} TND
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.form_message_label')}</label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="submit-button">
              {t('contact.form_submit_button')}
            </button>
          </form>
        </section>

        {/* Location & Info */}
        <section className="contact-info-section">
          <h2>{t('contact.info_title')}</h2>
          <div className="info-details">
            <p><strong>{t('footer.address')}:</strong> Rue Costa rica 5120 11 cite erriadh sousse 4023</p>
            <p><strong>{t('footer.phone')}:</strong> 0021654477309</p>
            <p><strong>{t('footer.email')}:</strong> contact@tunisiansweets.tn</p>
            <p><strong>{t('footer.hours_label')}:</strong> {t('footer.hours_value')}</p>
          </div>

          <div className="map-placeholder">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d491.09139638512784!2d10.59840924948169!3d35.796846738498544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scity%20eriadh%20sousse!5e1!3m2!1sen!2sfi!4v1762624119742!5m2!1sen!2sfi"
              title="Tunisian Sweets Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
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
