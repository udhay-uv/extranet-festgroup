
// // import { useEffect, useState } from "react"
// // import { motion } from "framer-motion"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Search, RefreshCw } from "lucide-react"
// // import { Input } from "@/components/ui/input"
// // import { BACKEND_URL , companyMap} from "@/lib/config"
// // import { useNavigate, useParams, useSearchParams } from "react-router-dom"
// // import axios from "axios"
// // import { Spinner } from "@/components/Spinner"

// // const mockData = [
// //   {
// //     id: 5,
// //     gstin: "29XYZAB2345G9Z8",
// //     password: "spark123",
// //     name: "Spark",
// //     sales: "AAA",
// //     email: "spark@gmail.com",
// //     contactNo: "1212121212",
// //   },
// // ]

// // export function GSTINTable() {
// //   const [data, setData] = useState(mockData)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [isLoading, setIsLoading] = useState(true)
// //   const {company} = useParams()
// //   const [sp] = useSearchParams();
// //   const navigate = useNavigate();

// //   async function fetchCustomers() {
// //     try {
// //       const res = await axios.post(`${BACKEND_URL}/api/user/getcustomers?company=${company}`, {
// //         trigram: sp.get("trigram")
// //       })
// //       setData(res.data.response)
// //     } catch (error) {
// //       alert("Error fetching data")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     fetchCustomers();
// //   }, [])

// //   const handleGstinClick = async (gstin: string) => {
// //     try {
// //       const res = await axios.post(`${BACKEND_URL}/api/user/trigramlogin?company=${company}`, {
// //         gstNo: gstin,
// //       })
// //       localStorage.setItem(`${company}_token`, res.data.token)
// //       navigate(`/${company}/home`);
// //     } catch (err) {
// //       alert("Error logging in. Please check your credentials.")
// //     }
// //   }

// //   const refreshData = () => {
// //     setIsLoading(true)
// //     fetchCustomers()
// //   }

// //   const filteredData = data.filter(
// //     (item) =>
// //       item.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       item.name.toLowerCase().includes(searchTerm.toLowerCase()),
// //   )

// //   if (isLoading) {
// //     return (
// //       <div className='flex justify-center items-center h-screen'>
// //         <Spinner />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
// //       <div className="flex justify-center mb-6">
// //         <img src="/a.png" alt="Logo" className="h-16 w-auto" />
// //       </div>
// //       <Card className="max-w-5xl mx-auto shadow-lg">
// //         <CardHeader className="bg-white dark:bg-slate-900 rounded-t-lg border-b">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div>
// //               <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
// //                 GSTIN Registry
// //               </CardTitle>
// //               <CardDescription>Manage and view GSTIN information</CardDescription>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <div className="relative">
// //                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// //                 <Input
// //                   type="search"
// //                   placeholder="Search by GSTIN or name..."
// //                   className="pl-8 w-full md:w-[250px]"
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //               </div>
// //               <Button variant="outline" size="icon" onClick={refreshData} className="relative">
// //                 <motion.div
// //                   animate={{ rotate: isLoading ? 360 : 0 }}
// //                   transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
// //                 >
// //                   <RefreshCw className="h-4 w-4" />
// //                 </motion.div>
// //               </Button>
// //             </div>
// //           </div>
// //         </CardHeader>
// //         <CardContent className="p-0">
// //           <div className="overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow className="bg-slate-50 dark:bg-slate-800/50">
// //                   <TableHead className="w-[200px]">GSTIN</TableHead>
// //                   <TableHead>Name</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredData.length > 0 ? (
// //                   filteredData.map((item, index) => (
// //                     <motion.tr
// //                       key={item.id}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{
// //                         duration: 0.3,
// //                         delay: index * 0.1,
// //                         ease: "easeOut",
// //                       }}
// //                       whileHover={{
// //                         backgroundColor: "rgba(241, 245, 249, 0.5)",
// //                         transition: { duration: 0.1 },
// //                       }}
// //                       className="group"
// //                     >
// //                       <TableCell 
// //                         className="font-medium cursor-pointer hover:text-blue-600 hover:underline"
// //                         onClick={() => handleGstinClick(item.gstin)}
// //                       >
// //                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //                           {item.gstin}
// //                         </motion.div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <motion.div
// //                           initial={{ opacity: 0 }}
// //                           animate={{ opacity: 1 }}
// //                           transition={{ duration: 0.5, delay: 0.1 }}
// //                         >
// //                           {item.name}
// //                         </motion.div>
// //                       </TableCell>
// //                     </motion.tr>
// //                   ))
// //                 ) : (
// //                   <TableRow>
// //                     <TableCell colSpan={2} className="h-24 text-center">
// //                       No results found.
// //                     </TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }






// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Search, RefreshCw } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { BACKEND_URL } from "@/lib/config"
// import { useNavigate, useParams, useSearchParams } from "react-router-dom"
// import axios from "axios"
// import { Spinner } from "@/components/Spinner"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// export function GSTINTable() {
//   const [data, setData] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const { company } = useParams()
//   const [sp] = useSearchParams()
//   const navigate = useNavigate()

//   const [open, setOpen] = useState(false)
//   const [newGSTIN, setNewGSTIN] = useState("")
//   const [newName, setNewName] = useState("")

//   async function fetchCustomers() {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/user/getcustomers?company=${company}`, {
//         trigram: sp.get("trigram")
//       })
//       setData(res.data.response)
//     } catch (error) {
//       alert("Error fetching data")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const handleGstinClick = async (gstin) => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/user/trigramlogin?company=${company}`, {
//         gstNo: gstin,
//       })
//       localStorage.setItem(`${company}_token`, res.data.token)
//       navigate(`/${company}/home`)
//     } catch (err) {
//       alert("Error logging in. Please check your credentials.")
//     }
//   }

//   const refreshData = () => {
//     setIsLoading(true)
//     fetchCustomers()
//   }

//   const handleAddCompany = async () => {
//     if (!newGSTIN || !newName) {
//       alert("Please enter both GSTIN and Company Name")
//       return
//     }

//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/user/createcustomer?company=${company}`, {
//         gstin: newGSTIN,
//         name: newName,
//         sales: "TTTT",
//         email: "",
//         contactNo: "",
//         password: "",
//         trigram: sp.get("trigram") || "NA"
//       })

//       if (res.data.status === "warning") {
//         alert(res.data.message)
//       } else {
//         alert("✅ Company added successfully.")
//       }

//       setOpen(false)
//       setNewGSTIN("")
//       setNewName("")
//       refreshData()
//     } catch (err) {
//       alert("❌ Something went wrong while adding the company.")
//     }
//   }

//   const filteredData = data.filter(
//     (item) =>
//       item.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Spinner />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
//       <div className="flex justify-center mb-6">
//         <img src="/a.png" alt="Logo" className="h-16 w-auto" />
//       </div>
//       <Card className="max-w-5xl mx-auto shadow-lg">
//         <CardHeader className="bg-white dark:bg-slate-900 rounded-t-lg border-b">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
//                 GSTIN Registry
//               </CardTitle>
//               <CardDescription>Manage and view GSTIN information</CardDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search by GSTIN or name..."
//                   className="pl-8 w-full md:w-[250px]"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <Button variant="outline" size="icon" onClick={refreshData} className="relative">
//                 <motion.div
//                   animate={{ rotate: isLoading ? 360 : 0 }}
//                   transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
//                 >
//                   <RefreshCw className="h-4 w-4" />
//                 </motion.div>
//               </Button>
//               <Button onClick={() => setOpen(true)} className="bg-blue-600 text-white">+ New Company</Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-slate-50 dark:bg-slate-800/50">
//                   <TableHead className="w-[200px]">GSTIN</TableHead>
//                   <TableHead>Name</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item, index) => (
//                     <motion.tr
//                       key={item.gstin}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
//                       whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)", transition: { duration: 0.1 } }}
//                       className="group"
//                     >
//                       <TableCell
//                         className="font-medium cursor-pointer hover:text-blue-600 hover:underline"
//                         onClick={() => handleGstinClick(item.gstin)}
//                       >
//                         {item.gstin}
//                       </TableCell>
//                       <TableCell>{item.name}</TableCell>
//                     </motion.tr>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={2} className="h-24 text-center">
//                       No results found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Company</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Input placeholder="Enter GSTIN" value={newGSTIN} onChange={(e) => setNewGSTIN(e.target.value)} />
//             <Input placeholder="Enter Company Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
//           </div>
//           <DialogFooter>
//             <Button onClick={handleAddCompany}>Submit</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }









// // All imports stay same
// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Search, RefreshCw } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { BACKEND_URL } from "@/lib/config"
// import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom" // <-- Added Link from react-router-dom
// import axios from "axios"
// import { Spinner } from "@/components/Spinner"


// export function GSTINTable() {
//   const [data, setData] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const { company } = useParams()
//   const [sp] = useSearchParams()
//   const navigate = useNavigate()

