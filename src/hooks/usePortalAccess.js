import { useEffect, useState } from 'react';
import { useUser } from '@clerk/react';
import { getUserAccess } from '../lib/accessControl';

const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export const usePortalAccess = () => {
  const { user, isLoaded } = hasClerk ? useUser() : { user: null, isLoaded: true };
  const [access, setAccess] = useState(null);
  const [loading, setLoading] = useState(hasClerk);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadAccess = async () => {
      if (!hasClerk) {
        setAccess({
          role: 'super_admin',
          companyId: '',
          companyName: 'Abdullah Ventures',
          email: import.meta.env.VITE_PARTNER_DEMO_EMAIL || 'mdsalmantd5@gmail.com',
        });
        setLoading(false);
        return;
      }

      if (!isLoaded) {
        return;
      }

      setLoading(true);
      setError('');

      try {
        const email = user?.primaryEmailAddress?.emailAddress || '';
        const nextAccess = await getUserAccess(email);

        if (mounted) {
          setAccess(nextAccess);
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || 'Unable to load access profile.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAccess();

    return () => {
      mounted = false;
    };
  }, [isLoaded, user]);

  return { access, loading, error };
};
