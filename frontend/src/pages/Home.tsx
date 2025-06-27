
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, Truck, ChevronDown, Building, ChevronUp,
  User, Phone, Plus, Edit, CheckCircle, XCircle, MapPin
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from '@/components/Navbar';
import { BACKEND_URL } from '@/lib/config';
import axios from 'axios';
import { Spinner } from '@/components/Spinner';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useNavigate, useParams } from 'react-router-dom';
import { companyMap } from '@/lib/config';
import useFavicon from '@/lib/faviconhook';


type UserInfo = {
  id: number;
  gstin: string;
  name: string;
  sales: string;
  email: string;
  contactno: string;
  company: string;
};

type Address = {
  id: number;
  gstin: string;
  bs: string;
  type: string;
  address1: string;
  address2: string;
  city: string;
  pincode: string;
  stateCode: string;
  email?: string;
  phone: string;
  contactName: string;
};

interface StatusMessage {
  type: 'success' | 'error';
  message: string;
}

const StateCodes = ["AP", "TN", "KA", "MH", "DL", "GJ", "RJ", "WB", "UP", "PB", "HR"];

// 🍎 Status dialog (Success / Error)
const StatusDialog = ({ status, onClose }: { status: StatusMessage; onClose: () => void }) => (
  <Dialog open onOpenChange={onClose}>
    <DialogContent
      className={`shadow-xl ${
        status.type === 'success'
          ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
          : 'bg-gradient-to-br from-red-50 to-white border-red-200'
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="flex flex-col items-center justify-center p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-16 h-16 text-blue-600 mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-600 mb-4" />
          )}
        </motion.div>
        <h2 className={`text-2xl font-bold mb-2 ${
          status.type === 'success' ? 'text-blue-700' : 'text-red-700'
        }`}>
          {status.type === 'success' ? 'Success!' : 'Error'}
        </h2>
        <p className={`text-lg ${
          status.type === 'success' ? 'text-blue-600' : 'text-red-600'
        }`}>
          {status.message}
        </p>
        <Button
          onClick={onClose}
          className={`mt-6 ${
            status.type === 'success'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          Close
        </Button>
      </motion.div>
    </DialogContent>
  </Dialog>
);

// 🍎 Address form with all updated fields
const AddressForm = ({
  onSubmit,
  initialData = {
    bs: "",
    type: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    stateCode: "",
    email: "",
    phone: "",
    contactName: ""
  },
  mode = 'create',
  buttonLoading = false,
  onClose
}: {
  onSubmit: (data: Address) => void;
  initialData?: Address;
  mode?: 'create' | 'update';
  buttonLoading: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Billing / Shipping */}
      <div className="grid gap-2">
        <Label htmlFor="bs" className="text-blue-700">
         Type of Addresses
        </Label>
        <Select
          value={formData.bs}
          onValueChange={(value) => setFormData({ ...formData, bs: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
              <SelectContent>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Shipping">Shipping</SelectItem>
                <SelectItem value="BILLING = SHIPPING">BILLING = SHIPPING</SelectItem>
              </SelectContent>

        </Select>
      </div>

      {/* Type */}
      <div className="grid gap-2">
        <Label htmlFor="type" className="text-blue-700">Type</Label>
        <Input
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          placeholder="Home, Work, etc."
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          required
        />
      </div>

      {/* Address 1 + 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address1" className="text-blue-700">Address Line 1</Label>
          <Input
            id="address1"
            value={formData.address1}
            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
            placeholder="Street / Building No."
            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <Label htmlFor="address2" className="text-blue-700">Address Line 2</Label>
          <Input
            id="address2"
            value={formData.address2}
            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
            placeholder="Area / Landmark"
            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* City, Pincode, State */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city" className="text-blue-700">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <Label htmlFor="pincode" className="text-blue-700">Pincode</Label>
          <Input
            id="pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            placeholder="Pin code"
            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <Label htmlFor="stateCode" className="text-blue-700">State Code</Label>
          <Select
            value={formData.stateCode}
            onValueChange={(value) => setFormData({ ...formData, stateCode: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {StateCodes.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Optional Email */}
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-blue-700">
          Email <span className="text-gray-400">(Optional)</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
        />
      </div>

      {/* Contact Details */}
      <div className="grid gap-2">
        <Label htmlFor="contactName" className="text-blue-700">Contact Name</Label>
        <Input
          id="contactName"
          value={formData.contactName}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          placeholder="Contact person's name"
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone" className="text-blue-700">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone number"
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={buttonLoading}
        >
          {buttonLoading
            ? mode === 'create' 
              ? "Adding..." 
              : "Updating..."
            : mode === 'create'
              ? 'Add Address'
              : 'Update Address'
          }
        </Button>

      </div>
    </form>
  );
};

// 🍎 Main HomePage component
export const HomePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Billing' | 'Shipping'>('Billing');
  const navigate = useNavigate();
  const { company } = useParams<{ company: string }>();


  useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

  async function fetchUserInfo() {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/info?company=${company}`, {
        token: localStorage.getItem(`${company}_token`) || ""
      });
      if (res.data.msg === 'Unauthorized') {
        localStorage.removeItem(`${company}_token`);
        navigate(`/${company}/login`);
        return;
      }
      setUserInfo({ ...res.data.user, company: company! });
      setAddressList(res.data.address || []);
    } catch (e) {
      console.error(e);
      // handle error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const filteredAddress = useMemo(
    () => addressList.filter(a => a.bs === activeTab),
    [addressList, activeTab]
  );

  // const handleAddAddress = async (newAddress: Address) => {
  //   setButtonLoading(true);
  //   try {
  //     const res = await axios.post(`${BACKEND_URL}/api/user/addaddress?company=${company}`, {
  //       ...newAddress,
  //       token: localStorage.getItem(`${company}_token`) || "",
  //       company
  //     });
  //     setAddressList([...addressList, res.data.address]);
  //     setStatusMessage({ type: 'success', message: 'Address added successfully!' });
  //   } catch {
  //     setStatusMessage({ type: 'error', message: 'Failed to add address. Try again.' });
  //   } finally {
  //     setButtonLoading(false);
  //     setIsDialogOpen(false);
  //   }
  // };

      const handleAddAddress = async (formData: Address) => {
  setButtonLoading(true);
  try {
    const token = localStorage.getItem(`${company}_token`) || "";

    const payload = {
      ...formData,
      token,
      company,
    };

    // ✅ STEP 2A: Log the payload you’re sending
    console.log("👉 Sending payload to backend:", payload);

    const res = await axios.post(`${BACKEND_URL}/api/user/addaddress?company=${company}`, payload);

    // ✅ STEP 2B: Log the response from backend
    console.log("✅ Address added successfully:", res.data);

    setAddressList(prev => [...prev, res.data.address]);
    setStatusMessage({ type: "success", message: "Address added successfully!" });
  } catch (error: any) {
    // ✅ STEP 2C: Log error details
    console.error("❌ Backend Error:", error.response?.data || error.message);
    setStatusMessage({ type: "error", message: "Failed to add address. Try again." });
  } finally {
    setButtonLoading(false);
    setIsDialogOpen(false);
  }
};

  const handleUpdateAddress = async (updatedAddress: Address) => {
    setButtonLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/user/updateaddress?company=${company}`, {
        ...updatedAddress,
        token: localStorage.getItem(`${company}_token`) || "",
        company
      });
      setAddressList(prev =>
        prev.map(a => (a.id === updatedAddress.id ? updatedAddress : a))
      );
      setStatusMessage({ type: 'success', message: 'Address updated successfully!' });
    } catch {
      setStatusMessage({ type: 'error', message: 'Failed to update address. Try again.' });
    } finally {
      setButtonLoading(false);
      setIsDialogOpen(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {statusMessage && (
          <StatusDialog
            status={statusMessage}
            onClose={() => setStatusMessage(null)}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-5xl mx-auto mt-8 p-6"
      >
        <div className={`bg-white rounded-lg shadow-lg p-6 border border-${companyMap[company as keyof typeof companyMap].color}-100`}>
          
          {/* User Info */}
          <motion.div initial={{ x: -100 }} animate={{ x: 0 }} className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-600">User Information</h2>
            <div className="mt-4 text-gray-600 space-y-1">
              <p><span className="font-medium">Name: </span>{userInfo?.name}</p>
              <p><span className="font-medium">Email: </span>{userInfo?.email}</p>
              <p><span className="font-medium">Contact: </span>{userInfo?.contactno}</p>
            </div>
          </motion.div>

          {/* Company Details */}
          <motion.div initial={{ x: 100 }} animate={{ x: 0 }}>
            <h3 className={`text-xl font-semibold text-${companyMap[company as keyof typeof companyMap].color}-600 mb-4`}>
              Company Details
            </h3>
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className={`px-4 py-2 text-left text-${companyMap[company as keyof typeof companyMap].color}-600`}>
                    GST No.
                  </th>
                  <th className={`px-4 py-2 text-left text-${companyMap[company as keyof typeof companyMap].color}-600`}>
                    Name
                  </th>
                  <th className={`px-4 py-2 text-left text-${companyMap[company as keyof typeof companyMap].color}-600`}>
                    Sales Person
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-2 text-gray-600">{userInfo?.gstin}</td>
                  <td className="px-4 py-2 text-gray-600">{userInfo?.name}</td>
                  <td className="px-4 py-2 text-gray-600">{userInfo?.sales}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Address Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-semibold text-${companyMap[company as keyof typeof companyMap].color}-600`}>
                Address Types
              </h3>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className={`bg-${companyMap[company as keyof typeof companyMap].color}-600 hover:bg-${companyMap[company as keyof typeof companyMap].color}-700`}>
                    <Plus className="w-4 h-4 mr-2"/> Add New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className={`bg-gradient-to-br from-${companyMap[company as keyof typeof companyMap].color}-50 to-white border-${companyMap[company as keyof typeof companyMap].color}-200`}>
                  <DialogHeader>
                    <DialogTitle className={`text-2xl font-bold text-${companyMap[company as keyof typeof companyMap].color}-700`}>
                      Add New Address
                    </DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    onSubmit={handleAddAddress}
                    mode="create"
                    buttonLoading={buttonLoading}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Tabs */}
            <div className="flex mb-6 space-x-2">
              <Button
                variant="outline"
                className={`flex-1 ${
                  activeTab === 'Billing'
                    ? `bg-${companyMap[company as keyof typeof companyMap].color}-600 text-white`
                    : `bg-white text-${companyMap[company as keyof typeof companyMap].color}-600`
                }`}
                onClick={() => setActiveTab('Billing')}
              >
                Billing Address
              </Button>
              <Button
                variant="outline"
                className={`flex-1 ${
                  activeTab === 'Shipping'
                    ? `bg-${companyMap[company as keyof typeof companyMap].color}-600 text-white`
                    : `bg-white text-${companyMap[company as keyof typeof companyMap].color}-600`
                }`}
                onClick={() => setActiveTab('Shipping')}
              >
                Shipping Address
              </Button>
            </div>

            {/* List of Addresses */}
            <div className="space-y-4">
              {filteredAddress.map((addr, idx) => (
                <motion.div
                  key={addr.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <button
                    className={`w-full text-left bg-white border border-${companyMap[company as keyof typeof companyMap].color}-200 rounded-lg p-4 flex items-center justify-between hover:bg-${companyMap[company as keyof typeof companyMap].color}-50 transition-colors`}
                    onClick={() => setSelectedType(selectedType === addr.type ? null : addr.type)}
                  >
                    <div className="flex items-center gap-3">
                      {addr.type === 'Home' ? (
                        <Home className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                      ) : (
                        <Building className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                      )}
                      <span className="font-medium text-gray-800">{addr.type}</span>
                    </div>
                    {selectedType === addr.type ? (
                      <ChevronUp className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                    )}
                  </button>

                  <AnimatePresence>
                    {selectedType === addr.type && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className={`mt-4 bg-gradient-to-br from-${companyMap[company as keyof typeof companyMap].color}-50 to-white rounded-lg p-6 border border-${companyMap[company as keyof typeof companyMap].color}-100 shadow-md`}
                        >
                          {/* Address Lines */}
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <MapPin className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                              <div>
                                <p className="font-medium text-gray-700">Type</p>
                                <p className="text-gray-600">{addr.bs}</p>
            
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Truck className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                              <div>
                                <p className="font-medium text-gray-700">Address</p>
                                <p className="text-gray-600">
                                  {addr.address1}, {addr.address2}
                                </p>
                                <p className="text-gray-600">
                                  {addr.city} - {addr.pincode}, {addr.stateCode}
                                </p>
                              </div>
                            </div>
                            {addr.email && (
                              <div className="flex items-center gap-3">
                                <User className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                                <p className="text-gray-600">{addr.email}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <User className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                              <p className="text-gray-600">{addr.contactName}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                              <p className="text-gray-600">{addr.phone}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Building className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                              <p className="text-gray-600">GSTIN: {addr.gstin}</p>
                            </div>
                          </div>

                          {/* Edit Button */}
                          <div className="mt-4 text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className={`border-${companyMap[company as keyof typeof companyMap].color}-200 hover:bg-${companyMap[company as keyof typeof companyMap].color}-50`}
                                >
                                  <Edit className={`w-4 h-4 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className={`bg-gradient-to-br from-${companyMap[company as keyof typeof companyMap].color}-50 to-white border-${companyMap[company as keyof typeof companyMap].color}-200`}>
                                <DialogHeader>
                                  <DialogTitle className={`text-2xl font-bold text-${companyMap[company as keyof typeof companyMap].color}-700`}>
                                    Update Address
                                  </DialogTitle>
                                </DialogHeader>
                                <AddressForm
                                  onSubmit={handleUpdateAddress}
                                  initialData={addr}
                                  mode="update"
                                  buttonLoading={buttonLoading}
                                  onClose={() => setIsDialogOpen(false)}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
