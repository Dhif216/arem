import React, { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
// 1. Import Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import ALL structural components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home'; // Home page loads immediately

// 💡 CODE SPLITTING: Dynamically import non-critical pages
const LazyProducts = lazy(() => import('./pages/Products'));
const LazyProductDetail = lazy(() => import('./pages/ProductDetail'));
const LazyContact = lazy(() => import('./pages/Contact'));

// 3. Import global CSS
import './App.css'; 
import Skeleton from './components/Skeleton';

const App: React.FC = () => {
  const { i18n } = useTranslation(); 
  
  // 4. RTL and Language Setting Logic
  useEffect(() => {
    const isRTL = i18n.language === 'tn'; 
    
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    
  }, [i18n.language]);

  // Define a simple loading component using a translated key
  const LoadingFallback = (
    <div style={{ padding: '30px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: '20px' }}>
        <Skeleton height={40} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
              <Skeleton height={160} />
              <Skeleton height={20} marginTop={10} />
              <Skeleton height={14} marginTop={6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Header />
      
      <main className="content">
        {/* WRAP THE LAZY ROUTES IN SUSPENSE */}
        <Suspense fallback={LoadingFallback}> 
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* USE LAZY COMPONENTS */}
            <Route path="/products" element={<LazyProducts />} />
            <Route path="/products/:slug" element={<LazyProductDetail />} />
            <Route path="/contact" element={<LazyContact />} />
            
            {/* Fallback route for 404 pages */}
            <Route path="*" element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Page Not Found (404)</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      
      <Footer /> 
      <FloatingWhatsApp />
    </Router>
  );
};

// Export the App component
export default App;