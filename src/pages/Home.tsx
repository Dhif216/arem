import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home: React.FC = () => {
  const { t } = useTranslation();

  // Defined External and Public Paths
  const base = import.meta.env.BASE_URL || '/';
  const AssetUrls = {
    // Preferred location: commit your file at public/media/ad.mp4 so it gets deployed on every build
    heroVideoWebm: `${base}media/ad.webm`,
    heroVideoMp4: `${base}media/ad.mp4`,
    // Temporary fallback if you manually uploaded to gh-pages root via the web UI
    heroVideoRootMp4: `${base}ad.mp4`,

    // External placeholder for poster (replace with your actual URL)
    heroPoster: 'https://i.redd.it/our-eid-pastries-look-very-aesthetically-pleasing-i-gotta-v0-o4bq1ovhfsw81.jpg?width=700&format=pjpg&auto=webp&s=6cd456d5826614c6655cf6c728370c9910773159', 

    // External Image URLs for featured products
    kaakWarka: 'https://patisseriemasmoudi.fr/cdn/shop/products/Kaak-Warka_a41870b1-855c-4586-870e-7a0ba791cdb4_750x810.png?v=1757070977',
    baklawa: 'https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFrbGF2YXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
    makroudh: 'https://masmoudi.tn/cdn/shop/products/makroudh-asmar-3_675acffb-ef0b-4479-a188-46bdcf5167d5_grande.png?v=1682589587',
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Try to kickstart autoplay once metadata is loaded
    const onLoaded = () => {
      v.play().catch(() => {
        // Autoplay might be blocked; keep poster visible silently
      });
    };
    v.addEventListener('loadeddata', onLoaded);
    return () => v.removeEventListener('loadeddata', onLoaded);
  }, []);

  // Firebase featured products subscription
  const [featured, setFeatured] = useState<any[]>([]);
  useEffect(() => {
    // Lazy import to avoid initial bundle weight
    import('../services/productsService').then(mod => {
      const unsub = mod.subscribeActiveProducts(items => {
        const onlyFeatured = items.filter(p => p.featured).slice(0,3);
        setFeatured(onlyFeatured);
      });
      return () => unsub();
    });
  }, []);

  return (
    <div className="home-page">
      
      {/* 1. Hero Section: Video Background */}
      <section className="hero-section">
        <video
          ref={videoRef}
          className="hero-video-background"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={AssetUrls.heroPoster}
          src={AssetUrls.heroVideoMp4}
          onError={() => {
            const v = videoRef.current;
            if (v && v.src !== AssetUrls.heroVideoRootMp4) {
              v.src = AssetUrls.heroVideoRootMp4;
              v.load();
              v.play().catch(() => {});
            }
          }}
        >
          {/* Try WebM first, then MP4 from /public/media, then a last-chance root /ad.mp4 */}
          <source src={AssetUrls.heroVideoWebm} type="video/webm" />
          <source src={AssetUrls.heroVideoMp4} type="video/mp4" />
          <source src={AssetUrls.heroVideoRootMp4} type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>{t('site.welcome_message')}</h1>
          <p className="slogan-text">{t('footer.slogan')}</p>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/products" className="cta-button">
              {t('home.view_products_cta')}
            </Link>
            <Link to="/contact" className="cta-button cta-outline">
              {t('home.contact_cta', 'اتصل بنا')}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Products Section (Dynamic from Firebase if available) */}
      <section className="featured-products">
        <h2>{t('home.featured_heading')}</h2>
        <div className="product-grid">
          {featured.length > 0 ? (
            featured.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-image">
                  <img src={p.image} alt={p.name_fr} loading="lazy" />
                </div>
                <h3>{p.name_fr}</h3>
                <p className="description">{p.desc_fr?.slice(0,120)}{p.desc_fr && p.desc_fr.length>120 ? '…' : ''}</p>
                <Link to={`/products/${p.slug}`} className="product-link">{t('home.discover_cta')}</Link>
              </div>
            ))
          ) : (
            <>
              <div className="product-card">
                <div className="product-image">
                  <img src={AssetUrls.kaakWarka} alt={t('products.product_kaak_warka_name')} loading="lazy" />
                </div>
                <h3>{t('products.product_kaak_warka_name')}</h3>
                <p className="description">{t('products.product_kaak_warka_desc')}</p>
                <Link to="/products/kaak-warka" className="product-link">{t('home.discover_cta')}</Link>
              </div>
              <div className="product-card">
                <div className="product-image">
                  <img src={AssetUrls.baklawa} alt={t('products.product_baklawa_name')} loading="lazy" />
                </div>
                <h3>{t('products.product_baklawa_name')}</h3>
                <p className="description">{t('products.product_baklawa_desc')}</p>
                <Link to="/products/baklawa" className="product-link">{t('home.discover_cta')}</Link>
              </div>
              <div className="product-card">
                <div className="product-image">
                  <img src={AssetUrls.makroudh} alt={t('products.product_makroudh_name')} loading="lazy" />
                </div>
                <h3>{t('products.product_makroudh_name')}</h3>
                <p className="description">{t('products.product_makroudh_desc')}</p>
                <Link to="/products/makroudh" className="product-link">{t('home.discover_cta')}</Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* 3. Service Explanation Section */}
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

      {/* 4. SEO-Rich Content Section */}
      <section className="seo-content" style={{ 
        padding: '60px 20px', 
        maxWidth: '1000px', 
        margin: '0 auto',
        backgroundColor: 'var(--background-light)',
        lineHeight: '1.8'
      }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          color: 'var(--primary-color)', 
          marginBottom: '20px',
          textAlign: 'center' 
        }}>
          {t('seo.about_title', 'حلويات شابي - تقاليد الحلويات التونسية الأصيلة في سوسة')}
        </h2>
        
        <div style={{ textAlign: 'justify', color: '#333' }}>
          <p style={{ marginBottom: '15px' }}>
            {t('seo.paragraph1', 
              'حلويات شابي هي وجهتك المفضلة للحلويات التونسية التقليدية في مدينة سوسة. نحن نفخر بتقديم أجود أنواع الحلويات المصنوعة يدوياً باستخدام وصفات عائلية أصيلة تم توارثها عبر الأجيال. من المقروض الشهي إلى البقلاوة الغنية بالمكسرات، كل قطعة حلوى نصنعها تعكس التزامنا بالجودة والأصالة.'
            )}
          </p>
          
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-color)', margin: '25px 0 15px' }}>
            {t('seo.products_title', 'تشكيلة واسعة من الحلويات التونسية')}
          </h3>
          
          <p style={{ marginBottom: '15px' }}>
            {t('seo.paragraph2',
              'نقدم مجموعة متنوعة من الحلويات التي تلبي جميع الأذواق والمناسبات. تشمل تشكيلتنا الحلويات المعسلة مثل البقلاوة والزلابية والصمصة، والحلويات الجافة مثل الغريبة وكعك الورقة، بالإضافة إلى الحلويات الموسمية الخاصة بالأعياد والمناسبات. كل منتج يتم إعداده بعناية فائقة باستخدام أجود المكونات الطبيعية.'
            )}
          </p>
          
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-color)', margin: '25px 0 15px' }}>
            {t('seo.quality_title', 'جودة لا تضاهى ونكهات أصيلة')}
          </h3>
          
          <p style={{ marginBottom: '15px' }}>
            {t('seo.paragraph3',
              'في حلويات شابي، نستخدم فقط أفضل المكونات - من اللوز الفاخر والفستق الحلبي إلى العسل الطبيعي وماء الزهر الأصلي. نحن نؤمن بأن الحلويات التونسية التقليدية تستحق أن تُصنع بالطريقة الصحيحة، بدون إضافات صناعية أو مواد حافظة. كل يوم نقوم بتحضير منتجات طازجة لضمان أفضل مذاق وجودة لعملائنا الكرام.'
            )}
          </p>
          
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-color)', margin: '25px 0 15px' }}>
            {t('seo.order_title', 'طلب سهل وتوصيل سريع في سوسة')}
          </h3>
          
          <p style={{ marginBottom: '15px' }}>
            {t('seo.paragraph4',
              'نوفر لكم خدمة طلب سهلة ومريحة عبر واتساب، حيث يمكنكم اختيار الحلويات المفضلة لديكم والحصول على توصيل سريع في جميع أنحاء سوسة. سواء كنتم تحضرون لمناسبة خاصة أو ترغبون في الاستمتاع بحلوى تقليدية لذيذة، فريقنا جاهز لخدمتكم. نقبل الدفع عند الاستلام لراحتكم.'
            )}
          </p>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Link to="/products" className="cta-button" style={{ display: 'inline-block', marginRight: '10px' }}>
              {t('home.view_all_products', 'تصفح جميع المنتجات')}
            </Link>
            <Link to="/contact" className="cta-button cta-outline" style={{ display: 'inline-block' }}>
              {t('home.order_now', 'اطلب الآن')}
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;