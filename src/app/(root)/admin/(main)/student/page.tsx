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

// const mockStudents = [
//   {
//     name: 'Đặng Ngọc Bảo Trâm',
//     id: '2213568',
//     faculty: 'Computer Science and Engineering',
//     documents: 3,
//     pages: 15
//   },

//   {
//     name: 'Đặng Vũ Tuấn Kiệt',
//     id: '2213456',
//     faculty: 'Electrical Engineering',
//     documents: 2,
//     pages: 10
//   },

//   {
//     name: 'Bùi Trọng Văn',
//     id: '2211111',
//     faculty: 'Chemical Engineering',
//     documents: 1,
//     pages: 5
//   }
// ]

export default function StudentHistoryPage() {
	const [mockStudents, setMockStudents] = useState<any[]>([])
	// const [histories, setHistories] = useState([])
	const [filteredStudents, setFilteredStudents] = useState(mockStudents)

	useEffect(() => {
		AxiosInstance.get("/users/all")
			.then((res) => {
				// console.log(res.data.users);
				setMockStudents(res.data.users);
				setFilteredStudents(res.data.users);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [])



	const [id, setId] = useState('')
	const [name, setName] = useState('')
	const [facultyName, setFacultyName] = useState('')

	const faculties = ['Computer Science and Engineering', 'Electrical Engineering', 'Chemical Engineering', 'All']

	const handleIdChange = (e: any) => {
		setId(e.target.value)

	}

	const handleNameChange = (e: any) => {
		setName(e.target.value)
	}

	const handleStudentFacultyChange = (value: any) => {
		setFacultyName(value)
	}

	function filter() {
		console.log('Filtering')
		console.log(id, name, facultyName)

		const filtered = mockStudents.filter((student) => {
			if (id && !student.id.startsWith(id)) {
				return false
			}

			// if (name && !student.name.startsWith(name)) {
			//   return false
			// }

			if (name) {
				const regexPattern = new RegExp(`^${name.replace(/%/g, ".*").replace(/\$/g, "%$")}`, 'i')
				console.log(regexPattern, student.name, regexPattern.test(student.name))
				return regexPattern.test(student.name)
			}

			if (facultyName && facultyName !== 'All' && student.facultyName !== facultyName) {
				return false
			}
			return true
		})

		setFilteredStudents(filtered)

	}

	// useEffect(() => {
	//   AxiosInstance.get("/admin/history")
	//           .then((res) => {
	//               console.log(res.data);
	//               setHistories(res.data.history);
	//           })
	//           .catch((err) => {
	//               console.log(err);
	//           });
	// },[])

	return (
		<div className="w-screen md:w-full m-auto p-6">
			<div className="border rounded-lg shadow-sm p-6">
				<div className="flex items-center mb-6">
					<GraduationCap className="w-6 h-6 mr-2" />
					<h1 className="text-2xl font-semibold">Student</h1>
				</div>

				<div className="grid grid-cols-1 md:flex md:flex-row gap-4 mb-6">
					<div className="w-32">
						<Label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
							StudentID
						</Label>
						<Input className="self-end" type='text' id="id" placeholder="e.g., 2213456" onChange={handleIdChange} />
					</div>
					<div className='flex-1'>
						<Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
							Name
						</Label>
						<Input className="items-end" type='text' id="name" placeholder="e.g., Nguyễn Văn A / Nguyễn / %Văn" onChange={handleNameChange} />
						<p className='text-xs text-muted-foreground m-1'>Use % as a wildcard for missing characters</p>
					</div>
					<div className='flex-1'>
						<Label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
							Faculty
						</Label>
						<Select onValueChange={handleStudentFacultyChange}>
							<SelectTrigger>
								<SelectValue placeholder="Select a Faculty" />
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

					<Button className='bg-blue-700 self-center' onClick={filter}>Filter</Button>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Student Name
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									Student ID
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									Faculty
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									# Printed Documents
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									# Printed Pages
								</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
									# Remained Pages
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">

							{filteredStudents.map((student) => (
								<tr key={student.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm">{student.name}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-center">{student.mssv}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-center">{student.facultyName}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-center">{student.numOfDocuments}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-center">{student.totalPages}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-center">{student.remainPages}</td>
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

