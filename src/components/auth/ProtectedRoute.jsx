import { useAuth } from '@clerk/react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePortalAccess } from '../../hooks/usePortalAccess';

const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

const loadingScreen = (
  <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
    <div className="text-center">
      <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-black">
        Loading Secure Session
      </p>
    </div>
  </div>
);

const ClerkProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isLoaded, userId } = useAuth();
  const location = useLocation();
  const { access, loading } = usePortalAccess();

  if (!isLoaded || loading) {
    return loadingScreen;
  }

  if (!userId) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requireAdmin && !['admin', 'super_admin'].includes(access?.role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  if (!hasClerk) {
    return children;
  }

  return <ClerkProtectedRoute requireAdmin={requireAdmin}>{children}</ClerkProtectedRoute>;
};

export default ProtectedRoute;
