import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import './Products.css';
import { subscribeActiveProducts } from '../services/productsService';
import type { FirestoreProduct } from '../services/productsService';

// Admin product interface (from AdminDashboard)
// (Legacy admin product interface removed; Firestore schema now used.)

type UIProduct = {
  id: string | number;
  slug: string;
  category: Product['category'];
  price: number;
  image: string;
  name_fr?: string;
  name_tn?: string;
  desc_fr?: string;
  desc_tn?: string;
  isFirebase?: boolean;
  nameKey?: string;
  descriptionKey?: string;
};

const Products: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');
  const [products, setProducts] = useState<UIProduct[]>(MOCK_PRODUCTS as any);

  // Subscribe to Firebase products; fallback to mocked if none
  useEffect(() => {
    const unsub = subscribeActiveProducts((items: FirestoreProduct[]) => {
      if (items && items.length > 0) {
        const mapped: UIProduct[] = items.map(p => ({
          id: p.id!,
          slug: p.slug,
          category: (p.category as Product['category']) || 'other',
          price: p.price,
          image: p.image,
          name_fr: p.name_fr,
          name_tn: p.name_tn,
          desc_fr: p.desc_fr,
          desc_tn: p.desc_tn,
          isFirebase: true,
        }));
        setProducts(mapped);
      } else {
        setProducts(MOCK_PRODUCTS as any);
      }
    });
    return () => unsub();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  const categories: Array<'all' | Product['category']> = ['all', 'honeyed', 'dry', 'seasonal'];

  const ProductCard: React.FC<{ product: UIProduct }> = ({ product }) => {
    const productName = product.isFirebase
      ? (currentLang === 'tn' ? (product.name_tn || product.name_fr) : (product.name_fr || product.name_tn))
      : t(`products.${product.nameKey}`);

    const productDesc = product.isFirebase
      ? (currentLang === 'tn' ? (product.desc_tn || product.desc_fr) : (product.desc_fr || product.desc_tn))
      : t(`products.${product.descriptionKey}`);

    return (
      <div className="product-listing-card">
        <div className="card-image">
          <img src={product.image} alt={productName} loading="lazy" />
        </div>
        <div className="card-content">
          <h3>{productName}</h3>
          <p className="price">{product.price.toFixed(2)} {t('products.price_unit')}</p>
          <p className="description">{productDesc}</p>
          <Link to={`/products/${product.slug}`} className="details-link">
            {t('home.discover_cta')}
          </Link>
          {/* WhatsApp order CTA */}
          <a
            className="order-wa"
            href={`https://wa.me/21654477309?text=${encodeURIComponent(`${t('products.order_whatsapp_message', 'Bonjour, je souhaite commander')}: ${productName} (${product.price.toFixed(2)} ${t('products.price_unit')})`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('products.order_whatsapp', 'Commander sur WhatsApp')}
          </a>
        </div>
      </div>
    );
  };

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
