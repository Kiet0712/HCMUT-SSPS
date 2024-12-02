import Logo from "@/components/logo"
import Image from "next/image"
import { User } from 'lucide-react';
import { Card } from "@/components/ui/card";
import Link from "next/link";


export default function Login() {
    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="flex flex-row items-start">
                <Logo className="m-4 justify-items-start" />
            </div>

            <div className="grow flex flex-row items-center">
                <div className="grow flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/logo_hcmut.png"
                            alt="hcmut"
                            width={128}
                            height={128}
                            className="mb-16" />
                        <div className="flex flex-row gap-8">
                            <Link href="/admin/sign-in">
                            <Card className="text-center py-8 px-16 bg-yellow-400 rounded-lg">
                                <div>
                                    <User size={64} />
                                </div>
                                <p>Admin</p>
                            </Card>
                            </Link>

                            <Link href="/sign-in">
                            <Card className="text-center py-8 px-16 bg-yellow-400 rounded-lg">
                                <div>
                                    <User size={64} />
                                </div>
                                <p>Student</p>
                            </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}