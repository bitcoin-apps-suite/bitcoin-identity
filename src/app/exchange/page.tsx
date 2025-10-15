'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Activity, Users, DollarSign, ArrowUpDown } from 'lucide-react';
import './ExchangePage.css';
import Footer from '../../components/Footer';

export default function ExchangePage() {
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

  // Mock data for demonstration
  const tradingPairs = [
    { pair: 'BSV/USD', price: '$45.23', change: '+2.4%', volume: '1.2M' },
    { pair: 'BID/BSV', price: '0.001', change: '-0.8%', volume: '245K' },
    { pair: 'BID/USD', price: '$0.045', change: '+5.2%', volume: '890K' },
  ];

  const recentTrades = [
    { time: '14:32:01', pair: 'BSV/USD', type: 'BUY', amount: '10.5', price: '$45.23' },
    { time: '14:31:45', pair: 'BID/BSV', type: 'SELL', amount: '1000', price: '0.001' },
    { time: '14:31:12', pair: 'BSV/USD', type: 'BUY', amount: '5.2', price: '$45.20' },
  ];

  return (
    <div className="App">
      <div className={`exchange-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
      <div className="exchange-container">
        {/* Hero Section */}
        <section className="exchange-hero">
          <h1><span style={{color: '#ffffff'}}>Bitcoin Identity</span> <span style={{color: '#3b82f6'}}>Exchange</span></h1>
          <p className="exchange-tagline">
            Trade Bitcoin SV and application tokens with real-time market data
          </p>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h2>Exchange Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <TrendingUp size={20} className="stat-icon" />
              <h3>24h Volume</h3>
              <p className="stat-value">$2.4M</p>
              <p className="stat-label">Trading volume</p>
            </div>
            
            <div className="stat">
              <Users size={20} className="stat-icon" />
              <h3>Active Traders</h3>
              <p className="stat-value">1,247</p>
              <p className="stat-label">Online users</p>
            </div>
            
            <div className="stat">
              <Activity size={20} className="stat-icon" />
              <h3>Trading Pairs</h3>
              <p className="stat-value">3</p>
              <p className="stat-label">Available pairs</p>
            </div>
            
            <div className="stat">
              <DollarSign size={20} className="stat-icon" />
              <h3>BSV Price</h3>
              <p className="stat-value">$45.23</p>
              <p className="stat-label">Current price</p>
            </div>
          </div>
        </section>

        {/* Trading Section */}
        <section className="trading-section">
          <div className="trading-grid">
            {/* Trading Pairs */}
            <div className="trading-card">
              <h3>
                <BarChart3 size={20} />
                Trading Pairs
              </h3>
              
              <div className="table-container">
                <table className="trading-table">
                  <thead>
                    <tr>
                      <th>Pair</th>
                      <th>Price</th>
                      <th>Change</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradingPairs.map((pair, index) => (
                      <tr key={index}>
                        <td className="pair-name">{pair.pair}</td>
                        <td className="price">{pair.price}</td>
                        <td className={`change ${pair.change.startsWith('+') ? 'positive' : 'negative'}`}>
                          {pair.change}
                        </td>
                        <td className="volume">{pair.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="trading-card">
              <h3>
                <ArrowUpDown size={20} />
                Recent Trades
              </h3>
              
              <div className="table-container">
                <table className="trading-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((trade, index) => (
                      <tr key={index}>
                        <td className="time">{trade.time}</td>
                        <td className={`type ${trade.type.toLowerCase()}`}>
                          {trade.type}
                        </td>
                        <td className="amount">{trade.amount}</td>
                        <td className="price">{trade.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Interface Section */}
        <section className="trading-interface-section">
          <h2>Trading Interface</h2>
          <div className="trading-interface">
            <p>
              Implement your trading interface here with order books, chart widgets, and order placement forms.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                Place Buy Order
              </button>
              <button className="cta-btn primary">
                Place Sell Order
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </div>
  );
}