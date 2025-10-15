'use client';

import React, { useState, useEffect } from 'react';
import './ContributorsPage.css';
import Footer from '../../components/Footer';
import { Github, Award, Star, GitPullRequest, Code, Trophy, Users, Target } from 'lucide-react';

export default function ContributorsPage() {
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

  const topContributors = [
    {
      id: 1,
      name: 'Alex Chen',
      username: 'alexc-dev',
      avatar: '/api/placeholder/64/64',
      role: 'Core Developer',
      contributions: 127,
      bidTokens: 15000,
      equityPercent: 0.8,
      specialties: ['Identity Protocol', 'Cryptography', 'Backend'],
      joinedDate: '2024-01-15',
      githubUrl: 'https://github.com/alexc-dev',
      isFounder: true
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      username: 'sarah-m',
      avatar: '/api/placeholder/64/64',
      role: 'Frontend Lead',
      contributions: 89,
      bidTokens: 12000,
      equityPercent: 0.6,
      specialties: ['React', 'UI/UX', 'Web3'],
      joinedDate: '2024-02-03',
      githubUrl: 'https://github.com/sarah-m',
      isFounder: false
    },
    {
      id: 3,
      name: 'David Rodriguez',
      username: 'drodriguez',
      avatar: '/api/placeholder/64/64',
      role: 'Security Expert',
      contributions: 72,
      bidTokens: 10500,
      equityPercent: 0.5,
      specialties: ['Security', 'Encryption', 'Auditing'],
      joinedDate: '2024-02-20',
      githubUrl: 'https://github.com/drodriguez',
      isFounder: false
    },
    {
      id: 4,
      name: 'Maria Santos',
      username: 'maria-dev',
      avatar: '/api/placeholder/64/64',
      role: 'Backend Developer',
      contributions: 58,
      bidTokens: 8000,
      equityPercent: 0.4,
      specialties: ['Node.js', 'Database', 'API Design'],
      joinedDate: '2024-03-10',
      githubUrl: 'https://github.com/maria-dev',
      isFounder: false
    },
    {
      id: 5,
      name: 'James Wilson',
      username: 'jwilson-crypto',
      avatar: '/api/placeholder/64/64',
      role: 'Blockchain Specialist',
      contributions: 45,
      bidTokens: 6500,
      equityPercent: 0.3,
      specialties: ['Bitcoin SV', 'Smart Contracts', 'Wallets'],
      joinedDate: '2024-03-25',
      githubUrl: 'https://github.com/jwilson-crypto',
      isFounder: false
    },
    {
      id: 6,
      name: 'Lisa Zhang',
      username: 'lisa-ux',
      avatar: '/api/placeholder/64/64',
      role: 'UX Designer',
      contributions: 31,
      bidTokens: 4500,
      equityPercent: 0.2,
      specialties: ['Design Systems', 'User Research', 'Prototyping'],
      joinedDate: '2024-04-08',
      githubUrl: 'https://github.com/lisa-ux',
      isFounder: false
    }
  ];

  const contributionTypes = [
    { type: 'Code Commits', count: 428, icon: Code },
    { type: 'Pull Requests', count: 89, icon: GitPullRequest },
    { type: 'Code Reviews', count: 156, icon: Star },
    { type: 'Documentation', count: 45, icon: Award }
  ];

  const totalEquity = topContributors.reduce((total, contributor) => total + contributor.equityPercent, 0);
  const totalTokens = topContributors.reduce((total, contributor) => total + contributor.bidTokens, 0);

  return (
    <div className="App">
      <div className={`contributors-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
        <div className="contributors-container">
          {/* Hero Section */}
          <section className="contributors-hero">
            <h1><span style={{color: '#ffffff'}}>Bitcoin Identity</span> <span style={{color: '#3b82f6'}}>Contributors</span></h1>
            <p className="contributors-tagline">
              Meet the developers building the future of decentralized identity
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">{topContributors.length}</span>
                <span className="stat-label">Active Contributors</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">{totalEquity.toFixed(1)}%</span>
                <span className="stat-label">Equity Distributed</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">{totalTokens.toLocaleString()}</span>
                <span className="stat-label">$BID Tokens Earned</span>
              </div>
            </div>
          </section>

          {/* Contribution Stats */}
          <section className="stats-section">
            <h2>Contribution Overview</h2>
            <div className="stats-grid">
              {contributionTypes.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="stat">
                    <IconComponent size={20} className="stat-icon" />
                    <h3>{item.type}</h3>
                    <p className="stat-value">{item.count}</p>
                    <p className="stat-label">Total contributions</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Top Contributors */}
          <section className="top-contributors-section">
            <h2>Top Contributors</h2>
            <div className="contributors-grid">
              {topContributors.map((contributor, index) => (
                <div key={contributor.id} className={`contributor-card ${contributor.isFounder ? 'founder' : ''}`}>
                  <div className="contributor-header">
                    <div className="contributor-avatar">
                      <div className="avatar-placeholder">
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {contributor.isFounder && (
                        <div className="founder-badge">
                          <Trophy size={14} />
                        </div>
                      )}
                    </div>
                    <div className="contributor-info">
                      <h3>{contributor.name}</h3>
                      <p className="username">@{contributor.username}</p>
                      <p className="role">{contributor.role}</p>
                    </div>
                    <div className="rank">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="contributor-stats">
                    <div className="stat-item">
                      <span className="stat-label">Contributions</span>
                      <span className="stat-value">{contributor.contributions}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">$BID Tokens</span>
                      <span className="stat-value">{contributor.bidTokens.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Equity Share</span>
                      <span className="stat-value">{contributor.equityPercent}%</span>
                    </div>
                  </div>

                  <div className="contributor-specialties">
                    {contributor.specialties.map((specialty, specIndex) => (
                      <span key={specIndex} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>

                  <div className="contributor-footer">
                    <span className="joined-date">
                      Joined {new Date(contributor.joinedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    <a 
                      href={contributor.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-link"
                    >
                      <Github size={16} />
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recognition */}
          <section className="recognition-section">
            <h2>Recognition & Rewards</h2>
            <div className="recognition-content">
              <div className="recognition-card">
                <h3>
                  <Award size={20} />
                  Contribution Tiers
                </h3>
                <div className="tiers">
                  <div className="tier">
                    <div className="tier-badge founder">Founder</div>
                    <p>Core team members who initiated the project</p>
                  </div>
                  <div className="tier">
                    <div className="tier-badge platinum">Platinum</div>
                    <p>100+ contributions, 0.5%+ equity</p>
                  </div>
                  <div className="tier">
                    <div className="tier-badge gold">Gold</div>
                    <p>50+ contributions, 0.3%+ equity</p>
                  </div>
                  <div className="tier">
                    <div className="tier-badge silver">Silver</div>
                    <p>25+ contributions, 0.1%+ equity</p>
                  </div>
                  <div className="tier">
                    <div className="tier-badge bronze">Bronze</div>
                    <p>5+ contributions, tokens earned</p>
                  </div>
                </div>
              </div>

              <div className="recognition-card">
                <h3>
                  <Star size={20} />
                  Reward Structure
                </h3>
                <div className="reward-info">
                  <div className="reward-item">
                    <h4>$BID Tokens</h4>
                    <p>Immediate rewards for merged contributions</p>
                  </div>
                  <div className="reward-item">
                    <h4>Equity Shares</h4>
                    <p>Long-term ownership in Bitcoin Identity Corp</p>
                  </div>
                  <div className="reward-item">
                    <h4>Governance Rights</h4>
                    <p>Voting power on project decisions</p>
                  </div>
                  <div className="reward-item">
                    <h4>Revenue Sharing</h4>
                    <p>Dividends from platform revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Join */}
          <section className="join-section">
            <h2>Join Our Community</h2>
            <div className="join-content">
              <div className="join-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <h3>Fork Repository</h3>
                  <p>Start by forking the Bitcoin Identity repository on GitHub</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <h3>Pick a Task</h3>
                  <p>Choose from our open issues or propose new features</p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <h3>Submit PR</h3>
                  <p>Create a pull request with your contribution</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <h3>Get Rewarded</h3>
                  <p>Earn tokens and equity for merged contributions</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2>Ready to Contribute?</h2>
            <div className="cta-content">
              <p>Join our growing community of developers and help shape the future of decentralized identity</p>
              <div className="cta-buttons">
                <a 
                  href="https://github.com/bitcoin-apps-suite/bitcoin-identity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-btn primary"
                >
                  <Github size={16} />
                  View Repository
                </a>
                <a 
                  href="/tasks" 
                  className="cta-btn secondary"
                >
                  <Target size={16} />
                  Browse Tasks
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}