import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import './Products.css';

// Admin product interface (from AdminDashboard)
interface AdminProduct {
  id: string;
  name: {
    fr: string;
    tn: string;
  };
  description: {
    fr: string;
    tn: string;
  };
  price: number;
  category: string;
  image: string;
  featured?: boolean;
}

const Products: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Load products from localStorage if admin has made changes
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const adminProducts: AdminProduct[] = JSON.parse(savedProducts);
        // Convert admin products to display format
        const convertedProducts: Product[] = adminProducts.map(p => ({
          id: parseInt(p.id.replace('product-', '')) || Math.floor(Math.random() * 10000),
          slug: p.id,
          category: p.category as Product['category'],
          price: p.price,
          image: p.image,
          nameKey: p.id, // Use id as key for custom products
          descriptionKey: p.id + '_desc',
          name: p.name, // Store actual names for custom products
          description: p.description
        })) as Product[];
        setProducts(convertedProducts);
      } catch (e) {
        console.error('Error loading products from localStorage:', e);
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  const categories: Array<'all' | Product['category']> = ['all', 'honeyed', 'dry', 'seasonal'];

  const ProductCard: React.FC<{ product: Product & { name?: any, description?: any } }> = ({ product }) => {
    // For custom admin products, use the name object; for default products use translation keys
    const productName = product.name 
      ? (currentLang === 'tn' ? product.name.tn : product.name.fr)
      : t(`products.${product.nameKey}`);
    
    const productDesc = product.description
      ? (currentLang === 'tn' ? product.description.tn : product.description.fr)
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
