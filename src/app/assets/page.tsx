'use client';

import React, { useState } from 'react';
import { 
  Home, Car, Briefcase, CreditCard, Palette, Code, 
  Plus, Search, Filter, ExternalLink, Hash, Calendar,
  DollarSign, TrendingUp, Shield, MapPin 
} from 'lucide-react';

interface Asset {
  id: string;
  type: 'real_estate' | 'vehicle' | 'financial' | 'intellectual' | 'business' | 'personal';
  name: string;
  description: string;
  value?: number;
  currency: string;
  bsv_token_address: string;
  verification_status: 'pending' | 'verified' | 'disputed';
  created_date: string;
  last_updated: string;
  metadata: Record<string, any>;
}

export default function AssetTrackingPage() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      type: 'real_estate',
      name: 'Primary Residence',
      description: '123 Main St, San Francisco, CA',
      value: 1250000,
      currency: 'USD',
      bsv_token_address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      verification_status: 'verified',
      created_date: '2024-01-15',
      last_updated: '2024-10-14',
      metadata: {
        property_type: 'Single Family Home',
        square_feet: 2400,
        bedrooms: 3,
        bathrooms: 2,
        deed_number: 'SF-2024-001234'
      }
    },
    {
      id: '2',
      type: 'vehicle',
      name: '2023 Tesla Model S',
      description: 'Electric sedan, white exterior',
      value: 89000,
      currency: 'USD',
      bsv_token_address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      verification_status: 'verified',
      created_date: '2023-06-20',
      last_updated: '2024-10-14',
      metadata: {
        vin: '5YJ3E1EA*PF123456',
        license_plate: 'BSV-2024',
        mileage: 15420,
        color: 'Pearl White'
      }
    },
    {
      id: '3',
      type: 'intellectual',
      name: 'Bitcoin Identity Platform',
      description: 'Open-source identity management system',
      value: 500000,
      currency: 'USD',
      bsv_token_address: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH',
      verification_status: 'pending',
      created_date: '2024-10-14',
      last_updated: '2024-10-14',
      metadata: {
        patent_status: 'pending',
        repository: 'github.com/bitcoin-identity',
        license: 'MIT',
        contributors: 5
      }
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assetTypes = [
    { id: 'all', name: 'All Assets', icon: Filter },
    { id: 'real_estate', name: 'Real Estate', icon: Home },
    { id: 'vehicle', name: 'Vehicles', icon: Car },
    { id: 'financial', name: 'Financial', icon: CreditCard },
    { id: 'intellectual', name: 'IP & Patents', icon: Palette },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'personal', name: 'Personal', icon: Shield }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return '#22c55e';
      case 'pending': return '#fbbf24';
      case 'disputed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Verified on BSV';
      case 'pending': return 'Verification Pending';
      case 'disputed': return 'Under Dispute';
      default: return 'Unknown';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'real_estate': return Home;
      case 'vehicle': return Car;
      case 'financial': return CreditCard;
      case 'intellectual': return Palette;
      case 'business': return Briefcase;
      case 'personal': return Shield;
      default: return Shield;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalValue = assets
    .filter(asset => asset.value)
    .reduce((sum, asset) => sum + (asset.value || 0), 0);

  const verifiedAssets = assets.filter(asset => asset.verification_status === 'verified').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1829 0%, #0a1220 100%)',
      color: '#e8f4ff',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #3b82f6, #fbbf24)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            Asset Ownership Registry
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(232, 244, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Track and verify ownership of all your assets on the BSV blockchain. 
            From real estate to intellectual property, create immutable proof of ownership.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <DollarSign size={32} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
              ${totalValue.toLocaleString()}
            </div>
            <div style={{ color: 'rgba(232, 244, 255, 0.8)' }}>Total Asset Value</div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '2px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <Shield size={32} style={{ color: '#22c55e', marginBottom: '1rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', marginBottom: '0.5rem' }}>
              {verifiedAssets}
            </div>
            <div style={{ color: 'rgba(232, 244, 255, 0.8)' }}>Verified Assets</div>
          </div>

          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <TrendingUp size={32} style={{ color: '#fbbf24', marginBottom: '1rem' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '0.5rem' }}>
              {assets.length}
            </div>
            <div style={{ color: 'rgba(232, 244, 255, 0.8)' }}>Total Assets</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          alignItems: 'center'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(232, 244, 255, 0.6)'
            }} />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '8px',
                color: '#e8f4ff',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Add Asset Button */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(34, 197, 94, 0.2)',
            border: '2px solid rgba(34, 197, 94, 0.4)',
            borderRadius: '8px',
            color: '#22c55e',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}>
            <Plus size={18} />
            Add Asset
          </button>
        </div>

        {/* Asset Type Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {assetTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  border: `2px solid ${isSelected ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)'}`,
                  borderRadius: '6px',
                  color: isSelected ? '#3b82f6' : 'rgba(232, 244, 255, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem'
                }}
              >
                <Icon size={16} />
                {type.name}
              </button>
            );
          })}
        </div>

        {/* Assets Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {filteredAssets.map((asset) => {
            const Icon = getTypeIcon(asset.type);
            return (
              <div
                key={asset.id}
                style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '2px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Asset Header */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Icon size={24} style={{ color: '#3b82f6', marginRight: '0.75rem' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      color: '#3b82f6', 
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {asset.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: getStatusColor(asset.verification_status)
                      }} />
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: getStatusColor(asset.verification_status)
                      }}>
                        {getStatusText(asset.verification_status)}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={16} style={{ color: 'rgba(232, 244, 255, 0.6)' }} />
                </div>

                {/* Description */}
                <p style={{ 
                  color: 'rgba(232, 244, 255, 0.8)', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {asset.description}
                </p>

                {/* Value */}
                {asset.value && (
                  <div style={{
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      color: '#fbbf24',
                      marginBottom: '0.25rem'
                    }}>
                      ${asset.value.toLocaleString()} {asset.currency}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: 'rgba(232, 244, 255, 0.7)'
                    }}>
                      Last updated: {new Date(asset.last_updated).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* BSV Token Address */}
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem' 
                  }}>
                    <Hash size={16} style={{ color: '#22c55e', marginRight: '0.5rem' }} />
                    <span style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      BSV Token Address
                    </span>
                  </div>
                  <div style={{ 
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    color: 'rgba(232, 244, 255, 0.8)',
                    wordBreak: 'break-all'
                  }}>
                    {asset.bsv_token_address}
                  </div>
                </div>

                {/* Metadata Preview */}
                {Object.keys(asset.metadata).length > 0 && (
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(232, 244, 255, 0.7)'
                  }}>
                    {Object.entries(asset.metadata).slice(0, 2).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: '0.25rem' }}>
                        <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                      </div>
                    ))}
                    {Object.keys(asset.metadata).length > 2 && (
                      <div style={{ color: '#3b82f6', fontStyle: 'italic' }}>
                        +{Object.keys(asset.metadata).length - 2} more details...
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(232, 244, 255, 0.6)'
          }}>
            <Shield size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Assets Found</h3>
            <p style={{ marginBottom: '2rem' }}>
              {searchTerm || selectedType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by adding your first asset to the blockchain registry.'
              }
            </p>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(59, 130, 246, 0.2)',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '8px',
              color: '#3b82f6',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '1rem'
            }}>
              <Plus size={18} />
              Add Your First Asset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}