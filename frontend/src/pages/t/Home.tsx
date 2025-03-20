import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Truck,  ChevronDown, Building, ChevronUp, MapPin, User, Phone, Plus, Edit, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { T_Navbar } from '@/components/T_Navbar';
import { BACKEND_URL } from '@/lib/config';
import axios from 'axios';

type UserInfo = {
  gstin: string;
  name: string;
  company: string;
  sales: string;
}

type Address = {
  gstin: string;
  type: string;
  billingAddress: string;
  shippingAddress: string;
  phone: string;
  contactName: string;
}

interface StatusMessage {
  type: 'success' | 'error';
  message: string;
}


const StatusDialog = ({ status, onClose }: { status: StatusMessage; onClose: () => void }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className={`${status.type === 'success' ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200' : 'bg-gradient-to-br from-red-50 to-white border-red-200'} shadow-xl`}>
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
        <h2 className={`text-2xl font-bold mb-2 ${status.type === 'success' ? 'text-blue-700' : 'text-red-700'}`}>
          {status.type === 'success' ? 'Success!' : 'Error'}
        </h2>
        <p className={`text-lg ${status.type === 'success' ? 'text-blue-600' : 'text-red-600'}`}>
          {status.message}
        </p>
        <Button
          onClick={onClose}
          className={`mt-6 ${status.type === 'success' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
        >
          Close
        </Button>
      </motion.div>
    </DialogContent>
  </Dialog>
);

const AddressForm = ({ 
  onSubmit, 
  initialData = {
    type: "",
    billingAddress: "",
    shippingAddress: "",
    phone: "",
    contactName: ""
  },
  mode = 'create',
  buttonLoading = false,
  onClose
}: { 
  onSubmit: (data: Address) => void;
  initialData?: any;
  mode?: 'create' | 'update';
  onClose: () => void;
  buttonLoading: boolean;
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
     onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="grid gap-2">
        <Label htmlFor="billingAddress" className="text-blue-700">Billing Address</Label>
        <Input
          id="billingAddress"
          value={formData.billingAddress}
          onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
          placeholder="Enter billing address"
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="shippingAddress" className="text-blue-700">Shipping Address</Label>
        <Input
          id="shippingAddress"
          value={formData.shippingAddress}
          onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
          placeholder="Enter shipping address"
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contactName" className="text-blue-700">Contact Name</Label>
        <Input
          id="contactName"
          value={formData.contactName}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          placeholder="Enter contact name"
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
          placeholder="Enter phone number"
          className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          required
        />
      </div>

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
          {buttonLoading ? "Adding..." : mode === 'create' ? 'Add Address' : 'Update Address'}
        </Button>
      </div>
    </form>
  );
};

export const FestonHome = () => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>();
  const [address, setAddress] = useState<Address[]>();
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  async function getUserInfo(){

    const res = await axios.post(`${BACKEND_URL}/api/t/userinfo`,{
        company:'T',
        token:localStorage.getItem("t_token") || "",
        
    })
    console.log(res.data);
    setUserInfo(res.data.user);
    setAddress(res.data.address);
    setLoading(false);
  }
  useEffect(()=>{
    try{
      getUserInfo();
    }catch(err){
      alert("Error fetching user info");
    }
    
   
  },[])

  if(loading)
  {
    return <div className='flex justify-center items-center h-screen text-2xl font-bold'>Loading...</div>;
  }

  const handleAddAddress = async (newAddress: Address) => {
    try {
      setButtonLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/t/addaddress`,{
        ...newAddress,
        token:localStorage.getItem("t_token") || "",
        company:"T",
      });
      console.log(res.data);
      setAddress([...(address || []), newAddress]);
      setStatusMessage({
        type: 'success',
        message: 'Address added successfully!'
      });
      setIsDialogOpen(false);
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
      setStatusMessage({
        type: 'error',
        message: 'Failed to add address. Please try again.'
      });
    }
  };

  const handleUpdateAddress = async (updatedAddress: Address) => {
    try {
      setButtonLoading(true);

      const res = await axios.post(`${BACKEND_URL}/api/t/updateaddress`,{
        ...updatedAddress,
        token:localStorage.getItem("t_token") || "",
        company:"T",
      });
      console.log(res.data);
      setAddress((address || []).map(addr => 
        addr.gstin === updatedAddress.gstin && addr.type === updatedAddress.type
          ? updatedAddress
          : addr
      ));
      setStatusMessage({
        type: 'success',
        message: 'Address updated successfully!'
      });
      setIsDialogOpen(false);
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
      setStatusMessage({
        type: 'error',
        message: 'Failed to update address. Please try again.'
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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

      <T_Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-5xl mx-auto mt-8 p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-semibold text-blue-600">User Information</h2>
            <div className="mt-4 space-y-2 text-gray-600">
              <p><span className="font-medium">User Name: </span>{userInfo?.[0]?.name || "User"}</p>
              {/* <p><span className="font-medium">Company Name: </span>{userInfo?.[0]?.company}</p> */}
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 100 }}
            animate={{ x: 0 }}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Company Details</h3>
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-blue-600">GST No.</th>
                  <th className="px-4 py-2 text-left text-blue-600">Name</th>
                  {/* <th className="px-4 py-2 text-left text-blue-600">Company</th> */}
                  <th className="px-4 py-2 text-left text-blue-600">Sales Person</th>
                </tr>
              </thead>
              <tbody>
                {userInfo?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-4 py-2 text-gray-600">{item.gstin}</td>
                    <td className="px-4 py-2 text-gray-600">{item.name}</td>
                    {/* <td className="px-4 py-2 text-gray-600">{item.company}</td> */}
                    <td className="px-4 py-2 text-gray-600">{item.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-600">Address Types</h3>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-700">Add New Address</DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    onSubmit={handleAddAddress}
                    mode="create"
                    onClose={() => setIsDialogOpen(false)}
                    buttonLoading={buttonLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {address?.map((type, index) => (
                <motion.div
                  key={type.type}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => setSelectedType(selectedType === type.type ? null : type.type)}
                    className="w-full bg-white border border-blue-200 rounded-lg p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {type.type === 'Home' ? (
                        <Home className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Building className="w-5 h-5 text-blue-600" />
                      )}
                      <span className="font-medium text-gray-800">{type.type}</span>
                    </div>
                    {selectedType === type.type ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </button>

                  <AnimatePresence>
                    {selectedType === type.type && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {address
                          .filter(addr => addr.type === type.type)
                          .map((address, addressIndex) => (
                            <motion.div
                              key={addressIndex}
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="mt-4 bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-100 shadow-md"
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                                    <div>
                                      <p className="font-medium text-gray-700">Billing Address</p>
                                      <p className="text-gray-600">{address.billingAddress}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <Truck className="w-5 h-5 text-blue-600 mt-1" />
                                    <div>
                                      <p className="font-medium text-gray-700">Shipping Address</p>
                                      <p className="text-gray-600">{address.shippingAddress}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <p className="text-gray-600">{address.contactName}</p>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    <p className="text-gray-600">{address.phone}</p>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <Building className="w-5 h-5 text-blue-600" />
                                    <p className="text-gray-600">GSTIN: {address.gstin}</p>
                                  </div>
                                </div>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="border-blue-200 hover:bg-blue-50"
                                    >
                                      <Edit className="w-4 h-4 text-blue-600" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                                    <DialogHeader>
                                      <DialogTitle className="text-2xl font-bold text-blue-700">Update Address</DialogTitle>
                                    </DialogHeader>
                                    <AddressForm 
                                      onSubmit={handleUpdateAddress}
                                      initialData={address}
                                      mode="update"
                                      onClose={() => setIsDialogOpen(false)}
                                      buttonLoading={buttonLoading}
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </motion.div>
                          ))}
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

export default FestonHome