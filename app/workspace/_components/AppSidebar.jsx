'use client'

import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Book, Compass, CreditCardIcon, LayoutDashboard, UserCircle2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog'

const SidebarOptions = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/workspace' },
  { title: 'My Learning', icon: Book, path: '/workspace/my-learning' },
  { title: 'Explore Courses', icon: Compass, path: '/workspace/explore' },
  { title: 'Billing', icon: CreditCardIcon, path: '/workspace/billing' },
  { title: 'Profile', icon: UserCircle2Icon, path: '/workspace/profile' }
]

export function AppSidebar() {
    const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Image src={'/logo.svg'} alt='logo' width={20} height={10} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <AddNewCourseDialog>
          <Button>Create New Course</Button>
        </AddNewCourseDialog>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-0">
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 
                        ${path === item.path ? 'text-primary bg-slate-200' : 'text-muted-foreground hover:bg-slate-100'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
