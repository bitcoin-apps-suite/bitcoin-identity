import React, { useState, useEffect } from 'react';
import './TickerSidebar.css';

interface IdentityPrice {
  symbol: string;
  name: string;
  price: number;
  price_usd: number;
  change24h: number;
  changePercent: number;
  change_24h: number;
  change_percent_24h: number;
  volume_24h: number;
  liquidity?: number;
  holders?: number;
  shareholders?: number;
  last_updated: Date;
  source: string;
  category?: string;
  isSpecial?: boolean;
  isIdentity?: boolean;
  isRevenueStream?: boolean;
  contractId?: string;
  platform?: string;
  verification?: 'verified' | 'pending' | 'unverified';
  kycStatus?: 'complete' | 'pending' | 'required';
  revenueToday?: number;
  totalRevenue?: number;
  payoutFrequency?: 'daily' | 'weekly' | 'monthly';
  lastPayout?: Date;
  nextPayout?: Date;
}

interface TickerSidebarProps {
  userHandle?: string;
}

const TickerSidebar: React.FC<TickerSidebarProps> = ({ userHandle }) => {
  const [identities, setIdentities] = useState<IdentityPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Generate tokenized identity properties with revenue streams
    const generateIdentityTokens = (): IdentityPrice[] => {
      // Revenue-generating identity properties
      const identityProperties = [
        { 
          base: 'ZERODICE', 
          name: 'Zero Dice ASMR Techno', 
          platform: 'YouTube/Music', 
          basePrice: 0.0445, 
          volatility: 0.5,
          isRevenueStream: true,
          revenueToday: 234.56,
          totalRevenue: 12456.78,
          payoutFrequency: 'weekly' as const
        },
        { 
          base: 'ZERODICE_SLEEPX', 
          name: 'Sleep X Track Revenue', 
          platform: 'Music NFT', 
          basePrice: 0.0789, 
          volatility: 0.6,
          isRevenueStream: true,
          revenueToday: 89.12,
          totalRevenue: 3456.78,
          payoutFrequency: 'daily' as const
        },
        { 
          base: 'BOASE_TWITTER', 
          name: '@b0ase Twitter Brand', 
          platform: 'Twitter', 
          basePrice: 0.0234, 
          volatility: 0.4,
          isRevenueStream: true,
          revenueToday: 45.67,
          totalRevenue: 8765.43,
          payoutFrequency: 'weekly' as const
        },
        { 
          base: 'BOASE_CORP', 
          name: 'Boase Corporation Shares', 
          platform: 'HandCash/$boase', 
          basePrice: 0.1567, 
          volatility: 0.3,
          isRevenueStream: true,
          revenueToday: 567.89,
          totalRevenue: 45678.90,
          payoutFrequency: 'monthly' as const
        },
        { 
          base: 'GHOSTHACKER', 
          name: 'Anonymous Tech Identity', 
          platform: 'GitHub/Twitter', 
          basePrice: 0.0356, 
          volatility: 0.7,
          isRevenueStream: true,
          revenueToday: 123.45,
          totalRevenue: 5432.10,
          payoutFrequency: 'weekly' as const
        },
        { 
          base: 'BITCOINOS_DEV', 
          name: 'Bitcoin OS Development', 
          platform: 'GitHub/OSS', 
          basePrice: 0.0456, 
          volatility: 0.4,
          isRevenueStream: true,
          revenueToday: 234.56,
          totalRevenue: 15678.90,
          payoutFrequency: 'weekly' as const
        }
      ];

      const identityTokens = identityProperties.map((property, index) => {
        const contractNum = Math.floor(Math.random() * 9000) + 1000;
        const contractId = `${property.base}_${contractNum}`;
        
        const liquidityMultiplier = Math.random() * 1.5 + 0.8; // More stable for revenue streams
        const basePrice = property.basePrice * liquidityMultiplier;
        const change = (Math.random() - 0.5) * basePrice * property.volatility;
        const liquidity = Math.floor(Math.random() * 25000 * liquidityMultiplier) + 5000;
        const shareholders = Math.floor(liquidity / 150 + Math.random() * 30);
        
        // Revenue streams have better verification status
        const verifications: Array<'verified' | 'pending' | 'unverified'> = ['verified', 'verified', 'pending'];
        const kycStatuses: Array<'complete' | 'pending' | 'required'> = ['complete', 'complete', 'pending'];
        
        // Calculate next payout date
        const now = new Date();
        const nextPayout = new Date(now);
        switch (property.payoutFrequency) {
          case 'daily':
            nextPayout.setDate(now.getDate() + 1);
            break;
          case 'weekly':
            nextPayout.setDate(now.getDate() + (7 - now.getDay()));
            break;
          case 'monthly':
            nextPayout.setMonth(now.getMonth() + 1);
            nextPayout.setDate(1);
            break;
        }
        
        return {
          symbol: property.base,
          name: property.name,
          platform: property.platform,
          category: 'Revenue Stream',
          contractId: contractId,
          price: basePrice,
          price_usd: basePrice,
          change24h: change,
          changePercent: (change / basePrice) * 100,
          change_24h: change,
          change_percent_24h: (change / basePrice) * 100,
          volume_24h: liquidity,
          liquidity: liquidity,
          shareholders: shareholders,
          last_updated: new Date(),
          source: 'Identity Protocol',
          isIdentity: true,
          isRevenueStream: property.isRevenueStream,
          isSpecial: property.platform.includes('HandCash') || property.platform.includes('Corporation'),
          verification: verifications[Math.floor(Math.random() * verifications.length)],
          kycStatus: kycStatuses[Math.floor(Math.random() * kycStatuses.length)],
          revenueToday: property.revenueToday,
          totalRevenue: property.totalRevenue,
          payoutFrequency: property.payoutFrequency,
          lastPayout: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          nextPayout: nextPayout
        };
      });

      // Add core tokens
      const coreTokens: IdentityPrice[] = [
        {
          symbol: 'BSV',
          name: 'Bitcoin SV',
          price: 45.67,
          price_usd: 45.67,
          change24h: 2.34,
          changePercent: 5.4,
          change_24h: 2.34,
          change_percent_24h: 5.4,
          volume_24h: 1250000,
          liquidity: 1250000,
          holders: 15000,
          last_updated: new Date(),
          source: 'CoinGecko',
          isSpecial: true,
          category: 'Core'
        },
        {
          symbol: 'IDENTITY',
          name: 'Bitcoin Identity Protocol',
          price: 0.0123,
          price_usd: 0.0123,
          change24h: 0.0012,
          changePercent: 10.8,
          change_24h: 0.0012,
          change_percent_24h: 10.8,
          volume_24h: 45000,
          liquidity: 45000,
          shareholders: 2340,
          last_updated: new Date(),
          source: 'Identity Protocol',
          isSpecial: true,
          category: 'Protocol Token',
          verification: 'verified' as const,
          kycStatus: 'complete' as const
        }
      ];

      // Add user's identity if available
      if (userHandle) {
        const userIdentity: IdentityPrice = {
          symbol: userHandle.toUpperCase(),
          name: `@${userHandle} Identity Portfolio`,
          price: 0.00789,
          price_usd: 0.00789,
          change24h: 0.00067,
          changePercent: 9.27,
          change_24h: 0.00067,
          change_percent_24h: 9.27,
          volume_24h: 12000,
          liquidity: 12000,
          holders: 156,
          last_updated: new Date(),
          source: 'Personal Portfolio',
          isSpecial: true,
          isIdentity: true,
          category: 'Personal',
          verification: 'verified',
          kycStatus: 'complete'
        };
        coreTokens.push(userIdentity);
      }

      // Sort identity tokens by liquidity
      identityTokens.sort((a, b) => (b.liquidity || 0) - (a.liquidity || 0));
      
      return [...coreTokens, ...identityTokens];
    };

    const tokens = generateIdentityTokens();
    setIdentities(tokens);
    setLastUpdate(new Date());
    setIsLoading(false);

    // Update every 30 seconds
    const interval = setInterval(() => {
      const updatedTokens = generateIdentityTokens();
      setIdentities(updatedTokens);
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [userHandle]);

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatVolume = (volume?: number): string => {
    if (!volume) return 'N/A';
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const getVerificationIcon = (verification?: string): string => {
    switch (verification) {
      case 'verified': return '✅';
      case 'pending': return '⏳';
      case 'unverified': return '❌';
      default: return '';
    }
  };

  const getKYCColor = (status?: string): string => {
    switch (status) {
      case 'complete': return '#4CAF50';
      case 'pending': return '#FFC107';
      case 'required': return '#f44336';
      default: return '#666';
    }
  };

  const formatRevenue = (amount?: number): string => {
    if (!amount) return 'N/A';
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const formatDaysUntil = (date?: Date): string => {
    if (!date) return 'N/A';
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days}d`;
  };

  return (
    <div className={`ticker-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="ticker-header">
        <h3>Identity Market</h3>
        <div className="ticker-header-controls">
          <button 
            className="ticker-toggle"
            onClick={() => {
              const newCollapsed = !isCollapsed;
              setIsCollapsed(newCollapsed);
              window.dispatchEvent(new CustomEvent('tickerToggled', { detail: newCollapsed }));
            }}
            title={isCollapsed ? 'Expand ticker' : 'Collapse ticker'}
          >
            {isCollapsed ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {isLoading ? (
            <div className="ticker-loading">Loading identities...</div>
          ) : (
            <div className="ticker-list">
              {identities.map((identity, index) => {
                const showDivider = identity.isSpecial && 
                  index < identities.length - 1 && 
                  !identities[index + 1].isSpecial;
                
                return (
                  <React.Fragment key={identity.symbol}>
                    <div className={`ticker-item ${identity.isSpecial ? 'special' : ''} ${identity.isIdentity ? 'identity' : ''}`}>
                      <div className="ticker-symbol-row">
                        <span className="ticker-symbol">${identity.symbol}</span>
                        <div className="ticker-status">
                          {identity.verification && (
                            <span className="verification-icon">
                              {getVerificationIcon(identity.verification)}
                            </span>
                          )}
                          <span className={`ticker-change ${identity.change24h >= 0 ? 'positive' : 'negative'}`}>
                            {identity.change24h >= 0 ? '↑' : '↓'} {Math.abs(identity.changePercent).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="ticker-name">
                        {identity.name}
                        {identity.platform && (
                          <span className="ticker-platform"> • {identity.platform}</span>
                        )}
                      </div>
                      
                      <div className="ticker-price-row">
                        <span className="ticker-price">{formatPrice(identity.price)}</span>
                        {identity.contractId && (
                          <span className="ticker-contract-id">#{identity.contractId}</span>
                        )}
                      </div>
                      
                      <div className="ticker-stats">
                        {identity.isRevenueStream && identity.revenueToday ? (
                          <span className="ticker-revenue">
                            Today: {formatRevenue(identity.revenueToday)}
                          </span>
                        ) : identity.volume_24h && (
                          <span className="ticker-volume">
                            Vol: {formatVolume(identity.volume_24h)}
                          </span>
                        )}
                        {identity.isRevenueStream && identity.nextPayout ? (
                          <span className="ticker-payout">
                            Payout: {formatDaysUntil(identity.nextPayout)}
                          </span>
                        ) : identity.kycStatus && (
                          <span 
                            className="ticker-kyc"
                            style={{ color: getKYCColor(identity.kycStatus) }}
                          >
                            KYC: {identity.kycStatus}
                          </span>
                        )}
                        {identity.shareholders !== undefined ? (
                          <span className="ticker-holders">
                            {identity.shareholders} shares
                          </span>
                        ) : identity.holders !== undefined && (
                          <span className="ticker-holders">
                            {identity.holders} holders
                          </span>
                        )}
                      </div>
                    </div>
                    {showDivider && (
                      <div className="ticker-divider">
                        <span>Revenue Streams</span>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          <div className="ticker-footer">
            <div className="ticker-disclaimer">
              Identity prices update every 30s
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TickerSidebar;