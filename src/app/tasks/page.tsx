'use client';

import React, { useState, useEffect } from 'react';
import './TasksPage.css';
import Footer from '../../components/Footer';
import { CheckSquare, Clock, DollarSign, Users, GitBranch, Star, Award, Target } from 'lucide-react';

export default function TasksPage() {
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

  const priorityTasks = [
    {
      id: 1,
      title: 'Complete User Authentication & Onboarding Flow',
      description: 'Implement secure user registration, login, and onboarding with email verification, password reset, and initial identity setup wizard',
      difficulty: 'Medium',
      estimatedHours: 40,
      bidTokens: 8000,
      equityPercent: 0.8,
      skills: ['React', 'Node.js', 'Authentication', 'Email Services', 'UI/UX'],
      status: 'Open'
    },
    {
      id: 2,
      title: 'Identity Document Upload & Verification',
      description: 'Build document upload system for government IDs, passports, and other identity documents with automated verification workflows',
      difficulty: 'Hard',
      estimatedHours: 60,
      bidTokens: 12000,
      equityPercent: 1.2,
      skills: ['Document Processing', 'OCR', 'Machine Learning', 'Security', 'Compliance'],
      status: 'Open'
    },
    {
      id: 3,
      title: 'Bitcoin SV Wallet Integration',
      description: 'Integrate HandCash Connect SDK for wallet operations, payments, and Bitcoin SV identity transactions',
      difficulty: 'Hard',
      estimatedHours: 50,
      bidTokens: 10000,
      equityPercent: 1.0,
      skills: ['Bitcoin SV', 'HandCash SDK', 'Cryptocurrency', 'API Integration'],
      status: 'Open'
    }
  ];

  const taskCategories = [
    {
      category: 'Frontend Development',
      tasks: [
        { title: 'Complete responsive dashboard UI components', tokens: 4000, equity: 0.4 },
        { title: 'Identity profile management interface', tokens: 3000, equity: 0.3 },
        { title: 'Document upload and management UI', tokens: 3500, equity: 0.35 },
        { title: 'Verification status and history display', tokens: 2500, equity: 0.25 }
      ]
    },
    {
      category: 'Backend & API Development',
      tasks: [
        { title: 'User authentication and session management', tokens: 5000, equity: 0.5 },
        { title: 'Document processing and storage APIs', tokens: 6000, equity: 0.6 },
        { title: 'Identity verification workflow engine', tokens: 8000, equity: 0.8 },
        { title: 'Email notification and communication system', tokens: 3000, equity: 0.3 }
      ]
    },
    {
      category: 'Database & Storage',
      tasks: [
        { title: 'User profile and identity data models', tokens: 3000, equity: 0.3 },
        { title: 'Document storage with encryption', tokens: 4000, equity: 0.4 },
        { title: 'Verification audit trail system', tokens: 2500, equity: 0.25 },
        { title: 'Database optimization and indexing', tokens: 2000, equity: 0.2 }
      ]
    },
    {
      category: 'Bitcoin Integration',
      tasks: [
        { title: 'HandCash wallet connection and payments', tokens: 6000, equity: 0.6 },
        { title: 'Bitcoin SV transaction processing', tokens: 5000, equity: 0.5 },
        { title: 'Identity token creation and management', tokens: 4000, equity: 0.4 },
        { title: 'Blockchain identity anchoring', tokens: 4500, equity: 0.45 }
      ]
    },
    {
      category: 'Security & Compliance',
      tasks: [
        { title: 'Data encryption and security implementation', tokens: 5000, equity: 0.5 },
        { title: 'GDPR compliance and privacy controls', tokens: 4000, equity: 0.4 },
        { title: 'Security audit and vulnerability testing', tokens: 3500, equity: 0.35 },
        { title: 'Identity verification compliance workflows', tokens: 3000, equity: 0.3 }
      ]
    },
    {
      category: 'Testing & Deployment',
      tasks: [
        { title: 'Unit and integration test suite', tokens: 3000, equity: 0.3 },
        { title: 'End-to-end testing automation', tokens: 2500, equity: 0.25 },
        { title: 'Production deployment and CI/CD', tokens: 2000, equity: 0.2 },
        { title: 'Performance monitoring and logging', tokens: 1500, equity: 0.15 }
      ]
    }
  ];

  const totalEquity = taskCategories.reduce((total, category) => 
    total + category.tasks.reduce((catTotal, task) => catTotal + task.equity, 0), 0
  ) + priorityTasks.reduce((total, task) => total + task.equityPercent, 0);

  return (
    <div className="App">
      <div className={`tasks-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
        <div className="tasks-container">
          {/* Hero Section */}
          <section className="tasks-hero">
            <h1><span style={{color: '#ffffff'}}>Bitcoin Identity</span> <span style={{color: '#3b82f6'}}>Tasks</span></h1>
            <p className="tasks-tagline">
              Contribute to the future of decentralized identity and earn $BID tokens
            </p>
            <div className="equity-badge">
              {totalEquity.toFixed(1)}% Total Equity Available
            </div>
          </section>

          {/* Overview Stats */}
          <section className="stats-section">
            <h2>Task Overview</h2>
            <div className="stats-grid">
              <div className="stat">
                <CheckSquare size={20} className="stat-icon" />
                <h3>Open Tasks</h3>
                <p className="stat-value">47</p>
                <p className="stat-label">Available to claim</p>
              </div>
              
              <div className="stat">
                <Clock size={20} className="stat-icon" />
                <h3>In Progress</h3>
                <p className="stat-value">12</p>
                <p className="stat-label">Being worked on</p>
              </div>
              
              <div className="stat">
                <DollarSign size={20} className="stat-icon" />
                <h3>Total Rewards</h3>
                <p className="stat-value">125,000</p>
                <p className="stat-label">$BID tokens</p>
              </div>
              
              <div className="stat">
                <Users size={20} className="stat-icon" />
                <h3>Contributors</h3>
                <p className="stat-value">8</p>
                <p className="stat-label">Active developers</p>
              </div>
            </div>
          </section>

          {/* Priority Tasks */}
          <section className="priority-section">
            <h2>High Priority Tasks</h2>
            <div className="priority-tasks">
              {priorityTasks.map((task) => (
                <div key={task.id} className="priority-task">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <div className="task-badges">
                      <span className={`difficulty ${task.difficulty.toLowerCase()}`}>
                        {task.difficulty}
                      </span>
                      <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="task-description">{task.description}</p>
                  
                  <div className="task-details">
                    <div className="detail">
                      <Clock size={16} />
                      <span>{task.estimatedHours}h estimated</span>
                    </div>
                    <div className="detail">
                      <DollarSign size={16} />
                      <span>{task.bidTokens.toLocaleString()} $BID tokens</span>
                    </div>
                    <div className="detail">
                      <Star size={16} />
                      <span>{task.equityPercent}% equity share</span>
                    </div>
                  </div>
                  
                  <div className="task-skills">
                    {task.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="task-actions">
                    <button className="cta-btn primary">
                      <GitBranch size={16} />
                      Claim Task
                    </button>
                    <button className="cta-btn secondary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Task Categories */}
          <section className="categories-section">
            <h2>All Task Categories</h2>
            <div className="categories-grid">
              {taskCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="category-card">
                  <h3>{category.category}</h3>
                  <div className="category-tasks">
                    {category.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="category-task">
                        <div className="task-info">
                          <h4>{task.title}</h4>
                          <div className="task-rewards">
                            <span className="tokens">{task.tokens.toLocaleString()} $BID</span>
                            <span className="equity">{task.equity}% equity</span>
                          </div>
                        </div>
                        <button className="claim-btn">Claim</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Contribute */}
          <section className="contribute-section">
            <h2>How to Get Started</h2>
            <div className="contribute-steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Choose a Task</h3>
                <p>Browse tasks by category or priority and find one that matches your skills</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Claim & Fork</h3>
                <p>Claim the task on GitHub and fork the repository to start development</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Build & Test</h3>
                <p>Implement the feature with comprehensive tests and documentation</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Submit PR</h3>
                <p>Create a pull request with clear description and get it reviewed</p>
              </div>
              <div className="step">
                <div className="step-number">5</div>
                <h3>Earn Rewards</h3>
                <p>Once merged, receive $BID tokens and equity allocation automatically</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2>Ready to Contribute?</h2>
            <div className="cta-content">
              <p>Join our community of developers building the future of decentralized identity</p>
              <div className="cta-buttons">
                <a 
                  href="https://github.com/bitcoin-apps-suite/bitcoin-identity/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cta-btn primary"
                >
                  <Target size={16} />
                  View GitHub Issues
                </a>
                <a 
                  href="/docs" 
                  className="cta-btn secondary"
                >
                  Read Developer Docs
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