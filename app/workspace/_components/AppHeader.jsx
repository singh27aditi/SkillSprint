'use client'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function AppHeader({ hideSideBar=false }) {
  return (
    <div className='p-4 flex justify-between items-center shadow'>
        {!hideSideBar && <SidebarTrigger/>}
        <UserButton />
    </div>
  )
}
