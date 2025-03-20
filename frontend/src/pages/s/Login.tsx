import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export function SemiconLogin() {
  const [gstNo, setGstNo] = useState("");
  const [gstValid, setGstValid] = useState(false); 
  const [gstError, setGstError] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault(); 
    if (!gstValid) return;

    try {
      console.log(gstNo, password);
      const res = await axios.post(`${BACKEND_URL}/api/s/login`, {
        gstNo,
        password,
      });
      console.log(res.data);
      localStorage.setItem("s_token", res.data.token);
      setLoading(false);
      navigate("/s/home");
    } catch {
      setLoading(false);
      alert("Error logging in. Please check your credentials.");
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
              className="inline-flex p-4 rounded-full mb-4 bg-green-100 text-green-600"
            >
               <img src="/S.png" alt="festa" height={60} width={200} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              Sign in to Semicon
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!gstValid || loading} 
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
              <Link to="/s/register" className="font-medium text-green-600">
                Create Account
              </Link>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
