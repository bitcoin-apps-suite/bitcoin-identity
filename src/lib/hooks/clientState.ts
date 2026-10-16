'use client';

import { useSyncExternalStore } from 'react';
import { getCurrentTheme } from '@/lib/icon-themes';

// Client-only values read through useSyncExternalStore, so the server render
// and the first client render agree and no effect has to call setState.

const LOCAL_EVENT = 'local-storage-change';

const noopSubscribe = () => () => {};

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(LOCAL_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(LOCAL_EVENT, callback);
  };
}

/** Write to localStorage and notify every useStoredValue in this tab. */
export function setStoredValue(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(LOCAL_EVENT));
}

/** Live localStorage value; `serverValue` is used during SSR/hydration. */
export function useStoredValue(key: string, serverValue: string | null = null): string | null {
  return useSyncExternalStore(
    subscribeStorage,
    () => localStorage.getItem(key),
    () => serverValue,
  );
}

/** False on the server and during hydration, true afterwards. */
export function useMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function subscribeResize(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

/** True when the viewport is at most `px` wide (false on the server). */
export function useMaxWidth(px: number): boolean {
  return useSyncExternalStore(subscribeResize, () => window.innerWidth <= px, () => false);
}

function subscribeIconTheme(callback: () => void) {
  window.addEventListener('iconThemeChanged', callback);
  const unsubscribeStorage = subscribeStorage(callback);
  return () => {
    window.removeEventListener('iconThemeChanged', callback);
    unsubscribeStorage();
  };
}

/** Current dock icon theme, kept in sync with theme-change events. */
export function useIconTheme(): string {
  return useSyncExternalStore(subscribeIconTheme, getCurrentTheme, () => 'lucide');
}

/** Sidebar collapsed flag shared by the sidebar and the pages that lay out around it. */
export function useSidebarCollapsed(): boolean {
  const saved = useStoredValue('devSidebarCollapsed');
  return saved !== null ? saved === 'true' : true;
}
