'use client';

import React, { useState, useEffect } from 'react';
import './TokenPage.css';
import Footer from '../../components/Footer';

const TokenPage: React.FC = () => {
  const [devSidebarCollapsed, setDevSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('devSidebarCollapsed');
    setDevSidebarCollapsed(saved === 'true');
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Listen for storage changes to detect sidebar collapse state
    const handleStorageChange = () => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    };
    
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    
    // Check for sidebar state changes via polling
    const checkSidebarState = setInterval(() => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
      clearInterval(checkSidebarState);
    };
  }, []);

  return (
    <div className="App">
      <div className={`token-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
      <div className="token-container">
        {/* Hero Section */}
        <section className="token-hero">
          <h1><span style={{color: '#ffffff'}}>The</span> <span style={{color: '#3b82f6'}}>Bitcoin Identity</span> <span style={{color: '#ffffff'}}>Token</span></h1>
          <p className="token-tagline">
            Decentralized identity meets sustainable economics
          </p>
          <div className="token-badge">$BID</div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h2>Our Decentralized Identity Philosophy</h2>
          <div className="philosophy-content">
            <p>
              Bitcoin Identity is an <strong>open-source project</strong> building the future of 
              decentralized identity on Bitcoin. Our mission is to create a truly sovereign 
              digital identity ecosystem where users control their data.
            </p>
            <p>
              The $BID token represents our approach to creating a sustainable economic model that 
              rewards contributors while maintaining decentralization and user sovereignty.
            </p>
            <div className="philosophy-points">
              <div className="point">
                <h3>Sovereign Identity</h3>
                <p>Users own and control their identity data</p>
              </div>
              <div className="point">
                <h3>Community Driven</h3>
                <p>Contributors earn tokens through meaningful work</p>
              </div>
              <div className="point">
                <h3>Bitcoin Native</h3>
                <p>Built on Bitcoin for maximum security and permanence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Token Model Section */}
        <section className="token-model-section">
          <h2>The $BID Token Model</h2>
          <div className="model-card">
            <h3>How It Works</h3>
            <ul>
              <li>
                <strong>Token Distribution:</strong> Tokens are allocated to developers 
                who contribute meaningful code that gets merged into production
              </li>
              <li>
                <strong>Identity Services:</strong> The Bitcoin Identity Corporation LTD intends to distribute 
                dividends to token holders from identity verification and premium service revenues
              </li>
              <li>
                <strong>Contribution = Ownership:</strong> Build value, receive tokens, share in success
              </li>
              <li>
                <strong>Transparent Allocation:</strong> All token grants are recorded on-chain via Bitcoin
              </li>
            </ul>
          </div>

          <div className="model-card warning">
            <h3>Important Notices</h3>
            <ul>
              <li>
                <strong>No Guarantees:</strong> Token allocation is entirely discretionary with no promises 
                of distribution for any particular contribution
              </li>
              <li>
                <strong>Not Employment:</strong> Contributing and receiving tokens does not constitute 
                an employment relationship or contract
              </li>
              <li>
                <strong>Not a Public Offering:</strong> This is not a solicitation for investment or 
                capital raising. $BID tokens are rewards for contribution, not investment instruments
              </li>
              <li>
                <strong>Future Equity:</strong> The Bitcoin Identity Corporation LTD may incorporate and offer 
                regulated equity shares separately from the token system
              </li>
            </ul>
          </div>
        </section>

        {/* Business Model Section */}
        <section className="business-section">
          <h2>The Bitcoin Identity Corporation LTD</h2>
          <div className="business-content">
            <p className="intro">
              Our vision is to create sustainable decentralized identity services through a hybrid model that 
              preserves user sovereignty while generating value.
            </p>

            <div className="business-model">
              <h3>Revenue Model</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>Free Tier</h4>
                  <p>Basic identity services</p>
                  <p className="price">$0/month</p>
                </div>
                <div className="stream featured">
                  <h4>Pro Tier</h4>
                  <p>Advanced identity features, verification</p>
                  <p className="price">$19/month</p>
                </div>
                <div className="stream">
                  <h4>Enterprise</h4>
                  <p>Custom deployment, SLA, support</p>
                  <p className="price">$199/month</p>
                </div>
              </div>
              
              <h3 style={{marginTop: '40px'}}>Identity Services Revenue</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>Verification Services</h4>
                  <p>Identity verification and attestation</p>
                  <p className="price">2.5% fee</p>
                </div>
                <div className="stream featured">
                  <h4>Credential Trading</h4>
                  <p>Secondary market for identity credentials</p>
                  <p className="price">1.5% fee</p>
                </div>
                <div className="stream">
                  <h4>Data Marketplace</h4>
                  <p>Verified data and reputation services</p>
                  <p className="price">3% fee</p>
                </div>
              </div>
            </div>

            <div className="value-flow">
              <h3>Value Flow</h3>
              <div className="flow-diagram">
                <div className="flow-item">
                  <span>Subscriptions + Service fees</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Revenue to Bitcoin Identity Ltd</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Dividends to $BID holders</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Contributors rewarded for building</span>
                </div>
              </div>
              <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)'}}>
                The Bitcoin Identity ecosystem enables secure, decentralized identity management,
                generating platform fees that contribute to the ecosystem's sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* How to Contribute Section */}
        <section className="contribute-section">
          <h2>How to Earn $BID Tokens</h2>
          <div className="contribute-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Fork & Build</h3>
              <p>Fork the repository and implement identity features, fixes, or improvements</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Submit PR</h3>
              <p>Create a pull request with clear description and documentation</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Merged</h3>
              <p>Quality code that adds value gets merged into production</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Receive Tokens</h3>
              <p>Tokens allocated based on contribution impact and quality</p>
            </div>
          </div>

          <div className="contribution-examples">
            <h3>What We Value</h3>
            <ul>
              <li>✅ Identity protocol implementation</li>
              <li>✅ Security and privacy enhancements</li>
              <li>✅ Cryptographic improvements</li>
              <li>✅ Documentation and tests</li>
              <li>✅ UI/UX improvements</li>
              <li>✅ Integration and interoperability</li>
            </ul>
          </div>
        </section>

        {/* Token Stats Section */}
        <section className="stats-section">
          <h2>Token Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>Total Supply</h3>
              <p className="stat-value">1,000,000,000</p>
              <p className="stat-label">$BID tokens</p>
            </div>
            <div className="stat">
              <h3>Distributed</h3>
              <p className="stat-value">0</p>
              <p className="stat-label">Tokens allocated</p>
            </div>
            <div className="stat">
              <h3>Contributors</h3>
              <p className="stat-value">1</p>
              <p className="stat-label">Active developers</p>
            </div>
            <div className="stat">
              <h3>Network</h3>
              <p className="stat-value">Bitcoin</p>
              <p className="stat-label">Blockchain</p>
            </div>
          </div>
        </section>

        {/* Legal Section */}
        <section className="legal-section">
          <h2>Legal & Regulatory Notice</h2>
          <div className="legal-content">
            <p>
              <strong>Revenue Sharing Model:</strong> The $BID token is designed to enable revenue 
              sharing with contributors through dividend distributions. Token holders may receive dividends 
              based on platform revenues from identity services and verification fees.
            </p>
            <p>
              <strong>Trading & Liquidity:</strong> The $BID token is intended to be freely tradable 
              on the Bitcoin Identity Exchange and associated platforms. We encourage an active secondary 
              market to provide liquidity and price discovery for contributors' work.
            </p>
            <p>
              <strong>$BIDSHARE Fundraising:</strong> The Bitcoin Identity Corporation LTD intends to issue $BIDSHARE 
              tokens as a fundraising mechanism. These tokens will represent participation in the platform's 
              success and may be offered through appropriate channels.
            </p>
            <p>
              By participating in the token ecosystem, you acknowledge that token allocation is discretionary, 
              regulatory frameworks may evolve, and you should conduct your own due diligence regarding 
              tax and legal implications in your jurisdiction.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Build the Future of Identity?</h2>
          <div className="cta-buttons">
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-identity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-btn primary"
            >
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View on GitHub
            </a>
            <a 
              href="/docs" 
              className="cta-btn secondary"
            >
              Read Developer Docs
            </a>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default TokenPage;