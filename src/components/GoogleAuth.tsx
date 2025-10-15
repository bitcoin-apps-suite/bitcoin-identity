'use client';

import React, { useEffect, useState } from 'react';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface GoogleAuthProps {
  onAuthSuccess?: (user: GoogleUser) => void;
  onAuthFailure?: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthProps> = ({ 
  onAuthSuccess, 
  onAuthFailure
}) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('googleUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    try {
      // For now, simulate Google auth with mock data
      // In a real implementation, you'd integrate with Google OAuth
      const mockUser: GoogleUser = {
        email: 'user@example.com',
        name: 'Bitcoin Identity User',
        picture: 'https://via.placeholder.com/40',
        sub: 'mock-google-id'
      };

      localStorage.setItem('googleUser', JSON.stringify(mockUser));
      setUser(mockUser);
      
      if (onAuthSuccess) {
        onAuthSuccess(mockUser);
      }
    } catch (error) {
      console.error('Google auth failed:', error);
      if (onAuthFailure) {
        onAuthFailure();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleGoogleAuth}
      disabled={isLoading}
      style={{
        padding: '12px 16px',
        fontSize: '13px',
        background: 'rgba(66, 133, 244, 0.1)',
        border: '1px solid rgba(66, 133, 244, 0.3)',
        borderRadius: '6px',
        color: '#4285f4',
        cursor: isLoading ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        gap: '8px'
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.background = 'rgba(66, 133, 244, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(66, 133, 244, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.background = 'rgba(66, 133, 244, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(66, 133, 244, 0.3)';
        }
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {isLoading ? 'Connecting...' : 'Connect with Google'}
    </button>
  );
};

export default GoogleAuthButton;