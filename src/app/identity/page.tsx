'use client';

import React, { useState } from 'react';
import { Shield, FileText, Check } from 'lucide-react';
import { useWallet, publishRecord } from '@/lib/bwallet';

async function sha256Hex(file: File) {
  const buf = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function IdentityPage() {
  const { user, connect, connecting, error } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState('');
  const [busy, setBusy] = useState(false);
  const [txid, setTxid] = useState('');
  const [fail, setFail] = useState('');

  const pick = async (f: File | null) => {
    setFile(f);
    setTxid('');
    setFail('');
    setHash(f ? await sha256Hex(f) : '');
  };

  const anchor = async () => {
    if (!user || !hash) return;
    setBusy(true);
    setFail('');
    try {
      const r = await publishRecord(['bID', 'attest', user.identityKey, hash, new Date().toISOString()], 'bID document attestation');
      setTxid(r.txid ?? '');
    } catch (e) {
      setFail(e instanceof Error ? e.message : 'The wallet did not sign.');
    } finally {
      setBusy(false);
    }
  };

  const card: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 24, marginTop: 16 };
  const btn: React.CSSProperties = { background: '#F5B800', color: '#1a1300', border: 0, borderRadius: 8, padding: '10px 18px', fontWeight: 700, cursor: 'pointer' };

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: '0 16px', color: '#ddd' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Shield size={26} /> Your identity
      </h1>
      <p style={{ color: '#999', marginTop: 8, lineHeight: 1.6 }}>
        Your identity is your wallet&apos;s identity key. Sign in with bWalletX (or any BRC-100 wallet), then you can
        anchor a fingerprint of a document on-chain under your key. The file never leaves your device; only its SHA-256
        hash is published. This proves you held the document at that time. It is not a KYC check.
      </p>

      <div style={card}>
        {user ? (
          <>
            <div style={{ fontSize: 13, color: '#999' }}>Signed in as</div>
            <div style={{ color: '#F5B800', fontWeight: 600, fontSize: 18 }}>{user.name}</div>
            {user.paymail && <div style={{ fontSize: 13 }}>{user.paymail}</div>}
            <div style={{ fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', marginTop: 6, color: '#bbb' }}>{user.identityKey}</div>
          </>
        ) : (
          <>
            <button style={btn} onClick={() => void connect()} disabled={connecting}>
              {connecting ? 'Connecting…' : 'Sign in with bWalletX'}
            </button>
            {error && <p style={{ color: '#f87171', marginTop: 8, fontSize: 13 }}>{error}</p>}
          </>
        )}
      </div>

      <div style={card}>
        <h2 style={{ fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={18} /> Anchor a document fingerprint
        </h2>
        <input type="file" onChange={(e) => void pick(e.target.files?.[0] ?? null)} style={{ marginTop: 12 }} />
        {hash && (
          <div style={{ fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', marginTop: 10, color: '#bbb' }}>
            {file?.name}: sha256 {hash}
          </div>
        )}
        <div style={{ marginTop: 14 }}>
          <button style={{ ...btn, opacity: !user || !hash || busy ? 0.5 : 1 }} disabled={!user || !hash || busy} onClick={() => void anchor()}>
            {busy ? 'Waiting for wallet…' : 'Publish on-chain'}
          </button>
          <span style={{ fontSize: 12, color: '#888', marginLeft: 10 }}>Your wallet shows the cost (network fee only) before you approve.</span>
        </div>
        {txid && (
          <p style={{ marginTop: 12, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Check size={16} /> Published:{' '}
            <a href={`https://whatsonchain.com/tx/${txid}`} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', textDecoration: 'underline' }}>
              {txid.slice(0, 16)}…
            </a>
          </p>
        )}
        {fail && <p style={{ marginTop: 12, color: '#f87171' }}>{fail}</p>}
      </div>
    </div>
  );
}
