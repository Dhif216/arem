import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home: React.FC = () => {
  const { t } = useTranslation();

  // Defined External and Public Paths
  const AssetUrls = {
    // 💡 Local public path for the video (requires ad.mp4 in public/ folder)
    adVideo: '/ad.mp4', 
    // External placeholder for poster (replace with your actual URL)
    heroPoster: 'https://i.redd.it/our-eid-pastries-look-very-aesthetically-pleasing-i-gotta-v0-o4bq1ovhfsw81.jpg?width=700&format=pjpg&auto=webp&s=6cd456d5826614c6655cf6c728370c9910773159', 
    // External Image URLs for featured products
    kaakWarka: 'https://patisseriemasmoudi.fr/cdn/shop/products/Kaak-Warka_a41870b1-855c-4586-870e-7a0ba791cdb4_750x810.png?v=1757070977',
    baklawa: 'https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFrbGF2YXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
    makroudh: 'https://masmoudi.tn/cdn/shop/products/makroudh-asmar-3_675acffb-ef0b-4479-a188-46bdcf5167d5_grande.png?v=1682589587',
  };

  return (
    <div className="home-page">
      
      {/* 1. Hero Section: Video Background */}
      <section className="hero-section">
        <video 
          className="hero-video-background" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster={AssetUrls.heroPoster} 
        >
          <source src={AssetUrls.adVideo} type="video/mp4" /> 
        </video>

        <div className="hero-content">
          <h1>{t('site.welcome_message')}</h1>
          <p className="slogan-text">{t('footer.slogan')}</p>
          
          <Link to="/products" className="cta-button">
            {t('home.view_products_cta')} 
          </Link>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="featured-products">
        <h2>{t('home.featured_heading')}</h2>
        <div className="product-grid">
          
          {/* Product Card 1: Ka'ak Warka */}
          <div className="product-card">
            <div className="product-image" style={{backgroundImage: `url(${AssetUrls.kaakWarka})`}}></div>
            <h3>{t('products.product_kaak_warka_name')}</h3>
            <p className="description">{t('products.product_kaak_warka_desc')}</p>
            <Link to="/products/kaak-warka" className="product-link">{t('home.discover_cta')}</Link>
          </div>
          
          {/* Product Card 2: Baklawa */}
          <div className="product-card">
            <div className="product-image" style={{backgroundImage: `url(${AssetUrls.baklawa})`}}></div>
            <h3>{t('products.product_baklawa_name')}</h3>
            <p className="description">{t('products.product_baklawa_desc')}</p>
            <Link to="/products/baklawa" className="product-link">{t('home.discover_cta')}</Link>
          </div>
          
          {/* Product Card 3: Makroudh */}
          <div className="product-card">
            <div className="product-image" style={{backgroundImage: `url(${AssetUrls.makroudh})`}}></div>
            <h3>{t('products.product_makroudh_name')}</h3>
            <p className="description">{t('products.product_makroudh_desc')}</p>
            <Link to="/products/makroudh" className="product-link">{t('home.discover_cta')}</Link>
          </div>

        </div>
      </section>
      
      {/* 3. 💡 RESTORED: Service Explanation Section */}
      <section className="service-explanation">
        <h2>{t('service.heading')}</h2>
        <div className="service-steps">
          
          <div className="step-card">
            <div className="step-icon">📞 / 📝</div>
            <h3>{t('service.step1_title')}</h3>
            <p>{t('service.step1_desc')}</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">🛵</div>
            <h3>{t('service.step2_title')}</h3>
            <p>{t('service.step2_desc')}</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon">💰</div>
            <h3>{t('service.step3_title')}</h3>
            <p>{t('service.step3_desc')}</p>
          </div>
          
        </div>
      </section>
      
    </div>
  );
};

export default Home;