import { Inter } from "next/font/google"
import "@/app/globals.css"
import { SidebarInset, SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-cover bg-center">
            <header className="flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <nav className="flex items-center space-x-4">
                        <Button variant="link" asChild>
                            <a href="#">Home</a>
                        </Button>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/avatar.png" alt="avater" className="rounded-full"
                            width={40}
                            height={40}>
                        </Image>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Admin</span>
                            <span className="text-xs text-muted-foreground">Admin</span>
                        </div>
                    </div>
                </div>
            </header>
          {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
