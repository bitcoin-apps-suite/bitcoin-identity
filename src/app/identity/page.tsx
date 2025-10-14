'use client';

import React, { useState } from 'react';
import { Shield, Upload, Camera, FileText, Check, AlertCircle, User, MapPin, CreditCard } from 'lucide-react';

type VerificationLevel = 'none' | 'basic' | 'government' | 'address' | 'financial';

interface VerificationStatus {
  level: VerificationLevel;
  documents: {
    government_id: boolean;
    address_proof: boolean;
    financial_proof: boolean;
  };
  bsv_address?: string;
  verification_hash?: string;
}

export default function IdentityVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    level: 'none',
    documents: {
      government_id: false,
      address_proof: false,
      financial_proof: false
    }
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingDocument, setUploadingDocument] = useState<string | null>(null);

  const handleFileUpload = async (documentType: string, file: File) => {
    setUploadingDocument(documentType);
    
    // Simulate document verification process
    setTimeout(() => {
      setVerificationStatus(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: true
        },
        level: documentType === 'government_id' ? 'government' : 
               documentType === 'address_proof' ? 'address' : 'financial',
        bsv_address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        verification_hash: `${documentType}_${Date.now()}_hash`
      }));
      setUploadingDocument(null);
    }, 2000);
  };

  const DocumentUploadCard = ({ 
    title, 
    description, 
    documentType, 
    icon: Icon, 
    isVerified, 
    examples 
  }: {
    title: string;
    description: string;
    documentType: string;
    icon: any;
    isVerified: boolean;
    examples: string[];
  }) => (
    <div style={{
      background: isVerified ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.05)',
      border: `2px solid ${isVerified ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
      borderRadius: '12px',
      padding: '2rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Icon size={24} style={{ 
          color: isVerified ? '#22c55e' : '#3b82f6',
          marginRight: '0.75rem' 
        }} />
        <h3 style={{ 
          fontSize: '1.25rem', 
          color: isVerified ? '#22c55e' : '#3b82f6',
          margin: 0 
        }}>
          {title}
          {isVerified && <Check size={20} style={{ marginLeft: '0.5rem', display: 'inline' }} />}
        </h3>
      </div>
      
      <p style={{ 
        color: 'rgba(232, 244, 255, 0.8)', 
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        {description}
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ 
          color: '#fbbf24', 
          fontSize: '0.9rem', 
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Accepted Documents:
        </h4>
        <ul style={{ 
          listStyle: 'disc', 
          paddingLeft: '1.5rem', 
          color: 'rgba(232, 244, 255, 0.7)',
          fontSize: '0.9rem'
        }}>
          {examples.map((example, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{example}</li>
          ))}
        </ul>
      </div>

      {isVerified ? (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '8px',
          padding: '1rem',
          color: '#22c55e',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Check size={18} style={{ marginRight: '0.5rem' }} />
          Verified and recorded on BSV blockchain
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                handleFileUpload(documentType, file);
              }
            }}
            style={{ display: 'none' }}
            id={`${documentType}-upload`}
          />
          <label
            htmlFor={`${documentType}-upload`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              background: uploadingDocument === documentType ? 'rgba(251, 191, 36, 0.2)' : 'rgba(59, 130, 246, 0.2)',
              border: '2px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '8px',
              color: '#3b82f6',
              cursor: uploadingDocument === documentType ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
          >
            {uploadingDocument === documentType ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #fbbf24',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }} />
                Verifying...
              </>
            ) : (
              <>
                <Upload size={18} style={{ marginRight: '0.5rem' }} />
                Upload Document
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );

  const getVerificationLevelColor = (level: VerificationLevel) => {
    switch (level) {
      case 'none': return '#6b7280';
      case 'basic': return '#fbbf24';
      case 'government': return '#3b82f6';
      case 'address': return '#8b5cf6';
      case 'financial': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getVerificationLevelText = (level: VerificationLevel) => {
    switch (level) {
      case 'none': return 'No Verification';
      case 'basic': return 'Basic Profile';
      case 'government': return 'Government ID Verified';
      case 'address': return 'Address Verified';
      case 'financial': return 'Financially Verified';
      default: return 'Unknown';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1829 0%, #0a1220 100%)',
      color: '#e8f4ff',
      padding: '2rem'
    }}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        maxWidth: '1200px',
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
            Identity Verification
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(232, 244, 255, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Verify your government-issued identity documents to unlock full platform access and enable regulatory compliance.
          </p>
        </div>

        {/* Current Verification Status */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.05)',
          border: '2px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#3b82f6', 
            marginBottom: '1rem' 
          }}>
            Current Verification Level
          </h2>
          <div style={{
            fontSize: '1.25rem',
            color: getVerificationLevelColor(verificationStatus.level),
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {getVerificationLevelText(verificationStatus.level)}
          </div>
          {verificationStatus.bsv_address && (
            <div style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.9rem',
              color: 'rgba(232, 244, 255, 0.8)'
            }}>
              <strong>BSV Address:</strong> {verificationStatus.bsv_address}<br/>
              <strong>Verification Hash:</strong> {verificationStatus.verification_hash}
            </div>
          )}
        </div>

        {/* Document Upload Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <DocumentUploadCard
            title="Government ID"
            description="Upload your passport, driver's license, or national ID to verify your legal identity. This creates a government-backed attestation on the BSV blockchain."
            documentType="government_id"
            icon={User}
            isVerified={verificationStatus.documents.government_id}
            examples={[
              'Passport (all countries)',
              'Driver\'s License',
              'National Identity Card',
              'Military ID',
              'State-issued Photo ID'
            ]}
          />

          <DocumentUploadCard
            title="Address Verification"
            description="Prove your current residential address with official documents. Required for location-based services and regulatory compliance."
            documentType="address_proof"
            icon={MapPin}
            isVerified={verificationStatus.documents.address_proof}
            examples={[
              'Utility Bill (last 3 months)',
              'Bank Statement',
              'Lease Agreement',
              'Property Tax Statement',
              'Government Correspondence'
            ]}
          />

          <DocumentUploadCard
            title="Financial Verification"
            description="Verify your financial status for enhanced trading limits and premium features. Enables participation in regulated financial activities."
            documentType="financial_proof"
            icon={CreditCard}
            isVerified={verificationStatus.documents.financial_proof}
            examples={[
              'Bank Account Statement',
              'Credit Report',
              'Tax Return (W-2, 1099)',
              'Investment Account Statement',
              'Employment Verification Letter'
            ]}
          />
        </div>

        {/* Verification Process Info */}
        <div style={{
          background: 'rgba(251, 191, 36, 0.05)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <h3 style={{ 
            color: '#fbbf24', 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <AlertCircle size={20} style={{ marginRight: '0.5rem' }} />
            How Verification Works
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            color: 'rgba(232, 244, 255, 0.8)'
          }}>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>1. Document Upload</h4>
              <p>Upload clear photos or scans of your official documents. We support all major government-issued IDs.</p>
            </div>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>2. AI + Human Review</h4>
              <p>Our system uses AI for initial screening, followed by human verification specialists for accuracy.</p>
            </div>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>3. Blockchain Recording</h4>
              <p>Verified identity is hashed and recorded on BSV blockchain, creating immutable proof of verification.</p>
            </div>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>4. State Integration</h4>
              <p>Where possible, we cross-reference with government databases for additional verification layers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}