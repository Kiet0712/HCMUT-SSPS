'use client'

import { AxiosInstance } from '@/utils/axiosInstance'
import { GraduationCap } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { set } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const mockStudents = [
  {
    studentName: 'Đặng Ngọc Bảo Trâm',
    studentId: '2213568',
    faculty: 'Computer Science and Engineering',
    documents: 3,
    pages: 15
  },

  {
    studentName: 'Đặng Vũ Tuấn Kiệt',
    studentId: '2213456',
    faculty: 'Electrical Engineering',
    documents: 2,
    pages: 10
  },

  {
    studentName: 'Bùi Trọng Văn',
    studentId: '2211111',
    faculty: 'Chemical Engineering',
    documents: 1,
    pages: 5
  }
]

export default function StudentHistoryPage() {
  const [histories, setHistories] = useState([])
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  
  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [faculty, setFaculty] = useState('')

  const faculties = ['Computer Science and Engineering', 'Electrical Engineering', 'Chemical Engineering', 'All']

  const handleStudentIdChange = (e: any) => {
    setStudentId(e.target.value)

  }

  const handleStudentNameChange = (e: any) => {
    setStudentName(e.target.value)
  }

  const handleStudentFacultyChange = (value: any) => {
    setFaculty(value)
  }

  function filter () {
    console.log('Filtering')
    console.log(studentId, studentName, faculty)
    
    const filtered = mockStudents.filter((student) => {
      if (studentId && !student.studentId.startsWith(studentId)) {
        return false
      }

      // if (studentName && !student.studentName.startsWith(studentName)) {
      //   return false
      // }

      if (studentName) {
        const regexPattern = new RegExp(`^${studentName.replace(/%/g, ".*").replace(/\$/g, "%$")}`, 'i')
        console.log(regexPattern, student.studentName, regexPattern.test(student.studentName))
        return regexPattern.test(student.studentName)
      }

      if (faculty && faculty !== 'All' && student.faculty !== faculty) {
        return false
      }
      return true
    })

    setFilteredStudents(filtered)
    
  }

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
    <div className="w-screen md:w-full m-auto p-6">
      <div className="border rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <GraduationCap className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-semibold">Student</h1>
        </div>

        <div className="grid grid-cols-1 md:flex md:flex-row gap-4 mb-6">
          <div className="w-32">
            <Label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
              StudentID
            </Label>
            <Input className="self-end" type='text' id="studentId" placeholder="e.g., 2213456" onChange={handleStudentIdChange}/>
          </div>
          <div className='flex-1'>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </Label>
            <Input className="items-end" type='text' id="name" placeholder="e.g., Nguyễn Văn A / Nguyễn / %Văn" onChange={handleStudentNameChange}/>
            <p className='text-xs text-muted-foreground m-1'>Use % as a wildcard for missing characters</p>
          </div>
          <div className='flex-1'>
            <Label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
              Faculty
            </Label>
            <Select onValueChange={handleStudentFacultyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Faculty"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Faculties</SelectLabel>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className='bg-blue-700 self-end' onClick={filter}>Filter</Button>
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

              {filteredStudents.map((student) => (
                <tr key = {student.studentId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.faculty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.documents}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{student.pages}</td>
                </tr>
              )
              )}


            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

