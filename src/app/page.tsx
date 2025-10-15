'use client';

import React, { useState } from 'react';
import './HomePage.css';

import { Upload, Shield, Key, Eye, EyeOff, Lock, FileText, Image, CheckCircle, AlertCircle } from 'lucide-react';
import DockManager from '../components/DockManager';

export default function HomePage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [encryptionStep, setEncryptionStep] = useState('upload'); // 'upload', 'encrypt', 'complete'
  const [masterImage, setMasterImage] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setUploadedFiles(prev => [...prev, ...fileArray]);
  };

  const identityTemplateFields = [
    { category: 'Personal', fields: ['Full Name', 'Date of Birth', 'Age', 'Gender', 'Nationality', 'Place of Birth'] },
    { category: 'Contact', fields: ['Email Address', 'Phone Number', 'Physical Address', 'City', 'State/Province', 'Country', 'Postal Code'] },
    { category: 'Identity Documents', fields: ['Government ID Number', 'Passport Number', 'Driver\'s License', 'Social Security Number'] },
    { category: 'Financial', fields: ['Bank Account Numbers', 'Credit Score Range', 'Employment Status', 'Annual Income Range'] },
    { category: 'Verification', fields: ['Utility Bills', 'Bank Statements', 'Employment Letters', 'Educational Certificates'] },
    { category: 'Biometric', fields: ['Facial Recognition Hash', 'Fingerprint Hash', 'Voice Pattern Hash'] },
    { category: 'Social', fields: ['Social Media Profiles', 'Professional Networks', 'References'] },
    { category: 'Preferences', fields: ['Communication Preferences', 'Privacy Settings', 'Consent Records'] }
  ];

  return (
    <div className="home-page">
      {/* Bitcoin Writer Style Header */}
      <div className="platform-header">
        <h1><span style={{color: '#3b82f6'}}>Bitcoin Identity</span> Platform</h1>
        <p className="tagline">Encrypt Once, Selectively Reveal Forever on the Blockchain</p>
      </div>

      {/* How It Works Section */}
      <section className="platform-section">
        <h2>How It Works</h2>
        <div className="how-it-works-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Master Image</h3>
            <p>
              Choose a personal image that will serve as your cryptographic root. This image 
              is encrypted locally and its hash becomes your master key for an HD key tree.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Encrypt Identity Documents</h3>
            <p>
              Upload and encrypt all your identity documents locally. AI extracts data to 
              populate selective disclosure templates while maintaining complete privacy.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Blockchain Anchoring</h3>
            <p>
              Document hashes are anchored to Bitcoin SV blockchain, creating immutable 
              proof of existence without revealing any personal information.
            </p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Selective Disclosure</h3>
            <p>
              Prove specific facts (age {'>'} 21, residency, etc.) without revealing underlying 
              data using zero-knowledge proofs and use-once signatures.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Interface */}
      <section className="platform-section">
        <h2>Create Your Encrypted Identity</h2>
        
        {encryptionStep === 'upload' && (
          <div className="upload-section">
            <div className="master-image-upload">
              <h3>
                <Image size={24} />
                Step 1: Choose Your Master Image
              </h3>
              <p>
                Select a personal image that you'll always have access to. This will be your cryptographic root key.
                <strong> Keep this image secure and backed up - it's your identity recovery method.</strong>
              </p>
              <div className="upload-zone master-image">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setMasterImage(e.target.files[0]);
                    }
                  }}
                  style={{ display: 'none' }}
                  id="master-image-input"
                />
                <label htmlFor="master-image-input" className="upload-label">
                  {masterImage ? (
                    <div className="file-selected">
                      <CheckCircle size={48} />
                      <span>Master Image Selected: {masterImage.name}</span>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <Image size={48} />
                      <span>Choose Master Image</span>
                      <small>This will be your cryptographic root</small>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="document-upload">
              <h3>
                <FileText size={24} />
                Step 2: Upload Identity Documents
              </h3>
              <p>
                Upload all relevant identity documents. They will be encrypted locally before any processing.
              </p>
              
              <div 
                className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  multiple 
                  onChange={(e) => handleFiles(e.target.files)}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input" className="upload-label">
                  <Upload size={48} />
                  <span>Drop files here or click to browse</span>
                  <small>Supports: PDFs, Images, Documents</small>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                  <h4>Uploaded Files ({uploadedFiles.length})</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      <FileText size={20} />
                      <span>{file.name}</span>
                      <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {masterImage && uploadedFiles.length > 0 && (
              <button 
                className="cta-btn primary"
                onClick={() => setEncryptionStep('encrypt')}
              >
                <Lock size={20} />
                Begin Local Encryption
              </button>
            )}
          </div>
        )}

        {encryptionStep === 'encrypt' && (
          <div className="encryption-section">
            <div className="encryption-process">
              <h3>
                <Shield size={24} />
                Encrypting Your Identity Data
              </h3>
              <div className="encryption-steps">
                <div className="encryption-step">
                  <div className="step-icon">
                    <Key size={20} />
                  </div>
                  <div className="step-info">
                    <h4>Generating HD Key Tree</h4>
                    <p>Creating hierarchical deterministic keys from your master image hash...</p>
                  </div>
                </div>
                <div className="encryption-step">
                  <div className="step-icon">
                    <Lock size={20} />
                  </div>
                  <div className="step-info">
                    <h4>Encrypting Documents</h4>
                    <p>All documents are encrypted locally with AES-256 encryption...</p>
                  </div>
                </div>
                <div className="encryption-step">
                  <div className="step-icon">
                    <FileText size={20} />
                  </div>
                  <div className="step-info">
                    <h4>Extracting Identity Data</h4>
                    <p>AI is processing encrypted data to populate identity templates...</p>
                  </div>
                </div>
              </div>
              <button 
                className="cta-btn primary"
                onClick={() => setEncryptionStep('complete')}
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}

        {encryptionStep === 'complete' && (
          <div className="completion-section">
            <div className="success-message">
              <CheckCircle size={64} />
              <h3>Identity Successfully Created!</h3>
              <p>Your encrypted identity is now anchored to the Bitcoin SV blockchain.</p>
            </div>
          </div>
        )}
      </section>

      {/* Identity Template Preview */}
      <section className="platform-section">
        <h2>Selective Disclosure Templates</h2>
        <p className="section-description">
          Your encrypted data populates standardized identity templates. You can selectively reveal 
          specific information to meet verification requirements without exposing unnecessary personal details.
        </p>
        
        <div className="template-grid">
          {identityTemplateFields.slice(0, 4).map((category, index) => (
            <div key={index} className="template-category">
              <h3>{category.category}</h3>
              <div className="template-fields">
                {category.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="template-field">
                    <span className="field-name">{field}</span>
                    <div className="field-controls">
                      <button className="reveal-btn" title="Can be selectively revealed">
                        <Eye size={14} />
                      </button>
                      <button className="hide-btn" title="Always private">
                        <EyeOff size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="template-example">
          <h3>Example Use Case</h3>
          <div className="use-case">
            <div className="challenge">
              <AlertCircle size={20} />
              <span><strong>Verification Request:</strong> "Are you over 21 years old?"</span>
            </div>
            <div className="response">
              <CheckCircle size={20} />
              <span><strong>Your Response:</strong> "Yes, I am over 21" (cryptographically proven without revealing actual age)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="platform-section">
        <h2>Privacy-First Architecture</h2>
        <div className="privacy-features">
          <div className="feature">
            <div className="feature-icon">
              <Lock size={32} />
            </div>
            <h3>Local Encryption</h3>
            <p>All encryption happens on your device. Your private keys never leave your control.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <Key size={32} />
            </div>
            <h3>HD Key Derivation</h3>
            <p>Hierarchical deterministic keys allow infinite use-once signatures from your master image.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <Eye size={32} />
            </div>
            <h3>Selective Disclosure</h3>
            <p>Prove specific facts without revealing underlying personal information.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Zero-Knowledge Proofs</h3>
            <p>Cryptographically prove statements about yourself without revealing the data itself.</p>
          </div>
        </div>
      </section>

      
      <DockManager />
    </div>
  );
}