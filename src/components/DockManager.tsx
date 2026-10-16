'use client';

import React from 'react';
import { useStoredValue } from '@/lib/hooks/clientState';
import Dock from './Dock';
import MinimalDock from './MinimalDock';

const DockManager: React.FC = () => {
  const dockStyle = useStoredValue('dockStyle', 'large') ?? 'large';

  return (
    <>
      {dockStyle === 'minimal' ? <MinimalDock /> : <Dock />}
    </>
  );
};

export default DockManager;