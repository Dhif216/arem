import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MOCK_PRODUCTS } from '../data/products';
import './Products.css';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const product = MOCK_PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="products-page">
        <h1 className="page-heading">{t('nav.products')}</h1>
        <p style={{ textAlign: 'center' }}>{t('products.not_found') || 'Product not found.'}</p>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/products" className="details-link">{t('products.back_to_products') || 'Back to products'}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1 className="page-heading">{t(`products.${product.nameKey}`)}</h1>

      <div className="product-detail">
        <div className="product-detail-image" style={{ backgroundImage: `url(${product.image})` }} />
        <div className="product-detail-content">
          <h2>{t(`products.${product.nameKey}`)}</h2>
          <p className="description">{t(`products.${product.descriptionKey}`)}</p>

          <div className="detail-meta">
            <div><strong>{t('products.category_label') || 'Category'}:</strong> {t(`categories.${product.category}`)}</div>
            <div><strong>{t('products.price_label') || 'Price'}:</strong> {product.price.toFixed(2)} {t('products.price_unit')}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              className="order-wa"
              href={`https://wa.me/21654477309?text=${encodeURIComponent(`${t('products.order_whatsapp_message', 'Bonjour, je souhaite commander')}: ${t(`products.${product.nameKey}`)} (${product.price.toFixed(2)} ${t('products.price_unit')})`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('products.order_whatsapp', 'Commander sur WhatsApp')}
            </a>
            <Link to="/contact" className="details-link">{t('home.contact_cta', 'اتصل بنا')}</Link>
          </div>

          <div style={{ marginTop: 20 }}>
            <Link to="/products" className="details-link">{t('products.back_to_products') || 'Back to products'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