//   async function fetchCustomers() {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/user/getcustomers?company=${company}`, {
//         trigram: sp.get("trigram")
//       })
//       setData(res.data.response)
//     } catch (error) {
//       alert("Error fetching data")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const handleGstinClick = async (gstin) => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/user/trigramlogin?company=${company}`, {
//         gstNo: gstin,
//       })
//       localStorage.setItem(`${company}_token`, res.data.token)
//       navigate(`/${company}/home`)
//     } catch (err) {
//       alert("Error logging in. Please check your credentials.")
//     }
//   }

//   const refreshData = () => {
//     setIsLoading(true)
//     fetchCustomers()
//   }

//   const filteredData = data.filter(
//     (item) =>
//       item.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (isLoading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <Spinner />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
//       <div className="flex justify-center mb-6">
//         <img src="/a.png" alt="Logo" className="h-16 w-auto" />
//       </div>
//       <Card className="max-w-5xl mx-auto shadow-lg">
//         <CardHeader className="bg-white dark:bg-slate-900 rounded-t-lg border-b">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
//                 GSTIN Registry
//               </CardTitle>
//               <CardDescription>Manage and view GSTIN information</CardDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               {/* ✅ Replace button with link to Register.tsx */}
//               <Link
//                 to="/Register"
//                 className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
//               >
//                 Create Accounts

                
//               </Link>

//               <div className="relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search by GSTIN or name..."
//                   className="pl-8 w-full md:w-[250px]"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <Button onClick={()=>{navigate("/:company/register")}} variant="outline" size="icon" onClick={refreshData} className="relative">
//                 <motion.div
//                   animate={{ rotate: isLoading ? 360 : 0 }}
//                   transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
//                 >
//                   <RefreshCw className="h-4 w-4" />
//                 </motion.div>
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-slate-50 dark:bg-slate-800/50">
//                   <TableHead className="w-[200px]">GSTIN</TableHead>
//                   <TableHead>Name</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item, index) => (
//                     <motion.tr
//                       key={item.gstin}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
//                       whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)", transition: { duration: 0.1 } }}
//                       className="group"
//                     >
//                       <TableCell
//                         className="font-medium cursor-pointer hover:text-blue-600 hover:underline"
//                         onClick={() => handleGstinClick(item.gstin)}
//                       >
//                         {item.gstin}
//                       </TableCell>
//                       <TableCell>{item.name}</TableCell>
//                     </motion.tr>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={2} className="h-24 text-center">
//                       No results found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }






import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BACKEND_URL } from "@/lib/config"
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom"
import axios from "axios"
import { Spinner } from "@/components/Spinner"

export function GSTINTable() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { company } = useParams()
  const [sp] = useSearchParams()
  const navigate = useNavigate()

  async function fetchCustomers() {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/getcustomers?company=${company}`, {
        trigram: sp.get("trigram")
      })
      setData(res.data.response)
    } catch (error) {
      alert("Error fetching data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleGstinClick = async (gstin) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/trigramlogin?company=${company}`, {
        gstNo: gstin,
      })
      localStorage.setItem(`${company}_token`, res.data.token)
      navigate(`/${company}/home`)
    } catch (err) {
      alert("Error logging in. Please check your credentials.")
    }
  }

  const refreshData = () => {
    setIsLoading(true)
    fetchCustomers()
  }

  const filteredData = data.filter(
    (item) =>
      item.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="flex justify-center mb-6">
        <img src="/a.png" alt="Logo" className="h-16 w-auto" />
      </div>

      <Card className="max-w-5xl mx-auto shadow-lg">
        <CardHeader className="bg-white dark:bg-slate-900 rounded-t-lg border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-400 dark:to-slate-200 bg-clip-text text-transparent">
                GSTIN Registry
              </CardTitle>
              <CardDescription>Manage and view GSTIN information</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              {/* ✅ Proper dynamic routing to register page */}
              <Link
                to={`/${company}/register`}
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Create Accounts
              </Link>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by GSTIN or name..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button onClick={refreshData} variant="outline" size="icon" className="relative">
                <motion.div
                  animate={{ rotate: isLoading ? 360 : 0 }}
                  transition={{
                    duration: 1,
                    repeat: isLoading ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                  <TableHead className="w-[200px]">GSTIN</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <motion.tr
                      key={item.gstin}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        backgroundColor: "rgba(241, 245, 249, 0.5)",
                        transition: { duration: 0.1 }
                      }}
                      className="group"
                    >
                      <TableCell
                        className="font-medium cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => handleGstinClick(item.gstin)}
                      >
                        {item.gstin}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
