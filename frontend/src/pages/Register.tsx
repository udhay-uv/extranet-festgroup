import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { companyMap } from "@/lib/config";
import useFavicon from "@/lib/faviconhook";


export function Register() {
  const [gstNo, setGstNo] = useState("");
  const [gstValid, setGstValid] = useState(false); 
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gstError, setGstError] = useState(""); 
  const [email, setEmail] = useState("");
  const [contactno, setContactno] = useState("");
  const [trigram,setTrigram] = useState("");
  const [,setTrigramValid] = useState(false);
  const [trigramError,setTrigramError] = useState("");
  const [,setEmailValid] = useState(false);
  const [emailError,setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const {company} = useParams();

  const navigate = useNavigate();

  useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

  const handleGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGstNo(value);

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    
    if (!gstRegex.test(value)) {
      setGstValid(false);
      setGstError("Invalid GST Number format"); 
    } else {
      setGstValid(true);
      setGstError(""); 
    }
  };

  const handleTrigramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTrigram(value);

    const trigramRegex = /^[A-Z]{3}$/;
    if (!trigramRegex.test(value)) {
      setTrigramValid(false);
      setTrigramError("Invalid Trigram format");
    } else {
      setTrigramValid(true);
      setTrigramError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailValid(false);
      setEmailError("Invalid Email format");
    } else {
      setEmailValid(true);
      setEmailError("");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!gstValid) return; 

    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/register?company=${company}`, {
        gstNo,
        name,
        password,
        email,
        contactno,
        trigram
      });
      localStorage.setItem(`${company}_token`, res.data.token);
      setLoading(false);
      navigate(`/${company}/login`);
    } catch (err) {
      setLoading(false);
      alert("Error registering. Please try again.");
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
              className={`inline-flex p-4  rounded-full mb-4 bg-${companyMap[company as keyof typeof companyMap].color}-100 text-${companyMap[company as keyof typeof companyMap].color}-600`}
            >
              <img src={`/${companyMap[company as keyof typeof companyMap].image}`} alt="festa" height={20} width={200} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              Register with {companyMap[company as keyof typeof companyMap].name}
            </motion.h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="gstNo">GST Number</Label>
                <Input
                  id="gstNo"
                  type="text"
                  pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                  className="mt-1"
                  required
                  value={gstNo}
                  onChange={handleGstChange}
                  onBlur={(e) => e.target.reportValidity()} 
                />
                {gstError && <p className="text-red-500 text-sm">{gstError}</p>}
              </div>

              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="mt-1"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!gstValid} 
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
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!gstValid} 
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  disabled={!gstValid}
                  onBlur={(e) => e.target.reportValidity()}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div>
                <Label htmlFor="contactno">Contact Number</Label>
                <Input
                  id="contactno"
                  type="tel"
                  className="mt-1"  
                  required
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                  disabled={!gstValid}
                />
              </div>
              <div>
                <Label htmlFor="trigram">Trigram</Label>
                <Input
                  id="trigram"
                  type="text"
                  className="mt-1"
                  pattern="^[A-Z]{3}$"
                  required
                  value={trigram}
                  onChange={handleTrigramChange}
                  disabled={!gstValid}
                  onBlur={(e) => e.target.reportValidity()}
                />
                {trigramError && <p className="text-red-500 text-sm">{trigramError}</p>}
              </div>
              
            </motion.div>

       
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                className={`w-full bg-${companyMap[company as keyof typeof companyMap].color}-600 hover:bg-${companyMap[company as keyof typeof companyMap].color}-700`}
                disabled={!gstValid || loading} 
              >
                {loading ? "Registering..." : "Register"}
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
              Already have an account?{" "}
              <Link to={`/${company}/login`} className={`font-medium text-${companyMap[company as keyof typeof companyMap].color}-600`}>
                Sign in
              </Link>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
