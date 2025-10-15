'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleAuthButton from './GoogleAuth';
import { HandCashService } from '../services/HandCashService';
import type { HandCashUser } from '../services/HandCashService';
import AuthModal from './AuthModal';
import './UnifiedAuth.css';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface UnifiedAuthProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
}

const UnifiedAuth: React.FC<UnifiedAuthProps> = ({ onAuthChange }) => {
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [handcashUser, setHandcashUser] = useState<HandCashUser | null>(null);
  const [handcashService] = useState(() => new HandCashService());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubstackModal, setShowSubstackModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      // Check for stored Google user
      const storedGoogleUser = localStorage.getItem('googleUser');
      if (storedGoogleUser) {
        setGoogleUser(JSON.parse(storedGoogleUser));
      }

      // Check for HandCash authentication
      if (handcashService.isAuthenticated()) {
        setHandcashUser(handcashService.getCurrentUser());
      }
    }
  }, [handcashService]);

  useEffect(() => {
    // Notify parent component of auth state changes
    const isAuthenticated = !!(googleUser || handcashUser);
    if (onAuthChange) {
      onAuthChange(isAuthenticated);
    }
  }, [googleUser, handcashUser, onAuthChange]);

  // Determine auth state
  const hasGoogle = !!googleUser;
  const hasHandCash = !!handcashUser;
  const hasFullAuth = hasGoogle && hasHandCash;

  const handleGoogleLogin = (user: GoogleUser) => {
    setGoogleUser(user);
    setShowAuthModal(false);
  };

  const handleGoogleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('googleUser');
    }
    setGoogleUser(null);
  };

  const handleHandCashLogin = async () => {
    setIsLoading(true);
    try {
      await handcashService.login();
      setHandcashUser(handcashService.getCurrentUser());
      setShowAuthModal(false);
    } catch (error) {
      console.error('HandCash login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHandCashLogout = () => {
    handcashService.logout();
    setHandcashUser(null);
  };

  // If no auth at all, show single sign in button
  if (!hasGoogle && !hasHandCash) {
    return (
      <div className="unified-auth-container">
        <button 
          className="sign-in-btn"
          onClick={() => setShowAuthModal(true)}
        >
          Connect Identity
        </button>
        
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}>
          <div className="auth-modal-header">
            <h2>Connect to Bitcoin Identity</h2>
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>×</button>
          </div>
          
          <div className="auth-modal-content">
            <div className="auth-options">
              <div className="google-btn-wrapper">
                <GoogleAuthButton 
                  onAuthSuccess={handleGoogleLogin}
                  onAuthFailure={() => {
                    console.error('Google auth failed');
                  }}
                />
              </div>
              
              <button 
                className="handcash-login-btn full-width"
                onClick={handleHandCashLogin}
                disabled={isLoading}
              >
                <img src="https://handcash.io/favicon.ico" alt="HandCash" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                {isLoading ? 'Connecting...' : 'Connect HandCash Wallet'}
              </button>
              
              <button 
                className="substack-login-btn full-width"
                onClick={() => setShowSubstackModal(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000" style={{ marginRight: '8px' }}>
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Connect Substack
              </button>
            </div>
            
            <div className="auth-benefits">
              <h3>Why connect your identities?</h3>
              <p className="simple-explanation">
                Bitcoin Identity helps you tokenize and manage your social media identities as revenue-generating assets. 
                Connect your Google account for document management, HandCash wallet for payments and revenue distribution, 
                and track the value of your digital identity portfolio across platforms.
              </p>
              
              <div className="identity-features">
                <h4>Identity Tokenization Features</h4>
                <ul>
                  <li>🎯 Tokenize social media handles and content</li>
                  <li>💰 Issue shares in your identity properties</li>
                  <li>📊 Track revenue streams and distributions</li>
                  <li>🔐 KYC/compliance management for shareholders</li>
                  <li>📈 Real-time identity portfolio valuation</li>
                </ul>
              </div>
            </div>
          </div>
        </AuthModal>
        
        {/* Substack Modal */}
        {showSubstackModal && (
          <>
            <div className="auth-modal-overlay" onClick={() => setShowSubstackModal(false)} />
            <div className="substack-modal">
              <div className="substack-modal-header">
                <h2>😅 Oops!</h2>
                <button className="modal-close" onClick={() => setShowSubstackModal(false)}>×</button>
              </div>
              <div className="substack-modal-content">
                <div className="substack-message">
                  <h3>Substack doesn't do OAuth!</h3>
                  <p>They keep their API locked up tighter than Fort Knox. 🔒</p>
                  <p>But you can still tokenize your Substack content manually and track revenue streams!</p>
                  <button 
                    className="substack-ok-btn"
                    onClick={() => setShowSubstackModal(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // If we have at least one auth, show unified interface
  return (
    <div className="unified-auth-container">
      <button 
        className="sign-in-btn"
        onClick={() => setShowAuthModal(true)}
      >
        <div className="auth-avatars">
          {hasGoogle && (
            <img 
              src={googleUser.picture} 
              alt={googleUser.name}
              className="auth-avatar google-avatar"
              title={`Google: ${googleUser.name}`}
              style={{width: '20px', height: '20px', borderRadius: '50%'}}
            />
          )}
          {hasHandCash && (
            <div 
              className="auth-avatar handcash-avatar"
              title={`HandCash: $${handcashUser?.handle}`}
              style={{width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}
            >
              💰
            </div>
          )}
        </div>
        <span>
          {hasFullAuth ? 'Identities' : 'Connections'}
        </span>
      </button>

      {/* Use the same modal for connected users */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <div className="auth-modal-header">
          <h2>Manage Identity Connections</h2>
          <button className="modal-close" onClick={() => setShowAuthModal(false)}>×</button>
        </div>
        
        <div className="auth-modal-content">
          <div className="auth-options">
            <div className="google-btn-wrapper">
              {hasGoogle ? (
                <div className="connected-account-card google-connected">
                  <img src={googleUser.picture} alt="" className="connected-avatar" />
                  <div className="connected-info">
                    <div className="connected-name">{googleUser.name}</div>
                    <div className="connected-email">{googleUser.email}</div>
                  </div>
                  <button className="disconnect-btn" onClick={handleGoogleLogout}>
                    Disconnect
                  </button>
                </div>
              ) : (
                <GoogleAuthButton 
                  onAuthSuccess={handleGoogleLogin}
                  onAuthFailure={() => {
                    console.error('Google auth failed');
                  }}
                />
              )}
            </div>
            
            {hasHandCash ? (
              <div className="connected-account-card handcash-connected">
                <div className="connected-avatar">
                  {handcashUser?.avatarUrl ? (
                    <img src={handcashUser.avatarUrl} alt="HandCash Avatar" style={{width: '100%', height: '100%', borderRadius: '50%'}} />
                  ) : (
                    <img src="https://handcash.io/favicon.ico" alt="HandCash" style={{width: '20px', height: '20px'}} />
                  )}
                </div>
                <div className="connected-info">
                  <div className="connected-name">${handcashUser?.handle}</div>
                  <div className="connected-email">{handcashUser?.paymail}</div>
                </div>
                <button className="disconnect-btn" onClick={handleHandCashLogout}>
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                className="handcash-login-btn full-width"
                onClick={handleHandCashLogin}
                disabled={isLoading}
              >
                <img src="https://handcash.io/favicon.ico" alt="HandCash" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                {isLoading ? 'Connecting...' : 'Connect HandCash Wallet'}
              </button>
            )}
            
            <button 
              className="substack-login-btn full-width"
              onClick={() => setShowSubstackModal(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000" style={{ marginRight: '8px' }}>
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
              </svg>
              Connect Substack
            </button>
          </div>
          
          <div className="auth-benefits">
            <h3>Your Identity Portfolio</h3>
            <p className="simple-explanation">
              Track and monetize your digital identities. Issue shares in your content streams, 
              manage KYC compliance for shareholders, and receive revenue distributions directly to your HandCash wallet.
            </p>
          </div>
        </div>
      </AuthModal>
      
      {/* Substack Modal */}
      {showSubstackModal && typeof window !== 'undefined' && ReactDOM.createPortal(
        <>
          <div className="auth-modal-overlay" onClick={() => setShowSubstackModal(false)} />
          <div className="substack-modal">
            <div className="substack-modal-header">
              <h2>😅 Oops!</h2>
              <button className="modal-close" onClick={() => setShowSubstackModal(false)}>×</button>
            </div>
            <div className="substack-modal-content">
              <div className="substack-message">
                <h3>Substack doesn't do OAuth!</h3>
                <p>They keep their API locked up tighter than Fort Knox. 🔒</p>
                <p>But you can still tokenize your Substack content manually!</p>
                <button 
                  className="substack-ok-btn"
                  onClick={() => setShowSubstackModal(false)}
                >
                  Thanks for Nothing, Substack
                </button>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default UnifiedAuth;