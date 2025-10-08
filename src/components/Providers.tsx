'use client'

import React from 'react'

// Simple providers wrapper for future authentication integration
export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}