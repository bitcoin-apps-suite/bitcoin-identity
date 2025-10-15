'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Code, Play, Eye, Plus, Settings, Zap, Shield, Github, Target } from 'lucide-react';
import './ContractsPage.css';

export default function ContractsPage() {
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

  // Mock contract data
  const contracts = [
    {
      id: 1,
      name: 'Token Distribution',
      type: 'ERC-20 Style',
      status: 'Deployed',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Escrow Service',
      type: 'Multi-Sig',
      status: 'Draft',
      address: null,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Voting System',
      type: 'Governance',
      status: 'Testing',
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      lastActivity: '5 minutes ago'
    }
  ];

  const templates = [
    {
      name: 'Token Contract',
      description: 'Create fungible tokens with customizable properties',
      icon: <Zap size={24} />
    },
    {
      name: 'Escrow Contract',
      description: 'Secure multi-party transactions with release conditions',
      icon: <Shield size={24} />
    },
    {
      name: 'Voting Contract',
      description: 'Decentralized governance and decision making',
      icon: <FileText size={24} />
    },
    {
      name: 'Custom Contract',
      description: 'Start from scratch with a blank template',
      icon: <Code size={24} />
    }
  ];

  return (
    <div className="App">
      <div className={`contracts-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
        {/* Hero Section */}
        <section className="contracts-hero">
          <h1><span style={{color: '#ffffff'}}>Bitcoin Identity</span> <span style={{color: '#3b82f6'}}>Smart Contracts</span></h1>
          <p className="contracts-tagline">
            Deploy and manage Bitcoin Script smart contracts with an intuitive interface
          </p>
        </section>

        {/* Actions Section */}
        <section className="actions-section">
          <div className="action-buttons">
            <button className="cta-btn primary">
              <Plus size={16} />
              New Contract
            </button>
            <button className="cta-btn secondary">
              <Eye size={16} />
              Browse Templates
            </button>
            <button className="cta-btn secondary">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="main-content-section">
          <div className="contracts-grid">
            {/* Contract List */}
            <div className="contracts-card">
              <h3>
                <FileText size={20} />
                Your Contracts
              </h3>
              
              <div className="contracts-list">
                {contracts.map((contract) => (
                  <div key={contract.id} className="contract-item">
                    <div className="contract-header">
                      <h4>{contract.name}</h4>
                      <span className={`status-badge ${contract.status.toLowerCase()}`}>
                        {contract.status}
                      </span>
                    </div>
                    
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>
                      Type: {contract.type}
                    </p>
                    
                    {contract.address && (
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                        marginBottom: '0.5rem'
                      }}>
                        Address: {contract.address}
                      </p>
                    )}
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '1rem'
                    }}>
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                        Last activity: {contract.lastActivity}
                      </span>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="cta-btn secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                          <Eye size={14} />
                          View
                        </button>
                        <button className="cta-btn secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                          <Code size={14} />
                          Edit
                        </button>
                        {contract.status === 'Draft' && (
                          <button className="cta-btn primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                            <Play size={14} />
                            Deploy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Templates */}
            <div className="contracts-card">
              <h3>
                <Code size={20} />
                Templates
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {templates.map((template, index) => (
                  <div key={index} className="template-item">
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ color: '#3b82f6' }}>
                        {template.icon}
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                        {template.name}
                      </h4>
                    </div>
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      margin: 0
                    }}>
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contract IDE Section */}
        <section className="ide-section">
          <h2>Contract IDE</h2>
          <div className="ide-container">
            <div className="code-editor">
              <div style={{ color: '#3b82f6', marginBottom: '1rem' }}>
                // Bitcoin Script Smart Contract Template
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#ff6b6b' }}>OP_DUP</span> <span style={{ color: '#4ecdc4' }}>OP_HASH160</span> <span style={{ color: '#ffe66d' }}>&lt;pubKeyHash&gt;</span>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#4ecdc4' }}>OP_EQUALVERIFY</span> <span style={{ color: '#4ecdc4' }}>OP_CHECKSIG</span>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '1rem' }}>
                // Implement your contract logic here...
              </div>
            </div>
            <div className="contract-actions">
              <button className="cta-btn primary">
                Compile Contract
              </button>
              <button className="cta-btn secondary">
                Test Contract
              </button>
              <button className="cta-btn secondary">
                Deploy to Testnet
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}