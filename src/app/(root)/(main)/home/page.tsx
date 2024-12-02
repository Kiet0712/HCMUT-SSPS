import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import Image from 'next/image'
// import img from '@/components/images/sanbong.jpeg'

export default function Home() {
    return (
        <SidebarInset className="bg-cover bg-center">
            <header className="flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <nav className="flex items-center space-x-4">
                        <Button variant="link" asChild>
                            <a href="#">Home</a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="#">About Us</a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="#">Contact</a>
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
                            <span className="text-sm font-medium">Tram Dang</span>
                            <span className="text-xs text-muted-foreground">Student</span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex flex-1 flex-col items-start justify-center">
                {/* <div className="max-w-xl" style={{ backgroundImage: 'url(./src/components/images/sanbong.png)' }}> */}
                <div className="flex flex-row items-center w-full h-full bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/sanbong.png)' }}>
                    <div className="inline-block items-start rounded-xl bg-gray-800 bg-opacity-80 p-6 m-4">
                        <h1 className="text-4xl font-bold text-white">Welcome Tram!</h1>
                        <p className="mt-4 text-lg text-muted-foreground text-slate-200">
                            Student Smart Printing System
                        </p>
                        <Button size="lg" className="mt-8 bg-blue-700">
                            Print
                        </Button>
                    </div>
                </div>
            </main>
        </SidebarInset>
    )
}

