'use client';

import { useState } from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

interface PrintHistory {
  time: string
  fileName: string
  fileSize: string
  copies: number
  printer: string
  pages: number
}

const printHistory: PrintHistory[] = [
  {
    time: "2024-02-12 14:30",
    fileName: "YOLOv10.pdf",
    fileSize: "2.3MB",
    copies: 1,
    printer: "H6-1",
    pages: 10
  },
  {
    time: "2024-02-12 14:15",
    fileName: "Mamba.pdf",
    fileSize: "3.5MB",
    copies: 2,
    printer: "H6-1",
    pages: 20
  },
]

const pages_remained = 10;

const money_per_page = 500;

export default function HistoryPage() {
  const [n_pages, setN_pages] = useState(0);

  const handleInputChange = (e: any) => {
    setN_pages(e.target.value);
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="m-4 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Printing Pages Payment</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex justify-end mb-4 mr-8 text-muted-foreground">Number of pages remained: {pages_remained}</div>
            <div className="flex flex-row items-center justify-center">
              <Label className="m-4 text-md">Number of pages you want to buy:</Label>
              <Input className="m-4 w-32" type="number" name="n_pages" id="n_pages" onChange={handleInputChange} min={10} step={10}/>
            </div>
        </CardContent>
        <CardFooter>
            <div className="w-full flex flex-col items-center">
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4" role="alert">
            <p className="text-center"><span className="font-bold">Total price:</span> {(n_pages * money_per_page).toLocaleString()} VND</p>
            </div>
            
            <Button className="bg-blue-700 p-2 m-4">
                Buy Pages
            </Button>
            </div>
           
        </CardFooter>
      </Card>
    </div>
  )
}