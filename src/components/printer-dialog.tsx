'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { PrinterHistory, PrinterDialogProps } from '@/app/types/printer'
import { Printer } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PrinterDialog({ isOpen, onClose, printer, printerName } : PrinterDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Document</DialogTitle>
        </DialogHeader>

        <div className="border rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Printer className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-semibold">Printer {printerName}</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #Copies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #Pages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

              {printer.map((history) => (
                <tr key={history.time}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{history.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{history.fileName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{history.copies}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{history.pages}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{history.studentId}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
      </DialogContent>
    </Dialog>
  )
}