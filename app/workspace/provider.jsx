'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'

export default function WorkspaceProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />
        {children}
      </div>
    </SidebarProvider>
  )
}
