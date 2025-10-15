import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Mail, 
  Music, 
  FileText, 
  HardDrive, 
  Calendar, 
  Search, 
  Table, 
  Briefcase, 
  Store, 
  TrendingUp, 
  Video, 
  Code2, 
  Camera, 
  MapPin, 
  MessageCircle, 
  Users, 
  Gamepad2, 
  BookOpen, 
  Globe, 
  Box, 
  Monitor, 
  GraduationCap, 
  Paintbrush, 
  UserCheck,
  Maximize2
} from 'lucide-react';
import { getThemedIcon, getCurrentTheme } from './lib/icon-themes';
import './LeftSideDock.css';

interface DockApp {
  id?: string;
  name: string;
  icon: any;
  color: string;
  url?: string;
  disabled?: boolean;
  current?: boolean;
  isImage?: boolean;
}

interface LeftSideDockProps {
  currentApp?: string;
}

const LeftSideDock: React.FC<LeftSideDockProps> = ({ currentApp = 'bitcoin-identity' }) => {
  const [mounted, setMounted] = useState(false);
  const [iconTheme, setIconTheme] = useState<string>('lucide');

  useEffect(() => {
    setMounted(true);
    setIconTheme(getCurrentTheme());
    
    const handleThemeChange = (event: any) => {
      setIconTheme(event.detail);
    };
    
    window.addEventListener('iconThemeChanged', handleThemeChange);
    
    return () => {
      window.removeEventListener('iconThemeChanged', handleThemeChange);
    };
  }, []);

  const getRainbowColor = (index: number): string => {
    const rainbowColors = [
      '#ff0000', // Red
      '#ff8000', // Orange  
      '#ffff00', // Yellow
      '#80ff00', // Lime
      '#00ff00', // Green
      '#00ff80', // Spring Green
      '#00ffff', // Cyan
      '#0080ff', // Blue
      '#0000ff', // Deep Blue
      '#8000ff', // Purple
      '#ff00ff', // Magenta
      '#ff0080'  // Rose
    ];
    return rainbowColors[index % rainbowColors.length];
  };

  const getIconColor = (colorClass: string, index: number = 0): string => {
    if (colorClass === 'rainbow') {
      return getRainbowColor(index);
    }
    
    const colorMap: { [key: string]: string } = {
      'text-orange-500': '#f97316',
      'text-bitcoin-orange': '#f7931a',
      'text-yellow-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-purple-500': '#a855f7',
      'text-fuchsia-500': '#d946ef',
      'text-pink-500': '#ec4899',
      'text-green-500': '#22c55e',
      'text-blue-500': '#3b82f6',
      'text-gray-500': '#6b7280',
      'text-sky-400': '#38bdf8',
      'text-cyan-500': '#06b6d4',
      'text-cyan-400': '#22d3ee',
      'text-emerald-500': '#10b981',
      'text-blue-600': '#2563eb'
    };
    return colorMap[colorClass] || '#ffffff';
  };

  const dockApps: DockApp[] = [
    { id: 'bitcoin-os', name: 'Bitcoin OS', icon: Monitor, color: 'rainbow', url: 'https://bitcoin-os.vercel.app/', current: currentApp === 'bitcoin-os' },
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'rainbow', url: 'https://www.bitcoinapps.store/', isImage: true, current: currentApp === 'bapps-store' },
    { id: 'bitcoin-wallet', name: 'Bitcoin Wallet', icon: Wallet, color: 'rainbow', url: 'https://bitcoin-wallet-sable.vercel.app', current: currentApp === 'bitcoin-wallet' },
    { id: 'bitcoin-email', name: 'Bitcoin Email', icon: Mail, color: 'rainbow', url: 'https://bitcoin-email.vercel.app', current: currentApp === 'bitcoin-email' },
    { id: 'bitcoin-music', name: 'Bitcoin Music', icon: Music, color: 'rainbow', url: 'https://bitcoin-music.vercel.app', current: currentApp === 'bitcoin-music' },
    { id: 'bitcoin-writer', name: 'Bitcoin Writer', icon: FileText, color: 'rainbow', url: 'https://bitcoin-writer.vercel.app', current: currentApp === 'bitcoin-writer' },
    { id: 'bitcoin-code', name: 'Bitcoin Code', icon: Code2, color: 'rainbow', url: 'https://bitcoin-code.vercel.app', current: currentApp === 'bitcoin-code' },
    { id: 'bitcoin-drive', name: 'Bitcoin Drive', icon: HardDrive, color: 'rainbow', url: 'https://bitcoin-drive.vercel.app', current: currentApp === 'bitcoin-drive' },
    { id: 'bitcoin-calendar', name: 'Bitcoin Calendar', icon: Calendar, color: 'rainbow', url: 'https://bitcoin-calendar.vercel.app', current: currentApp === 'bitcoin-calendar' },
    { id: 'bitcoin-exchange', name: 'Bitcoin Exchange', icon: TrendingUp, color: 'rainbow', url: 'https://bitcoin-exchange-iota.vercel.app', current: currentApp === 'bitcoin-exchange' },
    { id: 'bitcoin-search', name: 'Bitcoin Search', icon: Search, color: 'rainbow', url: 'https://bitcoin-search.vercel.app', current: currentApp === 'bitcoin-search' },
    { id: 'bitcoin-spreadsheet', name: 'Bitcoin Spreadsheet', icon: Table, color: 'rainbow', url: 'https://bitcoin-spreadsheet.vercel.app', current: currentApp === 'bitcoin-spreadsheet' },
    { id: 'bitcoin-video', name: 'Bitcoin Video', icon: Video, color: 'rainbow', url: 'https://bitcoin-video-nine.vercel.app', current: currentApp === 'bitcoin-video' },
    { id: 'bitcoin-photos', name: 'Bitcoin Photos', icon: Camera, color: 'rainbow', url: 'https://bitcoin-photos.vercel.app', current: currentApp === 'bitcoin-photos' },
    { id: 'bitcoin-maps', name: 'Bitcoin Maps', icon: MapPin, color: 'rainbow', url: 'https://bitcoin-maps.vercel.app', current: currentApp === 'bitcoin-maps' },
    { id: 'bitcoin-chat', name: 'Bitcoin Chat', icon: MessageCircle, color: 'rainbow', url: 'https://bitcoin-chat.vercel.app', current: currentApp === 'bitcoin-chat' },
    { id: 'bitcoin-social', name: 'Bitcoin Social', icon: Users, color: 'rainbow', url: 'https://bitcoin-social.vercel.app', current: currentApp === 'bitcoin-social' },
    { id: 'bitcoin-games', name: 'Bitcoin Games', icon: Gamepad2, color: 'rainbow', url: 'https://bitcoin-gaming.vercel.app', current: currentApp === 'bitcoin-games' },
    { id: 'bitcoin-books', name: 'Bitcoin Books', icon: BookOpen, color: 'rainbow', url: 'https://bitcoin-books-bay.vercel.app', current: currentApp === 'bitcoin-books' },
    { id: 'bitcoin-domains', name: 'Bitcoin Domains', icon: Globe, color: 'rainbow', url: 'https://bitcoin-dns.vercel.app', current: currentApp === 'bitcoin-domains' },
    { id: 'bitcoin-3d', name: 'Bitcoin 3D', icon: Box, color: 'rainbow', url: 'https://bitcoin-3d.vercel.app', current: currentApp === 'bitcoin-3d' },
    { id: 'bitcoin-jobs', name: 'Bitcoin Jobs', icon: Briefcase, color: 'rainbow', url: 'https://bitcoin-jobs.vercel.app/', current: currentApp === 'bitcoin-jobs' },
    { id: 'bitcoin-education', name: 'Bitcoin Education', icon: GraduationCap, color: 'rainbow', url: 'https://bitcoin-education-theta.vercel.app', current: currentApp === 'bitcoin-education' },
    { id: 'bitcoin-paint', name: 'Bitcoin Paint', icon: Paintbrush, color: 'rainbow', url: 'https://bitcoin-paint.vercel.app/', current: currentApp === 'bitcoin-paint' },
    { id: 'bitcoin-identity', name: 'Bitcoin Identity', icon: UserCheck, color: 'rainbow', url: 'https://bitcoin-identity.vercel.app/', current: currentApp === 'bitcoin-identity' },
  ];

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url;
    }
  };

  const toggleDockSize = () => {
    const newDockStyle = 'large';
    localStorage.setItem('dockStyle', newDockStyle);
    window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: newDockStyle }));
  };

  return (
    <div className="left-side-dock">
      <div className="dock-container-vertical">
        {/* App icons */}
        <div className="dock-apps-vertical">
          {dockApps.map((app, index) => {
            let Icon;
            if (app.id === 'bapps-store') {
              Icon = app.icon;
            } else if (app.id === 'bitcoin-os') {
              Icon = Monitor;
            } else if (app.id === 'bitcoin-identity') {
              Icon = UserCheck;
            } else {
              Icon = getThemedIcon(app.id || app.name.toLowerCase().replace('bitcoin ', ''), iconTheme);
            }
            
            return (
              <button
                key={app.name}
                className={`dock-app-vertical ${app.current ? 'active' : ''} ${app.disabled ? 'disabled' : ''}`}
                onClick={() => handleAppClick(app)}
                title={app.name}
                disabled={app.disabled}
              >
                {app.id === 'bapps-store' ? (
                  <div className="dock-app-icon-vertical">
                    <img src="/bapps-icon.jpg" alt="BAPPS" className="dock-app-image-vertical" />
                  </div>
                ) : (
                  <Icon className="dock-app-icon-vertical" style={{ color: getIconColor(app.color, index) }} />
                )}
                {app.current && <span className="dock-indicator-vertical" />}
              </button>
            );
          })}
        </div>
        
        {/* Toggle button at the bottom */}
        <div className="dock-toggle-section">
          <button 
            className="dock-toggle-btn" 
            title="Switch to Bottom Dock"
            onClick={toggleDockSize}
          >
            <Maximize2 className="dock-toggle-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideDock;