import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import WhatsAppButton from './components/layout/WhatsAppButton';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Nodes from './pages/Nodes';
import Signup from './pages/Signup';
import Tracking from './pages/Tracking';

function AppLayout() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);
  const showFooter = isHomeRoute;
  const isPortalRoute = ['/dashboard', '/tracking', '/nodes', '/admin'].includes(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      {!isAuthRoute && (
        <Navbar
          isHomeRoute={isHomeRoute}
          showSidebarToggle={isPortalRoute}
          onSidebarToggle={() => setIsSidebarOpen(true)}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute requireAdmin>
              <Admin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute>
              <Dashboard isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/tracking"
          element={(
            <ProtectedRoute>
              <Tracking isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/nodes"
          element={(
            <ProtectedRoute>
              <Nodes isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </ProtectedRoute>
          )}
        />
      </Routes>
      {showFooter && <Footer />}
      {!isAuthRoute && <WhatsAppButton />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
