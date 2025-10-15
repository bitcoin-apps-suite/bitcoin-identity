'use client';

import React from 'react';
import './marketing.css';

const MarketingPage: React.FC = () => {
  return (
    <div className="marketing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <span className="bitcoin-symbol">₿</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-bitcoin">BITCOIN</span>
            <span className="title-identity">IDENTITY</span>
          </h1>
          
          <p className="hero-subtitle">
            The world's first regulated platform for tokenizing celebrity identities and personal brands. 
            Issue shares in your identity, receive revenue distributions, and trade on the Identity Exchange.
          </p>
          
          <div className="hero-buttons">
            <button className="cta-primary" onClick={() => window.location.href = '/'}>
              <span>Launch Platform</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="cta-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">EU</div>
              <div className="stat-label">Compliant</div>
            </div>
            <div className="stat">
              <div className="stat-number">KYC</div>
              <div className="stat-label">Verified</div>
            </div>
            <div className="stat">
              <div className="stat-number">Real-time</div>
              <div className="stat-label">Payouts</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="app-preview">
            <div className="app-window">
              <div className="window-header">
                <div className="window-controls">
                  <div className="control close"></div>
                  <div className="control minimize"></div>
                  <div className="control maximize"></div>
                </div>
                <div className="window-title">Bitcoin Identity Exchange</div>
              </div>
              <div className="window-content">
                <div className="mock-sidebar">
                  <div className="mock-nav-item active">🏛️ Celebrity <span className="badge">24</span></div>
                  <div className="mock-nav-item">🎵 Musicians</div>
                  <div className="mock-nav-item">📺 Influencers <span className="badge">12</span></div>
                  <div className="mock-nav-item">⭐ Athletes</div>
                </div>
                <div className="mock-identity-list">
                  <div className="mock-identity">
                    <div className="identity-avatar">TB</div>
                    <div className="identity-content">
                      <div className="identity-name">Tony Blair</div>
                      <div className="identity-ticker">$BLAIR</div>
                      <div className="identity-revenue">Speaking fees, book deals...</div>
                    </div>
                    <div className="identity-meta">
                      <div className="identity-price">$0.0234</div>
                      <div className="identity-change positive">+12.4% ↑</div>
                    </div>
                  </div>
                  <div className="mock-identity">
                    <div className="identity-avatar">ZD</div>
                    <div className="identity-content">
                      <div className="identity-name">Zero Dice</div>
                      <div className="identity-ticker">$ZERODICE</div>
                      <div className="identity-revenue">ASMR Techno music revenue...</div>
                    </div>
                    <div className="identity-meta">
                      <div className="identity-price">$0.0445</div>
                      <div className="identity-change positive">+8.7% ↑</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              REGULATED IDENTITY SECURITIZATION
            </h2>
            <p className="section-subtitle">
              EU-compliant platform for tokenizing personal brands and celebrity identities with real revenue distributions.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon celebrity">
                <span>👑</span>
              </div>
              <h3 className="feature-title">CELEBRITY TOKENIZATION</h3>
              <p className="feature-description">
                Famous personalities can tokenize their personal brands. 
                Issue shares in speaking fees, book deals, appearances, and other revenue streams.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon kyc">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">KYC VERIFICATION</h3>
              <p className="feature-description">
                Links real-world identity documents to stage names and personas. 
                Proves legitimacy while maintaining privacy when desired.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon revenue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="feature-title">REVENUE DISTRIBUTION</h3>
              <p className="feature-description">
                Automatic distribution of earnings to shareholders via HandCash paymail. 
                Real-time tracking of income and dividend payments.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon compliance">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m5-9h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-5-9V4a2 2 0 012-2h2a2 2 0 012 2v1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 00-2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="feature-title">EU COMPLIANCE</h3>
              <p className="feature-description">
                Fully regulated under EU securities law. Contracts are dissolvable, 
                transparent, and meet all regulatory requirements.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon exchange">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="feature-title">IDENTITY EXCHANGE</h3>
              <p className="feature-description">
                Trade celebrity identity tokens on a regulated exchange. 
                Buy shares in personalities you believe will generate future revenue.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon divvy">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="feature-title">DIVVY INTEGRATION</h3>
              <p className="feature-description">
                Seamless integration with Divvy for automated revenue distribution. 
                HandCash-based payments to shareholders with full audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">REAL-WORLD USE CASES</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                "A celebrity can tokenize their personal brand and let fans invest in their future success. 
                Speaking fees, book deals, and appearances generate dividends for shareholders."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar celebrity">👑</div>
                <div className="author-info">
                  <div className="author-name">Celebrity Brand</div>
                  <div className="author-title">Politicians, Actors, Public Figures</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                "Musicians and content creators can issue shares in specific identities or characters. 
                Revenue from music sales, streaming, and content automatically flows to token holders."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar musician">🎵</div>
                <div className="author-info">
                  <div className="author-name">Content Creators</div>
                  <div className="author-title">Musicians, YouTubers, Influencers</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-content">
                "Investors can buy shares in personalities they believe will become more valuable. 
                Early investment in rising stars or established celebrities with growth potential."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar investor">📈</div>
                <div className="author-info">
                  <div className="author-name">Identity Investors</div>
                  <div className="author-title">Fans, Traders, Investment Funds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <h2 className="section-title">HOW IT WORKS</h2>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">IDENTITY VERIFICATION</h3>
              <p className="step-description">
                Celebrity completes KYC verification linking real identity to their public persona. 
                Privacy options available for sensitive cases.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">TOKEN CREATION</h3>
              <p className="step-description">
                Create identity token (e.g., $BLAIR, $ZERODICE) and set up revenue stream tracking. 
                Define shareholding structure and distribution rules.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">SHARE ISSUANCE</h3>
              <p className="step-description">
                Issue shares to the public via the Identity Exchange. 
                Fans and investors can purchase stakes in the celebrity's future earnings.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">REVENUE DISTRIBUTION</h3>
              <p className="step-description">
                Earnings flow to celebrity's HandCash paymail, then automatically distributed 
                to shareholders via Divvy integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            READY TO TOKENIZE YOUR IDENTITY?
          </h2>
          <p className="cta-subtitle">
            Join the future of celebrity finance. Whether you're a public figure looking to monetize your brand 
            or an investor seeking exposure to personality-driven revenue streams.
          </p>
          
          <div className="cta-buttons">
            <button className="cta-primary large" onClick={() => window.location.href = '/'}>
              <span>LAUNCH BITCOIN IDENTITY</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="cta-features">
            <div className="cta-feature">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>EU Regulated</span>
            </div>
            <div className="cta-feature">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>KYC Verified</span>
            </div>
            <div className="cta-feature">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="bitcoin-symbol">₿</span>
              <span className="brand-text">
                <span className="brand-bitcoin">BITCOIN</span>
                <span className="brand-identity">IDENTITY</span>
              </span>
            </div>
            <p className="footer-tagline">
              Regulated • Verified • Profitable
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="#exchange">Identity Exchange</a>
              <a href="#verification">KYC Verification</a>
              <a href="#compliance">EU Compliance</a>
              <a href="#divvy">Divvy Integration</a>
            </div>
            
            <div className="link-group">
              <h4>For Celebrities</h4>
              <a href="#tokenize">Tokenize Identity</a>
              <a href="#revenue">Revenue Streams</a>
              <a href="#privacy">Privacy Options</a>
              <a href="#support">Celebrity Support</a>
            </div>
            
            <div className="link-group">
              <h4>For Investors</h4>
              <a href="#browse">Browse Identities</a>
              <a href="#portfolio">Portfolio Tracking</a>
              <a href="#analytics">Market Analytics</a>
              <a href="#education">Investment Guide</a>
            </div>
            
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#compliance">Compliance</a>
              <a href="#disclosure">Risk Disclosure</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 The Bitcoin Corporation LTD (16735102). Regulated identity securities platform.
          </div>
          <div className="footer-social">
            <a href="#" className="social-link">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingPage;