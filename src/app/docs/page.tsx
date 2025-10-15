'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Zap, FileText, ExternalLink, Github } from 'lucide-react';
import './DocsPage.css';
import Footer from '../../components/Footer';

export default function DocsPage() {
  const [devSidebarCollapsed, setDevSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('devSidebarCollapsed');
    setDevSidebarCollapsed(saved === 'true');
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    
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
  const sections = [
    {
      title: 'Getting Started',
      icon: <Zap size={20} />,
      items: [
        'Installation & Setup',
        'Environment Configuration',
        'Running the Development Server',
        'Building for Production'
      ]
    },
    {
      title: 'Core Features',
      icon: <FileText size={20} />,
      items: [
        'Identity Verification',
        'Authentication Systems',
        'Profile Management',
        'Bitcoin OS Integration'
      ]
    },
    {
      title: 'API Reference',
      icon: <Code size={20} />,
      items: [
        'REST API Endpoints',
        'WebSocket Events',
        'SDK Documentation',
        'Authentication'
      ]
    }
  ];

  return (
    <div className="App">
      <div className={`docs-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
        <div className="docs-container">
          {/* Hero Section */}
          <section className="docs-hero">
            <h1><span style={{color: '#ffffff'}}>Bitcoin Identity</span> <span style={{color: '#3b82f6'}}>Documentation</span></h1>
            <p className="docs-tagline">
              Complete guide to building and deploying your Bitcoin Identity system
            </p>
          </section>

          {/* Quick Start Section */}
          <section className="quickstart-section">
            <h2>Quick Start</h2>
            <div className="quickstart-card">
              <h3>
                <Zap size={20} />
                Get Started in Minutes
              </h3>
              
              <div className="code-block">
                <div className="comment"># Clone the repository</div>
                <div className="command">git clone https://github.com/bitcoin-apps-suite/bitcoin-identity.git</div>
                
                <div className="comment"># Install dependencies</div>
                <div className="command">npm install</div>
                
                <div className="comment"># Start development server</div>
                <div className="command">npm run dev</div>
              </div>

              <p className="quickstart-note">
                Your Bitcoin Identity system will be running at <code>http://localhost:4090</code>
              </p>
            </div>
          </section>

          {/* Documentation Sections */}
          <section className="docs-sections">
            <h2>Documentation Sections</h2>
            <div className="docs-grid">
              {sections.map((section, index) => (
                <div key={index} className="docs-card">
                  <h3>
                    {section.icon}
                    {section.title}
                  </h3>
                  
                  <ul className="docs-links">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a href="#" className="doc-link">
                          <FileText size={16} />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* External Resources */}
          <section className="resources-section">
            <h2>External Resources</h2>

            <div className="resources-grid">
              <a href="https://docs.bsvblockchain.org" target="_blank" rel="noopener noreferrer" className="resource-link">
                <ExternalLink size={20} className="resource-icon" />
                <div className="resource-info">
                  <div className="resource-title">BSV SDK Documentation</div>
                  <div className="resource-description">
                    Official Bitcoin SV SDK documentation
                  </div>
                </div>
              </a>

              <a href="https://docs.handcash.io" target="_blank" rel="noopener noreferrer" className="resource-link">
                <ExternalLink size={20} className="resource-icon" />
                <div className="resource-info">
                  <div className="resource-title">HandCash Connect</div>
                  <div className="resource-description">
                    Integrate wallet functionality
                  </div>
                </div>
              </a>

              <a href="https://github.com/bitcoin-apps-suite/bitcoin-identity" target="_blank" rel="noopener noreferrer" className="resource-link">
                <Github size={20} className="resource-icon" />
                <div className="resource-info">
                  <div className="resource-title">GitHub Repository</div>
                  <div className="resource-description">
                    Source code and issue tracking
                  </div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}