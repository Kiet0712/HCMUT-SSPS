"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AxiosInstance } from "@/utils/axiosInstance";
import Link from "next/link";

interface PrintHistory {
  createAt: string;
  fileName: string;
  filesize: string;
  copies: number;
  printer: string;
  pages: number;
  url: string;
}

const printHistory: PrintHistory[] = [
  {
    time: "2024-02-12 14:30",
    fileName: "YOLOv10.pdf",
    fileSize: "2.3MB",
    copies: 1,
    printer: "H6-1",
    pages: 10,
  },
  {
    time: "2024-02-12 14:15",
    fileName: "Mamba.pdf",
    fileSize: "3.5MB",
    copies: 2,
    printer: "H6-1",
    pages: 20,
  },
];

const pages_remained = 10;

let n_pages = 0;

for (let doc of printHistory) {
  n_pages += doc.pages;
}

const money_per_page = 1000;

function formatISODate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  };

  return date.toLocaleDateString("en-US", options);
}

export default function HistoryPage() {
  const [history, setHistory] = useState([] as PrintHistory[]);

  useEffect(() => {
    AxiosInstance.get("/users/history")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.history[0].fileSize);
        setHistory(res.data.history);
        console.log(history);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">
                    {formatISODate(item.createAt)}
                  </TableCell>
                  <TableCell>
                    <Link
                      className="text-blue-500 hover:underline"
                      href={`http://103.82.133.50:4000/uploads/${item.url}`}
                      passHref
                    >
                      {item.fileName}
                    </Link>
                  </TableCell>
                  {/* help me make the filename tablecell clickable to 103.82.133.50:4000/uploads/{item.url} */}
                  <TableCell className="text-center">
                    {Math.floor(item.filesize / 1024)} KB
                  </TableCell>
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
  );
}
