import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BACKEND_URL, companyMap } from "@/lib/config"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Spinner } from "@/components/Spinner"

const mockData = [
  {
    id: 5,
    gstin: "29XYZAB2345G9Z8",
    password: "spark123",
    name: "Spark",
    sales: "AAA",
    email: "spark@gmail.com",
    contactNo: "1212121212",
  },
]

export  function GSTINTable() {
  const [data, setData] = useState(mockData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false);
  const {company}=useParams()
  const [sp, ] = useSearchParams();
  const navigate= useNavigate();


  async function fetchCustomers(){
    console.log(sp.get("trigram"))
    const res=await axios.post(`${BACKEND_URL}/api/user/getcustomers?company=${company}`,{
        trigram: sp.get("trigram")
    })
    console.log(res.data)
    setData(res.data.response)
    setIsLoading(false)

  }

  useEffect(()=>{
    try{
        fetchCustomers();
    }
    catch{
        alert("Error fetching data")
    }
  },[])

   if(isLoading)
      {
        return(
          <div className='flex justify-center items-center h-screen'>
         
          <Spinner />
          
          
          </div>
      )
    
}
  
  const filteredData = data.filter(
    (item) =>
      item.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const onSubmit = async (gstin: string) => {
    try{
        setButtonLoading(true)
        const res = await axios.post(`${BACKEND_URL}/api/user/trigramlogin?company=${company}`, {
          gstNo: gstin,
        })
        console.log(res.data)
        localStorage.setItem(`${company}_token`, res.data.token)
        setButtonLoading(false)
        navigate(`/${company}/home`);

    }
    catch(err){
        setButtonLoading(false)
        alert("Error logging in. Please check your credentials.")
    }
  }
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
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
              <Button variant="outline" size="icon" onClick={refreshData} className="relative">
                <motion.div
                  animate={{ rotate: isLoading ? 360 : 0 }}
                  transition={{ duration: 1, repeat: isLoading ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        backgroundColor: "rgba(241, 245, 249, 0.5)",
                        transition: { duration: 0.1 },
                      }}
                      className="group"
                    >
                      <TableCell className="font-medium">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          {item.gstin}
                        </motion.div>
                      </TableCell>
                      <TableCell>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          {item.name}
                        </motion.div>
                      </TableCell>
                      <TableCell className="text-right">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button
                            type="submit"
                            className={`w-1/2 bg-${companyMap[company as keyof typeof companyMap].color}-600 hover:bg-${companyMap[company as keyof typeof companyMap].color}-700`}
                            onClick={() => {
                                onSubmit(item.gstin)
                            }}
                            disabled={buttonLoading}
                           
                        >
                            {buttonLoading ? "Redirecting" : "Connect"}
                        </Button>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
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
