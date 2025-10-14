'use client';

import React, { useState } from 'react';
import { Check, AlertCircle, Upload, FileText, Camera, Clock } from 'lucide-react';

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  examples: string[];
  required: boolean;
}

export interface VerificationResult {
  document_id: string;
  status: 'pending' | 'verified' | 'rejected';
  bsv_hash?: string;
  verification_date?: string;
  expiry_date?: string;
  errors?: string[];
}

interface DocumentVerificationProps {
  documentType: DocumentType;
  onVerificationComplete: (result: VerificationResult) => void;
  existingResult?: VerificationResult;
}

export default function DocumentVerification({ 
  documentType, 
  onVerificationComplete, 
  existingResult 
}: DocumentVerificationProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    
    // Simulate document verification process
    // In real implementation, this would:
    // 1. Upload to secure storage
    // 2. Run OCR/AI verification
    // 3. Create BSV transaction with document hash
    // 4. Integrate with government databases where possible
    
    setTimeout(() => {
      const result: VerificationResult = {
        document_id: documentType.id,
        status: 'verified',
        bsv_hash: `bsv_${documentType.id}_${Date.now()}_hash`,
        verification_date: new Date().toISOString(),
        expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      };
      
      onVerificationComplete(result);
      setUploading(false);
      setSelectedFile(null);
    }, 3000);
  };

  const isVerified = existingResult?.status === 'verified';
  const isPending = existingResult?.status === 'pending';
  const isRejected = existingResult?.status === 'rejected';

  return (
    <div style={{
      background: isVerified ? 'rgba(34, 197, 94, 0.05)' : 
                 isPending ? 'rgba(251, 191, 36, 0.05)' :
                 isRejected ? 'rgba(239, 68, 68, 0.05)' : 'rgba(59, 130, 246, 0.05)',
      border: `2px solid ${
        isVerified ? 'rgba(34, 197, 94, 0.3)' : 
        isPending ? 'rgba(251, 191, 36, 0.3)' :
        isRejected ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.2)'
      }`,
      borderRadius: '12px',
      padding: '2rem',
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '1rem' 
      }}>
        <FileText size={24} style={{ 
          color: isVerified ? '#22c55e' : 
                 isPending ? '#fbbf24' :
                 isRejected ? '#ef4444' : '#3b82f6',
          marginRight: '0.75rem' 
        }} />
        <h3 style={{ 
          fontSize: '1.25rem', 
          color: isVerified ? '#22c55e' : 
                 isPending ? '#fbbf24' :
                 isRejected ? '#ef4444' : '#3b82f6',
          margin: 0,
          flex: 1
        }}>
          {documentType.name}
          {documentType.required && (
            <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>*</span>
          )}
        </h3>
        {isVerified && <Check size={20} style={{ color: '#22c55e' }} />}
        {isPending && <Clock size={20} style={{ color: '#fbbf24' }} />}
        {isRejected && <AlertCircle size={20} style={{ color: '#ef4444' }} />}
      </div>

      {/* Description */}
      <p style={{ 
        color: 'rgba(232, 244, 255, 0.8)', 
        marginBottom: '1.5rem',
        lineHeight: '1.6'
      }}>
        {documentType.description}
      </p>

      {/* Status Display */}
      {existingResult && (
        <div style={{
          background: isVerified ? 'rgba(34, 197, 94, 0.1)' :
                     isPending ? 'rgba(251, 191, 36, 0.1)' :
                     'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${
            isVerified ? 'rgba(34, 197, 94, 0.3)' :
            isPending ? 'rgba(251, 191, 36, 0.3)' :
            'rgba(239, 68, 68, 0.3)'
          }`,
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            color: isVerified ? '#22c55e' : 
                   isPending ? '#fbbf24' : '#ef4444',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Status: {existingResult.status.toUpperCase()}
          </div>
          {existingResult.bsv_hash && (
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(232, 244, 255, 0.7)',
              marginBottom: '0.25rem'
            }}>
              BSV Hash: {existingResult.bsv_hash}
            </div>
          )}
          {existingResult.verification_date && (
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'rgba(232, 244, 255, 0.7)'
            }}>
              Verified: {new Date(existingResult.verification_date).toLocaleDateString()}
            </div>
          )}
          {existingResult.errors && existingResult.errors.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              {existingResult.errors.map((error, idx) => (
                <div key={idx} style={{ 
                  color: '#ef4444', 
                  fontSize: '0.9rem',
                  marginBottom: '0.25rem'
                }}>
                  • {error}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Examples */}
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
          {documentType.examples.map((example, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{example}</li>
          ))}
        </ul>
      </div>

      {/* Upload Area */}
      {!isVerified && (
        <div>
          {/* File Drop Zone */}
          <div
            style={{
              border: `2px dashed ${dragOver ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)'}`,
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              background: dragOver ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
              marginBottom: '1rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById(`file-input-${documentType.id}`)?.click()}
          >
            <input
              id={`file-input-${documentType.id}`}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              style={{ display: 'none' }}
            />
            
            {selectedFile ? (
              <div>
                <FileText size={32} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
                <div style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>
                  {selectedFile.name}
                </div>
                <div style={{ color: 'rgba(232, 244, 255, 0.6)', fontSize: '0.9rem' }}>
                  {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                </div>
              </div>
            ) : (
              <div>
                <Upload size={32} style={{ color: 'rgba(59, 130, 246, 0.6)', marginBottom: '0.5rem' }} />
                <div style={{ color: 'rgba(232, 244, 255, 0.8)', marginBottom: '0.5rem' }}>
                  Drop your document here or click to select
                </div>
                <div style={{ color: 'rgba(232, 244, 255, 0.6)', fontSize: '0.9rem' }}>
                  PNG, JPG, PDF up to 10MB
                </div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: uploading ? 'rgba(251, 191, 36, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                border: '2px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '8px',
                color: uploading ? '#fbbf24' : '#3b82f6',
                cursor: uploading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {uploading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fbbf24',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Verifying Document...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Verify Document
                </>
              )}
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}