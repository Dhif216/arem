import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import './Products.css';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const categories: Array<'all' | Product['category']> = ['all', 'honeyed', 'dry', 'seasonal'];

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="product-listing-card">
      <div className="card-image">
        <img src={product.image} alt={t(`products.${product.nameKey}`)} loading="lazy" />
      </div>
      <div className="card-content">
        <h3>{t(`products.${product.nameKey}`)}</h3>
        <p className="price">{product.price.toFixed(2)} {t('products.price_unit')}</p>
        <p className="description">{t(`products.${product.descriptionKey}`)}</p>
        <Link to={`/products/${product.slug}`} className="details-link">
          {t('home.discover_cta')}
        </Link>
        {/* WhatsApp order CTA */}
        <a
          className="order-wa"
          href={`https://wa.me/21654477309?text=${encodeURIComponent(`${t('products.order_whatsapp_message', 'Bonjour, je souhaite commander')}: ${t(`products.${product.nameKey}`)} (${product.price.toFixed(2)} ${t('products.price_unit')})`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('products.order_whatsapp', 'Commander sur WhatsApp')}
        </a>
      </div>
    </div>
  );

  return (
    <div className="products-page">
      <h1 className="page-heading">{t('nav.products')}</h1>

      <div className="category-filter-bar">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      <div className="product-list-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">{t('products.no_items') || 'No sweets found in this category.'}</p>
        )}
      </div>
    </div>
  );
};

export default Products;
