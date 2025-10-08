'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Users, Lock, Github, ExternalLink, FileText } from 'lucide-react';
import Dock from '../components/Dock';

export default function HomePage() {
  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f1829 0%, #0a1220 100%)',
        color: '#e8f4ff',
        padding: '2rem'
      }}>
        {/* Hero Section */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          paddingTop: '4rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #3b82f6, #fbbf24)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Bitcoin Identity
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(232, 244, 255, 0.8)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Secure identity management and authentication system for Bitcoin SV applications 
            with comprehensive user verification and credential management.
          </p>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            margin: '4rem 0'
          }}>
            <Link href="/identity" style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                padding: '2rem',
                textAlign: 'left',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <Shield size={32} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3b82f6' }}>
                  Identity Verification
                </h3>
                <p style={{ color: 'rgba(232, 244, 255, 0.7)' }}>
                  Secure user identity creation and verification with Bitcoin cryptographic signatures.
                </p>
              </div>
            </Link>

            <Link href="/authentication" style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                padding: '2rem',
                textAlign: 'left',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <Lock size={32} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3b82f6' }}>
                  Authentication
                </h3>
                <p style={{ color: 'rgba(232, 244, 255, 0.7)' }}>
                  Multi-factor authentication with Bitcoin cryptographic signatures and secure login.
                </p>
              </div>
            </Link>

            <Link href="/profiles" style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                padding: '2rem',
                textAlign: 'left',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <Users size={32} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3b82f6' }}>
                  Profile Management
                </h3>
                <p style={{ color: 'rgba(232, 244, 255, 0.7)' }}>
                  Comprehensive user profile and credential management with secure data storage.
                </p>
              </div>
            </Link>
          </div>

          {/* Build Your Own */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            margin: '4rem 0',
            textAlign: 'left'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>
              Build Your Own Bitcoin Identity App
            </h2>
            <p style={{ color: 'rgba(232, 244, 255, 0.8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Create your own secure identity management system using open-source Bitcoin libraries and tools. 
              All components can be audited for security and customized for your specific use case.
            </p>
            <div style={{ 
              background: 'rgba(251, 191, 36, 0.1)', 
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#fbbf24', marginBottom: '1rem', fontSize: '1.1rem' }}>
                🛠️ Open Source Security
              </h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'rgba(232, 244, 255, 0.8)' }}>
                <li style={{ marginBottom: '0.5rem' }}>Auditable cryptographic implementations</li>
                <li style={{ marginBottom: '0.5rem' }}>Transparent identity verification protocols</li>
                <li style={{ marginBottom: '0.5rem' }}>No vendor lock-in or hidden dependencies</li>
                <li style={{ marginBottom: '0.5rem' }}>Community-reviewed security standards</li>
              </ul>
            </div>
          </div>

          {/* Getting Started */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            margin: '4rem 0',
            textAlign: 'left'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>
              Getting Started
            </h2>
            <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', color: 'rgba(232, 255, 232, 0.8)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Fork this repository and clone it to your local machine</li>
              <li style={{ marginBottom: '0.5rem' }}>Customize the app name, branding, and metadata in layout.tsx</li>
              <li style={{ marginBottom: '0.5rem' }}>Configure your identity verification parameters</li>
              <li style={{ marginBottom: '0.5rem' }}>Set up authentication methods and security policies</li>
              <li style={{ marginBottom: '0.5rem' }}>Configure user profile management and data storage</li>
              <li style={{ marginBottom: '0.5rem' }}>Launch your Bitcoin Identity system!</li>
            </ol>
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-identity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <Github size={18} />
              View on GitHub
            </a>
            
            <Link href="/docs" className="btn-primary" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}>
              <FileText size={18} />
              Documentation
            </Link>

            <a 
              href="https://replit.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img 
                src="/replit-button.png" 
                alt="Build on Replit" 
                style={{
                  height: '44px',
                  borderRadius: '6px'
                }}
              />
            </a>
          </div>
        </div>
      </div>
      <Dock 
        context={{
          appName: 'Bitcoin Identity',
          exchangeUrl: '/exchange'
        }}
        customApps={[
          { 
            name: 'Bitcoin Identity', 
            icon: Shield, 
            color: 'text-blue-500', 
            url: 'http://localhost:4090', 
            current: true 
          }
        ]}
      />
    </>
  );
}