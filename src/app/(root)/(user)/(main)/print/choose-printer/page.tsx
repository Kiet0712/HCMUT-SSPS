"use client";

import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Progress } from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import { Printer } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const  page_per_printer = 100;
const printers = [
    { id: "H1-1", requests: 12, pagesLeft: 80, inkLeft: 50 },
    { id: "H1-2", requests: 7, pagesLeft: 65, inkLeft: 45 },
    { id: "H1-3", requests: 20, pagesLeft: 25, inkLeft: 10 },
    { id: "H6-1", requests: 4, pagesLeft: 90, inkLeft: 80 },
    { id: "H6-2", requests: 24, pagesLeft: 40, inkLeft: 20 },
    { id: "H6-3", requests: 1, pagesLeft: 95, inkLeft: 85 },
];

export default function ChoosePrinter() {
  const [selectedPrinter, setSelectedPrinter] = useState<string | null>(null);

  const handleSelectPrinter = (index: string) => {
      console.log(index);
      setSelectedPrinter(index);
  }

  return (
    <div className="p-6 bg-secondary">
      <h1 className="text-center text-4xl font-bold mb-6">Choose a Printer</h1>
      <div className="grid grid-cols-3 gap-6">
        {printers.map((printer) => (
          <Card key={printer.id} className={cn("border", printer.id == selectedPrinter ? "bg-blue-50" : "bg-white")} onClick={() => handleSelectPrinter(printer.id)}>
            <CardHeader>
              <div className='flex flex-col items-center'>
                <div className='flex flex-row item-center'>
                <Printer className='w-12 h-12 inline-block mr-4' color="#404040" strokeWidth={1.5}/>
                <h2 className="text-4xl font-semibold inline-block">{printer.id}</h2>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 mb-4">Pending Requests: {printer.requests}</p>
              <div className="mb-4">
                <p className="text-sm mb-2">Pages Left: {printer.pagesLeft} / {page_per_printer}</p>
                <Progress value={(printer.pagesLeft / page_per_printer) * 100} color="bg-green-500"/>
              </div>
              <div className='mb-4'>
                <p className="text-sm mb-2">Ink Left:</p>
                <Progress value={(printer.inkLeft / 100) * 100} color="bg-red-500"/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button className="bg-blue-700">Confirm</Button>
      </div>
    </div>
  );
}