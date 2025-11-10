import React, { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
// 1. Import Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 2. Import ALL structural components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home'; // Home page loads immediately

// 💡 CODE SPLITTING: Dynamically import non-critical pages
const LazyProducts = lazy(() => import('./pages/Products'));
const LazyProductDetail = lazy(() => import('./pages/ProductDetail'));
const LazyContact = lazy(() => import('./pages/Contact'));
const LazyPrivacy = lazy(() => import('./pages/Privacy'));
const LazyAdminLogin = lazy(() => import('./pages/AdminLogin'));
const LazyAdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// 2.5 Import Protected Route component
import ProtectedRoute from './components/ProtectedRoute';

// 3. Import global CSS
import './App.css';

const App: React.FC = () => {
  const { i18n } = useTranslation(); 
  
  // 4. RTL and Language Setting Logic
  useEffect(() => {
    const isRTL = i18n.language === 'tn'; 
    
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    
  }, [i18n.language]);

  // Simple, lightweight loading fallback
  const LoadingFallback = (
    <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '50vh' }}>
      <div style={{ 
        display: 'inline-block',
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid var(--accent-color, #f9c74f)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
            <Route path="/privacy" element={<LazyPrivacy />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<LazyAdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <LazyAdminDashboard />
              </ProtectedRoute>
            } />
            
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
      <CookieConsent />
    </Router>
  );
};

// Export the App component
export default App;