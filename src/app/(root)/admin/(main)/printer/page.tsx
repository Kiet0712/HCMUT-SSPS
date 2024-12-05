//@ts-nocheck
'use client'

import { Printer } from 'lucide-react'
import { PrinterHistory } from '@/app/types/printer'
import build from 'next/dist/build'
import { useEffect, useState } from 'react'
import PrinterDialog from '@/components/printer-dialog'
import { AxiosInstance } from '@/utils/axiosInstance'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useForm } from 'react-hook-form'

interface Printer {
    id: number,
    name: string,
    building: string,
    campsite: string,
    status: string,
}


// const printers: Printer[] = [
//     {
//         id: 1,
//         name: "H1-1",
//         building: "H1",
//         site: "Campus 2",
//         state: "Available",
//         history: [
//             {
//                 time: "2021-10-10 10:10:10",
//                 fileName: "YOLOv10.pdf",
//                 copies: 1,
//                 pages: 10,
//                 studentId: "1812700"
//             },
//             {
//                 time: "2024-12-03 11:00 AM",
//                 fileName: "ThesisChapter.pdf",
//                 copies: 1,
//                 pages: 30,
//                 studentId: "2213568"
//             },
//             {
//                 time: "2024-12-03 11:15 AM",
//                 fileName: "Invoice.xlsx",
//                 copies: 5,
//                 pages: 2,
//                 studentId: "2211334"
//             }
//         ]
//     },

//     {
//         id: 2,
//         name: "H1-2",
//         building: "H1",
//         site: "Campus 2",
//         state: "Not available",
//         history: [
//             {
//                 time: "2021-9-9 9:9:9",
//                 fileName: "Mamba.pdf",
//                 copies: 1,
//                 pages: 30,
//                 studentId: "2213456"
//             }
//         ]
//     },

//     {
//         id: 3,
//         name: "H6-2",
//         building: "H6",
//         site: "Campus 2",
//         state: "Available",
//         history: [
//             {
//                 time: "2021-9-9 9:9:9",
//                 fileName: "Mamba.pdf",
//                 copies: 1,
//                 pages: 30,
//                 studentId: "2213456"
//             }
//         ]
//     },

//     {
//         id: 4,
//         name: "B4-1",
//         building: "B4",
//         site: "Campus 1",
//         state: "Available",
//         history: [
//             {
//                 time: "2021-9-9 9:9:9",
//                 fileName: "Mamba.pdf",
//                 copies: 2,
//                 pages: 20,
//                 studentId: "2213456"
//             }
//         ]
//     }
// ]

export default function StudentHistoryPage() {

    const [printers, setPrinters] = useState<Printer[]>([]);

    const [selectedPrinter, setSelectedPrinter] = useState<Printer[]>([]);
    const [selectedEditPrinter, setSelectedEditPrinter] = useState<Printer[]>([]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const handleAdd = async (data) => {
        console.log(data);
        try {
            const response = await AxiosInstance.post('/admin/addprinter', data);
            console.log('Printer added:', response.data);
            alert('Printer added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred. Please try again.');
        }

        // send data to backend
        setIsAddDialogOpen(false)
    }

    const handleEdit = async (data) => {
        console.log("data", data)
        const newPrinter = {
            id: selectedEditPrinter.id,
            name: data.name,
            building: data.building,
            campsite: data.campsite,
            status: data.status
        }
        console.log(data);
        AxiosInstance.patch('/admin/updateprinter', newPrinter).then((res) => {
            console.log('Printer updated:', res.data);
            alert('Printer updated successfully!');
            window.location.reload();
        })
        .catch((err) => {
            console.error('Error updating printer:', err);
            alert('An error occurred. Please try again.');
        });

        // try {
        //     const response = await AxiosInstance.patch('/admin/updateprinter', newPrinter);
        //     console.log('User added:', response.data);
        //     alert('User added successfully!');
        // } catch (error) {
        //     console.error('Error adding user:', error);
        //     alert('An error occurred. Please try again.');
        // }

        setIsEditDialogOpen(false)
        setSelectedPrinter(null)
    }

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this printer?')) {
            // send delete request to backend
        }
    } 

    useEffect(() => {
        AxiosInstance.get("/print/getprinters")
            .then((res) => {
                console.log(res.data);
                setPrinters(res.data.printers);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const { register, handleSubmit } = useForm();

    return (
        <div className="max-w m-auto">
            <div className="border rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                    <Printer className="w-6 h-6 mr-2" />
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
                <div className='mb-4'>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className='bg-blue-700'>Add Printer</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Printer</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(handleAdd)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="add-name">Printer Name</Label>
                                    <Input id="add-name" required {...register('name')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="add-building">Building</Label>
                                    <Input id="add-building" required {...register('building')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="add-site">Site</Label>
                                    <Input id="add-site" required {...register('campsite')} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="add-status">Status</Label>
                                    {/* <Select {...register("state")}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Available">Available</SelectItem>
                                            <SelectItem value="Not available">Not available</SelectItem>
                                        </SelectContent>
                                    </Select> */}
                                    <select className='class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' {...register("status")}>
                                        <option value="AVAILABLE">Available</option>
                                        <option value="NOT_AVAILABLE">NOT_AVAILABLE</option>
                                    </select>
                                </div>
                                <Button type="submit" className="w-full">Add Printer</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                            {printers.map((printer) => (
                                <tr onClick={() => setSelectedPrinter(printer)} key={printer.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.building}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{printer.campsite}</td>
                                    {(printer.status === "AVAILABLE") ?
                                        (<td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{printer.status}</td>) :
                                        (<td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{printer.status}</td>)}
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            console.log(printer)
                                                            setSelectedEditPrinter(printer)
                                                            console.log("Button clicked")
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Printer</DialogTitle>
                                                    </DialogHeader>
                                                    <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-name">Printer Name</Label>
                                                            <Input
                                                                id="edit-name"
                                                                name="name"
                                                                defaultValue={selectedEditPrinter?.name}
                                                                {...register('name')}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-building">Building</Label>
                                                            <Input
                                                                id="edit-building"
                                                                name="building"
                                                                defaultValue={selectedEditPrinter?.building}
                                                                {...register('building')}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-site">Site</Label>
                                                            <Input
                                                                id="edit-site"
                                                                name="site  "
                                                                defaultValue={selectedEditPrinter?.campsite}
                                                                {...register('campsite')}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="edit-status">Status</Label>
                                                            {/* <Select name="status" 
                                                            defaultValue={selectedEditPrinter?.status}
                                                            {...register('status')}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="AVAILABLE">Available</SelectItem>
                                                                    <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                                                                </SelectContent>
                                                            </Select> */}
                                                            <select className='class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' {...register("status")}>
                                                                <option value="AVAILABLE">AVAILABLE</option>
                                                                <option value="NOT_AVAILABLE">NOT_AVAILABLE</option>
                                                            </select>
                                                        </div>
                                                        <Button type="submit" className="w-full">Save Changes</Button>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(printer.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )}


                        </tbody>
                    </table>
                </div>
            </div >
            {/* {selectedPrinter && (
                <PrinterDialog
                    isOpen={true}
                    onClose={() => setSelectedPrinter(null)}
                    printer={selectedPrinter}
                    printerName={selectedPrinter.name} />
            )
            } */}
        </div >
    )
}

