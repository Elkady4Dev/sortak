import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Automatically manages the ?access=token URL parameter
 * - Adds user's token to URL when logged in
 * - Preserves manually-added tester tokens
 * - Provides navigation helper that maintains token
 */
export const useTokenNavigation = () => {
  const { user, profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = searchParams.get('access');

    // If user is logged in and has a token
    if (user && profile?.token) {
      // Only update URL if there's no token, or if it's different from user's token
      if (!currentToken) {
        // No token in URL - add user's token
        const newParams = new URLSearchParams(searchParams);
        newParams.set('access', profile.token);
        setSearchParams(newParams, { replace: true });
      }
      // If currentToken exists but is different, keep it (might be a tester token)
    }
  }, [user, profile, searchParams, setSearchParams]);

  const navigateWithToken = (path: string, options?: { replace?: boolean }) => {
    const token = searchParams.get('access') || profile?.token;
    
    if (token) {
      navigate(`${path}?access=${token}`, options);
    } else {
      navigate(path, options);
    }
  };

  const getCurrentToken = () => {
    return searchParams.get('access') || profile?.token || null;
  };

  return { 
    navigateWithToken,
    getCurrentToken,
    userToken: profile?.token,
  };
};