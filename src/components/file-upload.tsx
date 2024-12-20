"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrintDialog } from "./print-dialog";
import { useSearchParams } from "next/navigation";
import { AxiosInstance } from "@/utils/axiosInstance";

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

export function FileUpload() {
  //get id from param
  const searchParams = useSearchParams();
  const printId = searchParams.get("printId");
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [pages, setPages] = useState(20);
  const [copies, setCopies] = useState(1);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: crypto.randomUUID(),
        })
      ),
    ]);
    // for (const file of files) {
    //   console.log(file.preview) }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const onSubmit = () => {
    //payload is printer id,
    // console.log(printId);
    // console.log(files);
    // console.log(pages, copies);

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("id", printId || "");
      formData.append("pages", pages.toString());
      formData.append("copies", copies.toString());
      formData.append("file", file);

      AxiosInstance.post("/print/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res.data);
          window.alert("File sent successfully");
        })
        .catch((err) => {
          // console.log(err);
          window.alert("Error sending file");
        });
    });
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 p-4">
      <h1 className="text-2xl font-semibold mb-6">Upload File</h1>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? "border-blue-600 bg-blue-50" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600">Select or drop files here</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 text-sm text-gray-600">
        <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
        <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
        <span className="px-2 py-1 bg-gray-100 rounded">TXT</span>
        <span className="px-2 py-1 bg-gray-100 rounded">{"< 100 MB"}</span>
      </div>

      <div className="mt-6 space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedFile(file)}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {file.name}{" "}
                <span className="text-gray-500">
                  ({(file.size / (1024 * 1024)).toFixed(1)}MB)
                </span>
              </p>
              <p className="text-sm text-blue-600">Upload Successful</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile(file.id);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <Button className="mt-6 w-24 bg-blue-700" size="lg" onClick={onSubmit}>
          Print
        </Button>
      )}

      {selectedFile && (
        <PrintDialog
          isOpen={true}
          onClose={() => setSelectedFile(null)}
          file={selectedFile}
          setCopies={setCopies}
          setPages={setPages}
        />
      )}
    </div>
  );
}
