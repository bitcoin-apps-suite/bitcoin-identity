'use client';

import React, { useEffect } from 'react';
import { useSidebarCollapsed } from '@/lib/hooks/clientState';
import DevSidebar from './DevSidebar';
import Taskbar from './Taskbar';
import { useBitcoinOS } from '@/lib/utils/useBitcoinOS';

interface DevLayoutProps {
  children: React.ReactNode;
}

const DevLayout: React.FC<DevLayoutProps> = ({ children }) => {
  const isCollapsed = useSidebarCollapsed();
  const { isInOS, setTitle } = useBitcoinOS();

  useEffect(() => {
    // Set app title when running in Bitcoin OS
    if (isInOS) {
      setTitle('Bitcoin Identity');
    }
  }, [isInOS, setTitle]);

  return (
    <>
      {!isInOS && <Taskbar />}
      {!isInOS && <DevSidebar />}
      <div className={`app-container ${isInOS ? '' : (isCollapsed ? 'with-dev-sidebar-collapsed' : 'with-dev-sidebar')}`}>
        {children}
      </div>
    </>
  );
};

export default DevLayout;