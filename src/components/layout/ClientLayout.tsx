'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function ClientLayout({ children }) {
  const pathname = usePathname() || '';
  const isHomeRoute = pathname === '/';
  const isAuthRoute = ['/login', '/signup', '/onboarding'].includes(pathname);
  const showFooter = isHomeRoute;
  const isPortalRoute =
    ['/dashboard', '/request', '/tracking', '/history', '/users', '/nodes'].includes(pathname);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      {!isAuthRoute && (
        <Navbar
          isHomeRoute={isHomeRoute}
          showSidebarToggle={isPortalRoute}
          onSidebarToggle={() => setIsSidebarOpen(true)}
        />
      )}
      {children}
      {showFooter && <Footer />}
      {!isAuthRoute && <WhatsAppButton />}
    </>
  );
}
