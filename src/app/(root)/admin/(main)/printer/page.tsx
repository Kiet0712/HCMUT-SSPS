'use client'

import { GraduationCap } from 'lucide-react'
import { PrinterHistorySettings } from '@/app/types/printer'
import build from 'next/dist/build'
import { useState } from 'react'
import PrinterDialog from '@/components/printer-dialog'

interface Printer {
    id: number,
    name: string,
    building: string,
    site: string,
    state: string,
    history: PrinterHistorySettings
}


const printers = [
    {
        id: 1,
        name: "H1-1",
        building: "H1",
        site: "Campus 2",
        state: "Available",
        history: {
            time: "2021-10-10 10:10:10",
            fileName: "YOLOv10.pdf",
            copies: "1",
            pages: "10",
            studentId: "1812700"
        }
    },

    {
        id: 2,
        name: "H1-2",
        building: "H1",
        site: "Campus 2",
        state: "Not available",
        history: {
            time: "2021-9-9 9:9:9",
            fileName: "Mamba.pdf",
            copies: "2",
            pages: "30",
            studentId: "2213456"
        }
    },

    {
        id: 3,
        name: "H6-2",
        building: "H6",
        site: "Campus 2",
        state: "Available",
        history: {
            time: "2021-9-9 9:9:9",
            fileName: "Mamba.pdf",
            copies: "2",
            pages: "30",
            studentId: "2213456"
        }
    },

    {
        id: 4,
        name: "B4-1",
        building: "B4",
        site: "Campus 1",
        state: "Available",
        history: {
            time: "2021-9-9 9:9:9",
            fileName: "Mamba.pdf",
            copies: "2",
            pages: "30",
            studentId: "2213456"
        }
    }
]

export default function StudentHistoryPage() {

    const [ selectedPrinter, setSelectedPrinter ] = useState<Printer | null>(null)
    return (
        <div className="max-w m-auto">
            <div className="border rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                    <GraduationCap className="w-6 h-6 mr-2" />
                    <h1 className="text-2xl font-semibold">Printer</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                            Building
                        </label>
                        <input
                            type="text"
                            id="building"
                            placeholder="Enter building"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Site
                        </label>
                        <input
                            type="text"
                            id="site"
                            placeholder="Enter site"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Printer ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Printer Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Building
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Printer Site
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                            {printers.map((printer) => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.building}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.site}</td>
                                    {(printer.state === "Available") ?
                                    (<td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{printer.state}</td>) :
                                    (<td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{printer.state}</td>)}
                                </tr>
                            )
                            )}


                        </tbody>
                    </table>
                </div>
            </div>
            {selectedPrinter && (
                <PrinterDialog />
            )
            }
        </div>
    )
}

