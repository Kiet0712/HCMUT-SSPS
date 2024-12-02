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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PrintSettings, PrintDialogProps } from '../app/types/print'

export function PrintDialog({ isOpen, onClose, file }: PrintDialogProps) {
  const [settings, setSettings] = useState<PrintSettings>({
    pageRange: 'all',
    startPage: 1,
    endPage: 1,
    copies: 1,
    grayscale: false,
    doubleSided: false,
    layout: 'portrait',
    pageSize: 'a4'
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Document</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Name: {file.name}</h3>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Page Range</h3>
              <RadioGroup
                value={settings.pageRange}
                onValueChange={(value: 'all' | 'select') =>
                  setSettings(prev => ({ ...prev, pageRange: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="select" id="select" />
                  <Label htmlFor="select">Select Pages</Label>
                </div>
              </RadioGroup>

              {settings.pageRange === 'select' && (
                <div className="flex items-center gap-2 ml-6">
                  <Input
                    type="number"
                    min={1}
                    value={settings.startPage}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      startPage: parseInt(e.target.value) || 1
                    }))}
                    className="w-20"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    min={1}
                    value={settings.endPage}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      endPage: parseInt(e.target.value) || 1
                    }))}
                    className="w-20"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="copies">Copies:</Label>
              <Input
                id="copies"
                type="number"
                min={1}
                value={settings.copies}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  copies: parseInt(e.target.value) || 1
                }))}
                className="w-20"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Basic Setting</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="grayscale"
                    checked={settings.grayscale}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, grayscale: checked as boolean }))}
                  />
                  <Label htmlFor="grayscale">Print in Grayscale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="double-sided"
                    checked={settings.doubleSided}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({ ...prev, doubleSided: checked as boolean }))}
                  />
                  <Label htmlFor="double-sided">Use Double-side Printing</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Page Setup</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="layout">Layout:</Label>
                    <Select
                      value={settings.layout}
                      onValueChange={(value) =>
                        setSettings(prev => ({ ...prev, layout: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pagesize">Page size:</Label>
                    <Select
                      value={settings.pageSize}
                      onValueChange={(value) =>
                        setSettings(prev => ({ ...prev, pageSize: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select page size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Preview</h3>
            {/* <div className="aspect-[3/4] bg-white rounded-lg shadow-sm border">{file.preview}</div> */}
            <iframe src={file.preview} alt={file.preview} className='aspect-[3/4] rounded-lg shadow-sm border w-full' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

