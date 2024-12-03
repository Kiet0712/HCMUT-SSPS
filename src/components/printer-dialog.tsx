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
import { PrinterHistorySettings, PrinterDialogProps } from '@/app/types/printer'
import { Printer } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PrinterDialog({ isOpen, onClose, printer } : PrinterDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Document</DialogTitle>
        </DialogHeader>

        <div className="border rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Printer className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-semibold">Printer {}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
              StudentID
            </label>
            <input
              type="text"
              id="studentId"
              placeholder="Enter student ID"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
              Faculty
            </label>
            <input
              type="text"
              id="faculty"
              placeholder="Enter faculty"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
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