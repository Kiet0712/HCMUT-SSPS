import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import Image from 'next/image'
import Link from 'next/link'
// import img from '@/components/images/sanbong.jpeg'

export default function Home() {
    return (
            <main className="flex flex-1 flex-col items-start justify-center">
                {/* <div className="max-w-xl" style={{ backgroundImage: 'url(./src/components/images/sanbong.png)' }}> */}
                <div className="flex flex-row items-center w-full h-full bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/sanbong.png)' }}>
                    <div className="inline-block items-start rounded-xl bg-gray-800 bg-opacity-80 p-6 m-4">
                        <h1 className="text-4xl font-bold text-white">Welcome Tram!</h1>
                        <p className="mt-4 text-lg text-muted-foreground text-slate-200">
                            Student Smart Printing System
                        </p>
                        <Link href="/print/choose-printer">
                            <Button size="lg" className="mt-8 bg-blue-700">
                                Print
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
    )
}

