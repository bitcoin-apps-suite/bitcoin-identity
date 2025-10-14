'use client';

import React, { useState } from 'react';
import { 
  Shield, CheckCircle, AlertTriangle, XCircle, Clock,
  User, MapPin, CreditCard, FileText, Download, 
  RefreshCw, Flag, Eye, Search, Filter
} from 'lucide-react';

interface ComplianceRecord {
  id: string;
  user_id: string;
  user_name: string;
  email: string;
  kyc_level: 'basic' | 'standard' | 'enhanced';
  aml_status: 'clear' | 'flagged' | 'under_review' | 'blocked';
  risk_score: number;
  verification_date: string;
  last_review: string;
  documents_verified: string[];
  flags: ComplianceFlag[];
  bsv_identity_hash: string;
  jurisdiction: string;
}

interface ComplianceFlag {
  id: string;
  type: 'watchlist' | 'pep' | 'sanctions' | 'adverse_media' | 'high_risk_country';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  created_date: string;
  resolved: boolean;
}

export default function ComplianceDashboard() {
  const [records] = useState<ComplianceRecord[]>([
    {
      id: '1',
      user_id: 'usr_001',
      user_name: 'John Smith',
      email: 'john.smith@example.com',
      kyc_level: 'enhanced',
      aml_status: 'clear',
      risk_score: 15,
      verification_date: '2024-09-15',
      last_review: '2024-10-10',
      documents_verified: ['passport', 'address_proof', 'bank_statement'],
      flags: [],
      bsv_identity_hash: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      jurisdiction: 'US'
    },
    {
      id: '2',
      user_id: 'usr_002',
      user_name: 'Maria González',
      email: 'maria.gonzalez@example.com',
      kyc_level: 'standard',
      aml_status: 'under_review',
      risk_score: 45,
      verification_date: '2024-10-01',
      last_review: '2024-10-12',
      documents_verified: ['passport', 'address_proof'],
      flags: [
        {
          id: 'flag_001',
          type: 'high_risk_country',
          severity: 'medium',
          description: 'User location in high-risk jurisdiction',
          created_date: '2024-10-01',
          resolved: false
        }
      ],
      bsv_identity_hash: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      jurisdiction: 'MX'
    },
    {
      id: '3',
      user_id: 'usr_003',
      user_name: 'Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      kyc_level: 'basic',
      aml_status: 'flagged',
      risk_score: 75,
      verification_date: '2024-10-05',
      last_review: '2024-10-14',
      documents_verified: ['passport'],
      flags: [
        {
          id: 'flag_002',
          type: 'watchlist',
          severity: 'high',
          description: 'Name match on international watchlist',
          created_date: '2024-10-05',
          resolved: false
        },
        {
          id: 'flag_003',
          type: 'adverse_media',
          severity: 'medium',
          description: 'Negative media coverage found',
          created_date: '2024-10-06',
          resolved: false
        }
      ],
      bsv_identity_hash: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH',
      jurisdiction: 'AE'
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getKYCLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return '#fbbf24';
      case 'standard': return '#3b82f6';
      case 'enhanced': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getAMLStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return '#22c55e';
      case 'under_review': return '#fbbf24';
      case 'flagged': return '#f97316';
      case 'blocked': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 25) return '#22c55e';
    if (score <= 50) return '#fbbf24';
    if (score <= 75) return '#f97316';
    return '#ef4444';
  };

  const getFlagSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#22c55e';
      case 'medium': return '#fbbf24';
      case 'high': return '#f97316';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.aml_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statsData = {
    total: records.length,
    clear: records.filter(r => r.aml_status === 'clear').length,
    under_review: records.filter(r => r.aml_status === 'under_review').length,
    flagged: records.filter(r => r.aml_status === 'flagged').length,
    blocked: records.filter(r => r.aml_status === 'blocked').length,
    high_risk: records.filter(r => r.risk_score > 50).length
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1829 0%, #0a1220 100%)',
      color: '#e8f4ff',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #3b82f6, #fbbf24)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            KYC/AML Compliance Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(232, 244, 255, 0.8)',
            maxWidth: '800px'
          }}>
            Monitor and manage regulatory compliance across all verified identities. 
            Real-time risk assessment and automated flagging system.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <User size={24} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {statsData.total}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.8)' }}>
              Total Users
            </div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '2px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <CheckCircle size={24} style={{ color: '#22c55e', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
              {statsData.clear}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.8)' }}>
              Clear Status
            </div>
          </div>

          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <Clock size={24} style={{ color: '#fbbf24', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
              {statsData.under_review}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.8)' }}>
              Under Review
            </div>
          </div>

          <div style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '2px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <Flag size={24} style={{ color: '#f97316', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f97316' }}>
              {statsData.flagged}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.8)' }}>
              Flagged
            </div>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <AlertTriangle size={24} style={{ color: '#ef4444', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
              {statsData.high_risk}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.8)' }}>
              High Risk
            </div>
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
              placeholder="Search users..."
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              color: '#e8f4ff',
              fontSize: '1rem'
            }}
          >
            <option value="all">All Status</option>
            <option value="clear">Clear</option>
            <option value="under_review">Under Review</option>
            <option value="flagged">Flagged</option>
            <option value="blocked">Blocked</option>
          </select>

          {/* Export Button */}
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
            fontSize: '1rem'
          }}>
            <Download size={16} />
            Export Report
          </button>
        </div>

        {/* Records Table */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.05)',
          border: '2px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
            gap: '1rem',
            padding: '1rem 2rem',
            background: 'rgba(59, 130, 246, 0.1)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            color: '#3b82f6'
          }}>
            <div>User</div>
            <div>KYC Level</div>
            <div>AML Status</div>
            <div>Risk Score</div>
            <div>Last Review</div>
            <div>Actions</div>
          </div>

          {filteredRecords.map((record) => (
            <div
              key={record.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
                gap: '1rem',
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
                transition: 'background 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              onClick={() => setSelectedRecord(record)}
            >
              {/* User Info */}
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {record.user_name}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.7)' }}>
                  {record.email}
                </div>
                {record.flags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                    {record.flags.slice(0, 2).map((flag) => (
                      <div
                        key={flag.id}
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          background: getFlagSeverityColor(flag.severity),
                          color: 'white',
                          borderRadius: '4px'
                        }}
                      >
                        {flag.type.replace('_', ' ')}
                      </div>
                    ))}
                    {record.flags.length > 2 && (
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: 'rgba(232, 244, 255, 0.6)' 
                      }}>
                        +{record.flags.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* KYC Level */}
              <div style={{
                color: getKYCLevelColor(record.kyc_level),
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {record.kyc_level}
              </div>

              {/* AML Status */}
              <div style={{
                color: getAMLStatusColor(record.aml_status),
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {record.aml_status.replace('_', ' ')}
              </div>

              {/* Risk Score */}
              <div style={{
                color: getRiskColor(record.risk_score),
                fontWeight: 'bold'
              }}>
                {record.risk_score}%
              </div>

              {/* Last Review */}
              <div style={{ fontSize: '0.9rem', color: 'rgba(232, 244, 255, 0.8)' }}>
                {new Date(record.last_review).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  style={{
                    padding: '0.25rem',
                    background: 'transparent',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '4px',
                    color: '#3b82f6',
                    cursor: 'pointer'
                  }}
                  title="View Details"
                >
                  <Eye size={14} />
                </button>
                <button
                  style={{
                    padding: '0.25rem',
                    background: 'transparent',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '4px',
                    color: '#fbbf24',
                    cursor: 'pointer'
                  }}
                  title="Refresh Check"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(232, 244, 255, 0.6)'
          }}>
            <Shield size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Records Found</h3>
            <p>No compliance records match your current search criteria.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f1829 0%, #0a1220 100%)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ color: '#3b82f6', fontSize: '1.5rem' }}>
                Compliance Details: {selectedRecord.user_name}
              </h2>
              <button
                onClick={() => setSelectedRecord(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(232, 244, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ×
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {/* Basic Info */}
              <div>
                <h3 style={{ color: '#fbbf24', marginBottom: '1rem' }}>Basic Information</h3>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Email:</strong> {selectedRecord.email}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>User ID:</strong> {selectedRecord.user_id}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Jurisdiction:</strong> {selectedRecord.jurisdiction}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>BSV Hash:</strong>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.8rem',
                    color: 'rgba(232, 244, 255, 0.7)',
                    wordBreak: 'break-all',
                    marginTop: '0.25rem'
                  }}>
                    {selectedRecord.bsv_identity_hash}
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h3 style={{ color: '#fbbf24', marginBottom: '1rem' }}>Verification Status</h3>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>KYC Level:</strong>{' '}
                  <span style={{ color: getKYCLevelColor(selectedRecord.kyc_level) }}>
                    {selectedRecord.kyc_level.toUpperCase()}
                  </span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>AML Status:</strong>{' '}
                  <span style={{ color: getAMLStatusColor(selectedRecord.aml_status) }}>
                    {selectedRecord.aml_status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Risk Score:</strong>{' '}
                  <span style={{ color: getRiskColor(selectedRecord.risk_score) }}>
                    {selectedRecord.risk_score}%
                  </span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Verified:</strong> {new Date(selectedRecord.verification_date).toLocaleDateString()}
                </div>
                <div>
                  <strong>Last Review:</strong> {new Date(selectedRecord.last_review).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#fbbf24', marginBottom: '1rem' }}>Verified Documents</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedRecord.documents_verified.map((doc) => (
                  <div
                    key={doc}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '6px',
                      color: '#22c55e',
                      fontSize: '0.9rem'
                    }}
                  >
                    {doc.replace('_', ' ').toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Flags */}
            {selectedRecord.flags.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ color: '#fbbf24', marginBottom: '1rem' }}>Compliance Flags</h3>
                {selectedRecord.flags.map((flag) => (
                  <div
                    key={flag.id}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        color: getFlagSeverityColor(flag.severity),
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem'
                      }}>
                        {flag.type.replace('_', ' ')} - {flag.severity}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'rgba(232, 244, 255, 0.6)'
                      }}>
                        {new Date(flag.created_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ color: 'rgba(232, 244, 255, 0.8)' }}>
                      {flag.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}