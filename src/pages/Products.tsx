// src/pages/Products.tsx

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products'; 
import type { Product } from '../data/products'; // FIX: Use 'import type' for interfaces
import './Products.css'; 

const Products: React.FC = () => {
  const { t } = useTranslation();
  // We can safely cast the initial state to the correct type
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');

  // Logic to filter products based on the active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return MOCK_PRODUCTS;
    }
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Available categories for the filter buttons
  const categories: Array<'all' | Product['category']> = ['all', 'honeyed', 'dry', 'seasonal'];

  // Component for a single product card
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="product-listing-card">
      <div className="card-image" style={{backgroundImage: `url(/assets/${product.image})`}}>
          {/* Placeholder for the image */}
      </div>
      <div className="card-content">
        <h3>{t(`products.${product.nameKey}`)}</h3> {/* 💡 FIX: Ensure we call 'products.' namespace if needed */}
        <p className="price">{product.price.toFixed(2)} {t('products.price_unit')}</p>
        <p className="description">{t(`products.${product.descriptionKey}`)}</p> {/* 💡 FIX: Ensure we call 'products.' namespace if needed */}
        <Link to={`/products/${product.slug}`} className="details-link">
          {t('home.discover_cta')}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="products-page">
      <h1 className="page-heading">{t('nav.products')}</h1>

      {/* Category Filter Bar */}
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

      {/* Product Grid */}
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