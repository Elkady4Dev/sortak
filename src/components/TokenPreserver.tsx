import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const TokenPreserver = () => {
  const { profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const token = profile?.token;
    const currentToken = searchParams.get('access');

    if (token && !currentToken) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('access', token);
      setSearchParams(newParams, { replace: true });
    }
  }, [location.pathname, profile, searchParams, setSearchParams]);

  return null;
};