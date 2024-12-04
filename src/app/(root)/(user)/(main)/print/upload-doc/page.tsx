// import { Navbar } from '../components/navbar'
"use-client";

import { FileUpload } from "@/components/file-upload";

export default function PrintPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <FileUpload />
    </main>
  );
}
