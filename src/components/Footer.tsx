import React from 'react';
import Link from 'next/link';
import { Shield, Github, ExternalLink, FileText, Users, Lock } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Shield size={24} />
              <span>Bitcoin Identity</span>
            </div>
            <p>
              Privacy-first identity management system with local encryption, 
              selective disclosure, and blockchain-anchored verification.
            </p>
            <div className="footer-social">
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-identity" 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub Repository"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://bitcoin-corp.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Bitcoin Corporation"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li>
                <Link href="/identity">
                  <Users size={16} />
                  Identity Verification
                </Link>
              </li>
              <li>
                <Link href="/compliance">
                  <Lock size={16} />
                  KYC/AML Compliance
                </Link>
              </li>
              <li>
                <Link href="/assets">
                  <Shield size={16} />
                  Asset Registry
                </Link>
              </li>
              <li>
                <Link href="/docs">
                  <FileText size={16} />
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Developer Resources</h3>
            <ul className="footer-links">
              <li>
                <a 
                  href="https://github.com/bitcoin-apps-suite/bitcoin-identity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  Source Code
                </a>
              </li>
              <li>
                <Link href="/docs">
                  <FileText size={16} />
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/contributors">
                  <Users size={16} />
                  Contributors
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.bitcoinapps.store/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Bitcoin Apps Store
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li>
                <Link href="/terms">
                  <FileText size={16} />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <Lock size={16} />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/license">
                  <FileText size={16} />
                  Open BSV License
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            © 2025 Bitcoin Identity Platform. Licensed under the Open BSV License Version 5. 
            Built on the Bitcoin SV blockchain for secure, scalable identity management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;