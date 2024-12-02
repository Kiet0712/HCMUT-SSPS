'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Signin () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log({ email, password, rememberMe })
    }

    return (
        <div className="w-screen h-screen bg-secondary flex items-center justify-center p-4">
            <div className="fixed top-6 left-6">
                <div className="flex items-center">
                    <Image
                        src="/logo_hcmut.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="m-2 h-10 w-10"
                    />
                    <span className="text-blue-700 text-xl font-semibold">SSPS</span>
                    <span className="text-black text-xl font-semibold ">-HCMUT</span>
                </div>
            </div>

            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo_hcmut.png"
                            alt="SSPS-HCMUT Logo"
                            width={100}
                            height={100}
                            className="h-24 w-24"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-8">SSPS-HCMUT</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@hcmut.edu.vn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember Me
                                </label>
                            </div>

                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Link href="/home">
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 my-4">
                                Login
                            </Button>
                            
                        </Link>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}