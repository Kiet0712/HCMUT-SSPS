"use client"

import * as React from "react"
import { SlidersHorizontal, Printer, GraduationCap, NotepadText } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// import { Logo } from '@/components/logo'

const navigation = [
  {
    title: "Configuration",
    icon: SlidersHorizontal,
    href: "/admin/config",
  },
  {
    title: "Printer Management",
    icon: Printer,
    href: "/admin/printer",
  },
  {
    title: "Student Management",
    icon: GraduationCap,
    href: "/admin/student",
  },
  {
    title: "Monthly Report",
    icon: NotepadText,
    href: "/admin/report",
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* <Logo /> */}
              <Link className="flex flex-row gap-2" href="/home">
            <Image
                src="/logo_hcmut.png"
                alt="SSPS Logo"
                width={40}
                height={40}
                className="m-0 p-0"
            />
            {/* </div> */}
            <div className="flex flex-col gap-0.5">
                <span className="font-semibold"><span className="text-blue-700">SSPS</span>-HCMUT</span>
                <span className="text-xs">Student Smart Printing System</span>
            </div>
        </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}