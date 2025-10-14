'use client';

import React from 'react';
import { Shield, Cpu, Globe, Settings, BarChart3 } from 'lucide-react';
import './Dock.css';

interface DockApp {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  url: string;
  current?: boolean;
}

interface DockContext {
  appName: string;
  exchangeUrl: string;
}

interface DockProps {
  context: DockContext;
  customApps?: DockApp[];
}

export default function Dock({ context, customApps = [] }: DockProps) {
  const defaultApps: DockApp[] = [
    { 
      name: 'Bitcoin Writer', 
      icon: Globe, 
      color: 'text-green-500', 
      url: 'https://bitcoin-writer.vercel.app' 
    },
    { 
      name: 'Bitcoin Identity', 
      icon: Shield, 
      color: 'text-blue-500', 
      url: '/',
      current: true
    },
    { 
      name: 'Bitcoin Drive', 
      icon: BarChart3, 
      color: 'text-purple-500', 
      url: 'https://bitcoin-drive.vercel.app' 
    },
    { 
      name: 'Bitcoin OS', 
      icon: Cpu, 
      color: 'text-orange-500', 
      url: 'https://bitcoin-os.vercel.app' 
    }
  ];

  const allApps = [...customApps, ...defaultApps.filter(app => 
    !customApps.some(custom => custom.name === app.name)
  )];

  const handleAppClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="bitcoin-dock">
      <div className="dock-container">
        <div className="dock-apps">
          {allApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.name}
                className={`dock-app ${app.current ? 'active' : ''}`}
                title={app.name}
                onClick={() => handleAppClick(app.url)}
              >
                <Icon 
                  className={`dock-app-icon ${app.color}`} 
                  size={24}
                />
              </button>
            );
          })}
        </div>
        
        <div className="dock-divider" />
        
        <div className="dock-status">
          <div className="status-time">
            <span>{new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}