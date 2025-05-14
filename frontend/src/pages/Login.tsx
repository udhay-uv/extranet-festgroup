// import { motion } from "framer-motion";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "@/lib/config";
// import { companyMap } from "@/lib/config";
// import useFavicon from "@/lib/faviconhook";


// type tabProps = "gstin" | "trigram";

// export function Login() {
//   const [gstNo, setGstNo] = useState("");
//   const [gstValid, setGstValid] = useState(false); 
//   const [gstError, setGstError] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [tabs,setTabs]=useState<tabProps>("gstin");
//   const [trigram, setTrigram] = useState("");
//   const {company} = useParams();
//   const navigate = useNavigate();

//   useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

//   const handleGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setGstNo(value);

//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

//     if (!gstRegex.test(value)) {
//       setGstValid(false);
//       setGstError("Invalid GST Number format");
//     } else {
//       setGstValid(true);
//       setGstError("");
//     }
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     setLoading(true);
//     e.preventDefault(); 
//     if (!gstValid) return;

//     try {
//       console.log(gstNo, password);
//       const res = await axios.post(`${BACKEND_URL}/api/user/login?company=${company}`, {
//         gstNo,
//         password,
//       });
//       console.log(res.data);
//       localStorage.setItem(`${company}_token`, res.data.token);
//       setLoading(false);
//       navigate(`/${company}/home`);
//     } catch {
//       setLoading(false);
//       alert("Error logging in. Please check your credentials.");
//     }
//   };

//   const onTrigramSubmit = async (e: React.FormEvent) => {
//     setLoading(true);
//     e.preventDefault(); 
//     if(trigram.length!=3)
//     {
//       alert("enter valid trigram")
//       setLoading(false);
//       return;

//     }

//     try {
//       console.log(trigram);
//       const res = await axios.post(`${BACKEND_URL}/api/user/trigram?company=${company}`, {
//         trigram
//       });
//       console.log(res.data);
//       navigate(`/${company}/sales_customer?trigram=${trigram}`);
//     }
//     catch {
//       setLoading(false);
//       alert("Error logging in. Please check your credentials.");
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full space-y-8"
//       >
        
//         <Card className="p-8">
//           <div className="text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 260, damping: 20 }}
//               className={`inline-flex p-4 rounded-full mb-4 bg-${companyMap[company as keyof typeof companyMap].color}-100 text-${companyMap[company as keyof typeof companyMap].color}-600`}
//             >
//               <img src={`/${companyMap[company as keyof typeof companyMap].image}`} alt="festa" height={60} width={200} />
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-3xl font-bold text-gray-900"
//             >
//               Sign in to {companyMap[company as keyof typeof companyMap].name}
//             </motion.h2>
//           </div>
//           <div className="flex justify-center mt-4">
//             <Button variant="link" onClick={() => setTabs("gstin")} className={`mr-4 ${tabs === "gstin" ? "text-blue-600" : "text-gray-500"}`}>
//               GSTIN
//             </Button>
//             <Button variant="link" onClick={() => setTabs("trigram")} className={`${tabs === "trigram" ? "text-blue-600" : "text-gray-500"}`}>
//               Trigram
//             </Button>
//           </div>
//           {tabs==='gstin' && 

//           <form className="mt-8 space-y-6" onSubmit={onSubmit}>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-4"
//             >
//               <div>
//                 <Label htmlFor="gstNo">GST Number</Label>
//                 <Input
//                   id="gstNo"
//                   type="text"
//                   // pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
//                   pattern="(^(?:[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]|[A-Z]{3})$)"
//                   className="mt-1"
//                   required
//                   value={gstNo}
//                   onChange={handleGstChange}
//                   onBlur={(e) => e.target.reportValidity()} 
//                 />
//                 {gstError && <p className="text-red-500 text-sm">{gstError}</p>}
//               </div>

//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   className="mt-1"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   disabled={!gstValid} 
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <Button
//                 type="submit"
//                 className={`w-full bg-${companyMap[company as keyof typeof companyMap].color}-600 hover:bg-${companyMap[company as keyof typeof companyMap].color}-700`}
//                 disabled={!gstValid || loading} 
//               >
//                 {loading ? "Signing in..." : "Sign in"}
//               </Button>
//             </motion.div>
//           </form>
//           }
//           {tabs==='trigram' &&
//           <form className="mt-8 space-y-6" onSubmit={onTrigramSubmit}>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-4"
//             >
  
//               <div>
//                 <Label htmlFor="trigram">Trigram</Label>
//                 <Input
//                   id="trigram"
//                   type="text"
//                   className="mt-1"
//                   required
//                   value={trigram}
//                   onChange={(e) => setTrigram(e.target.value)}
               
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <Button
//                 type="submit"
//                 className={`w-full bg-${companyMap[company as keyof typeof companyMap].color}-600 hover:bg-${companyMap[company as keyof typeof companyMap].color}-700`}
//                 disabled={loading} 
//               >
//                 {loading ? "Signing in..." : "Sign in"}
//               </Button>
//             </motion.div>
//           </form>
//           }

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="mt-4 text-center"
//           >
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link to={`/${company}/register`} className={`font-medium text-${companyMap[company as keyof typeof companyMap].color}-600`}>
//                 Create Account
//               </Link>
//             </p>
//           </motion.div>
//         </Card>

//       </motion.div>
//     </div>
//   );
// }










import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { companyMap } from "@/lib/config";
import useFavicon from "@/lib/faviconhook";

export function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { company } = useParams();
  const navigate = useNavigate();

  useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value.toUpperCase());
    setErrorMessage("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const validateIdentifier = (id: string) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const trigramRegex = /^[A-Z]{3}$/;
    if (gstinRegex.test(id)) return "gstin";
    if (trigramRegex.test(id)) return "trigram";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const idType = validateIdentifier(identifier);
    if (!idType) {
      setErrorMessage("Please enter a valid GSTIN or 3-character TrigramGST.");
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        idType === "gstin"
          ? `${BACKEND_URL}/api/user/login?company=${company}`
          : `${BACKEND_URL}/api/user/trigram?company=${company}`;

      const payload =
        idType === "gstin"
          ? { gstNo: identifier, password }
          : { trigram: identifier, password };

      const res = await axios.post(endpoint, payload);

      if (idType === "gstin") {
        localStorage.setItem(`${company}_token`, res.data.token);
        navigate(`/${company}/home`);
      } else {
        navigate(`/${company}/sales_customer?trigram=${identifier}`);
      }
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <Card className="p-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`inline-flex p-4 rounded-full mb-4 bg-${companyMap[company as keyof typeof companyMap].color}-100 text-${companyMap[company as keyof typeof companyMap].color}-600`}
            >
              <img
                src={`/${companyMap[company as keyof typeof companyMap].image}`}
                alt="Company Logo"
                height={60}
                width={200}
              />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              Sign in to {companyMap[company as keyof typeof companyMap].name}
            </motion.h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="identifier">GST NUMBER</Label>
                <Input
                  id="identifier"
                  type="text"
                  className="mt-1"
                  required
                  value={identifier}
                  onChange={handleIdentifierChange}
                  // placeholder="Enter GSTIN or 3-character Trigram"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="mt-1"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  // placeholder="Enter your password"
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                className={`w-full bg-${companyMap[company as keyof typeof companyMap].color}-600 hover:bg-${companyMap[company as keyof typeof companyMap].color}-700 text-white`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href={`/${company}/register`}
                className={`font-medium text-${companyMap[company as keyof typeof companyMap].color}-600 hover:text-${companyMap[company as keyof typeof companyMap].color}-500`}
              >
                Create Accounts
              </a>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
