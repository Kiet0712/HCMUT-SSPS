import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

let n_pages = 0;

for (let doc of printHistory) {
    n_pages += doc.pages;
}

const money_per_page = 1000;

export default function HistoryPage() {
  return (
    <div className="container mx-auto py-6">
      <Card className="m-4 pt-4 pb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Printing Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-md">
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>FileName</TableHead>
                <TableHead className="text-center">FileSize</TableHead>
                <TableHead className="text-center">#Copies</TableHead>
                <TableHead className="text-center">Printer</TableHead>
                <TableHead className="text-center">#Pages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {printHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{item.time}</TableCell>
                  <TableCell>{item.fileName}</TableCell>
                  <TableCell className="text-center">{item.fileSize}</TableCell>
                  <TableCell className="text-center">{item.copies}</TableCell>
                  <TableCell className="text-center">{item.printer}</TableCell>
                  <TableCell className="text-center">{item.pages}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}