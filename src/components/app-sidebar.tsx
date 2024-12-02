"use client"

import * as React from "react"
import { LogOut, Printer, Receipt, ShoppingCart } from 'lucide-react'
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

const navigation = [
  {
    title: "Print",
    icon: Printer,
    href: "/print",
  },
  {
    title: "Buy Printing Pages",
    icon: ShoppingCart,
    href: "/buy",
  },
  {
    title: "View Printing Log",
    icon: Receipt,
    href: "/log",
  },
  {
    title: "Logout",
    icon: LogOut,
    href: "/logout",
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-primary-foreground"> */}
                  <Image
                    src="/logo_hcmut.png"
                    alt="SSPS Logo"
                    width={40}
                    height={40}
                    className="m-0 p-0"
                  />
                {/* </div> */}
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold">SSPS-HCMUT</span>
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

