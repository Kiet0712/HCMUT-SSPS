'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'

// Sample data (replace with actual data fetching logic)
const sampleData = {
    totalPages: 15000,
    totalDocuments: 3500,
    totalCost: 500000, // in VND
    topStudents: [
        { id: '2213568', name: 'Đặng Ngọc Bảo Trâm', pagesPrinted: 500 },
        { id: '2212345', name: 'Đặng Vũ Tuấn Kiệt', pagesPrinted: 450 },
        { id: '2211334', name: 'Bùi Trọng Văn', pagesPrinted: 400 },
    ],
    topPrinters: [
        { name: 'H6-1', pagesPrinted: 4000 },
        { name: 'H1-2', pagesPrinted: 3500 },
        { name: 'B4-1', pagesPrinted: 3000 },
    ],
    dailyPrintingData: [
        { day: '1', pages: 400 },
        { day: '5', pages: 300 },
        { day: '10', pages: 500 },
        { day: '15', pages: 450 },
        { day: '20', pages: 480 },
        { day: '25', pages: 600 },
        { day: '30', pages: 550 },
    ],
}

export default function MonthlyReportPage() {
    const [currentMonth, setCurrentMonth] = useState('')

    useEffect(() => {
        const now = new Date()
        setCurrentMonth(now.toLocaleString('default', { month: 'long', year: 'numeric' }))
    }, [])

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold">Monthly Report - {currentMonth}</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className='flex flex-col'>
                    <CardHeader>
                        <CardTitle className='text-xl'>Printing Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col grow justify-center'>
                        <dl className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Total Pages Printed</dt>
                                <dd className="text-2xl font-semibold">{sampleData.totalPages.toLocaleString()}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Total Documents Printed</dt>
                                <dd className="text-2xl font-semibold">{sampleData.totalDocuments.toLocaleString()}</dd>
                            </div>
                            <div className="col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Total Cost for buying Pages</dt>
                                <dd className="text-2xl font-semibold">{sampleData.totalCost.toLocaleString()} VND</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Daily Printing Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sampleData.dailyPrintingData} className='p-4'>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day">
                                    <Label value="Day" offset={-10} position="insideBottom" />
                                </XAxis>
                                <YAxis>
                                <Label value="#Printing Pages" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}/>
                                </YAxis>
                                <Tooltip />
                                <Bar dataKey="pages" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Top Students (by Pages Printed)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead className="text-right">Pages Printed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleData.topStudents.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{student.id}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell className="text-right">{student.pagesPrinted}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Top Printers (by Pages Printed)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Printer Name</TableHead>
                                    <TableHead className="text-right">Pages Printed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleData.topPrinters.map((printer, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{printer.name}</TableCell>
                                        <TableCell className="text-right">{printer.pagesPrinted}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}