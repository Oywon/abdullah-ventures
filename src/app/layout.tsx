import { ClerkProvider } from '@clerk/nextjs';
import '../index.css';
import ClientLayout from '../components/layout/ClientLayout';

export const metadata = {
  title: 'Abdullah Ventures',
  description: 'Digital B2B Trade Hub',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
