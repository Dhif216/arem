import React, { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
// 1. Import Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import ALL structural components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'; // Home page loads immediately

// 💡 CODE SPLITTING: Dynamically import non-critical pages
const LazyProducts = lazy(() => import('./pages/Products'));
const LazyContact = lazy(() => import('./pages/Contact'));

// 3. Import global CSS
import './App.css'; 

const App: React.FC = () => {
  const { t, i18n } = useTranslation(); 
  
  // 4. RTL and Language Setting Logic
  useEffect(() => {
    const isRTL = i18n.language === 'tn'; 
    
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    
  }, [i18n.language]);

  // Define a simple loading component using a translated key
  const LoadingFallback = (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Fetches 'loading_text' from JSON files */}
      <h2>{t('loading_text') || 'Loading Page...'}</h2>
    </div>
  );

  return (
    // 5. 💡 FIX: Set BASENAME for GitHub Pages deployment
    <Router basename="/arem"> 
      <Header />
      
      <main className="content">
        {/* WRAP THE LAZY ROUTES IN SUSPENSE */}
        <Suspense fallback={LoadingFallback}> 
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* USE LAZY COMPONENTS */}
            <Route path="/products" element={<LazyProducts />} />
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
    </Router>
  );
};

// Export the App component
export default App;