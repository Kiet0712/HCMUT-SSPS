'use client'

import { AxiosInstance } from '@/utils/axiosInstance'
import { GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'

// const students = [
//   {
//     studentName: 'Đặng Ngọc Bảo Trâm',
//     studentId: '2213568',
//     faculty: 'Computer Science and Engineering',
//     documents: 3,
//     pages: 15
//   },

//   {
//     studentName: 'Đặng Vũ Tuấn Kiệt',
//     studentId: '2213456',
//     faculty: 'Electrical Engineering',
//     documents: 2,
//     pages: 10
//   },

//   {
//     studentName: 'Bùi Trọng Văn',
//     studentId: '2213568',
//     faculty: 'Chemical Engineering',
//     documents: 1,
//     pages: 5
//   }
// ]

export default function StudentHistoryPage() {
  const [histories, setHistories] = useState([])

  useEffect(() => {
    AxiosInstance.get("/admin/history")
            .then((res) => {
                console.log(res.data);
                setHistories(res.data.history);
            })
            .catch((err) => {
                console.log(err);
            });
  },[])

  return (
    <div className="max-w m-auto p-6">
      <div className="border rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <GraduationCap className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-semibold">Student</h1>
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
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  StudentID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #Pages
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

              {/* {students.map((student) => (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.faculty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.documents}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.pages}</td>
                </tr>
              )
              )} */}


            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

