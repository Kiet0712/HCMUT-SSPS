'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { AxiosInstance } from '@/utils/axiosInstance'

const documentTypes = [
    { id: 'pdf', label: 'PDF' },
    { id: 'docx', label: 'DOCX' },
    { id: 'txt', label: 'TXT' },
    { id: 'jpg', label: 'JPG' },
    { id: 'png', label: 'PNG' },
]

export default function ConfigurationPage() {
    const [pagesPerStudent, setPagesPerStudent] = useState(200);
    const [allowedTypes, setAllowedTypes] = useState(['pdf', 'docx']);
    // const { toast } = useToast()

    useEffect(() => {
        AxiosInstance.get("/users/all")
        .then((res) => {
            console.log(res.data.users[0].maxPages);
            setPagesPerStudent(res.data.users[0].maxPages);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        AxiosInstance.get("/print/types")
        .then((res) => {
            console.log(res.data.types);
            setAllowedTypes(res.data.types);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log(process.env.BASE_URL);
        console.log({ pagesPerStudent, allowedTypes });
        AxiosInstance.post("/print/updatetypes", { "allowedFileTypes": allowedTypes })
            .catch((err) => {
                console.log(err);
            });
        AxiosInstance.post("/users/admin/configpages", { "pages": pagesPerStudent })
            .catch((err) => {
                console.log(err);
            });
      };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     // Here you would typically send this data to your backend
    //     console.log({ pagesPerStudent, allowedTypes })
    //     window.alert('Configuration saved!')
    //     // toast({
    //     //     title: "Scheduled: Catch up ",
    //     //     description: "Friday, February 10, 2023 at 5:57 PM",
    //     //     action: (
    //     //       <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
    //     //     ),
    //     //   })
    // }

    return (
        <div className="container mx-auto py-6">
            <Card className='m-16'>
                <CardHeader>
                    <CardTitle>
                        <h1 className='font-bold text-2xl'>Printing Configuration</h1>
                    </CardTitle>
                    <CardDescription>Set printing limits and allowed document types for students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="pagesPerStudent">Pages per student</Label>
                            <Input
                                id="pagesPerStudent"
                                type="number"
                                value={pagesPerStudent}
                                onChange={(e) => {
                                    console.log(e.target.valueAsNumber);
                                    setPagesPerStudent(e.target.valueAsNumber);
                                    // console.log(pagesPerStudent);
                                }}
                                min={100}
                                step={100}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Allowed document types</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {documentTypes.map((type) => (
                                    <div key={type.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={type.id}
                                            checked={allowedTypes.includes(type.id)}
                                            onCheckedChange={(checked) => {
                                                setAllowedTypes(
                                                    checked
                                                        ? [...allowedTypes, type.id]
                                                        : allowedTypes.filter((t) => t !== type.id)
                                                )
                                            }}
                                            className='text-blue-700'
                                        />
                                        <Label htmlFor={type.id}>{type.label}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button className="bg-blue-700 text-white" type="submit">Save Configuration</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}