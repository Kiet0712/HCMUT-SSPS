import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Logo({ className }: { className?: string }) {
    return (
        <Link className={cn("flex flex-row gap-2", className)} href="/home">
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
    )
}
