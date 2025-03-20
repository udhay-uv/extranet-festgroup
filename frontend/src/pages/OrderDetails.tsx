import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Package, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Building, 
  Truck,
  CheckCircle,
  Clock,
  Upload,
  FileText,
  AlertCircle,
  ListFilter,
  Box,
  IndianRupee
} from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { Spinner } from '@/components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { companyMap } from '@/lib/config';
import useFavicon from '@/lib/faviconhook';
// Match the data structure from the backend
type OrderDetail = {
  id: number;
  orderId: string;
  modelNumber: string;
  quantity: number;
  unitPrice: string;
  netPrice: string;
  cgst: string;
  sgst: string;
  totalAmount: string;
};

type Address = {
  id: number;
  gstin: string;
  bs: string;
  type: string;
  address: string;
  phone: string;
  contactName: string;
};

type OrderData = {
  id: number;
  orderNo: string;
  gstin: string;
  billingAddressId: number;
  shippingAddressId: number;
  timeStamp: string;
  orderDate: string;
  totalPrice: string;
  status: number;
  paymentFile: string | null;
  vehicleRegNo: string | null;
  orderDetails: OrderDetail[];
  billingAddress: Address;
  shippingAddress: Address;
};

type TabType = 'all' | 'pending' | 'completed';

const statusMap = {
  0: { label: 'POC-PO Created', description: 'Waiting for payment', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  2: { label: 'PPU -Proof Payment Uploaded', description: 'Upload payment proof', color: 'bg-blue-100 text-blue-800', icon: Upload },
  4: { label: 'PV - Payment Verified', description: 'Invoice generated', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  6: { label: 'VRU - Vehicle Registration Upload', description: 'Upload transport details', color: 'bg-purple-100 text-purple-800', icon: Truck },
  8: { label: 'ORS-Order Ready for Shipping', description: 'Processing in warehouse', color: 'bg-indigo-100 text-indigo-800', icon: Package },
  10: { label: 'OS - Order Shipped', description: 'Order on the way', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle }
};

export const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setVehicleRegNo] = useState<string>("");
  const navigate = useNavigate();
  const {company} = useParams();

  async function getOrders() {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/order/list?company=${company}`, {
        token: localStorage.getItem(`${company}_token`),
        company: company?.toUpperCase()
      });
      if(res.data.msg==='Unauthorized'){
        localStorage.removeItem(`${company}_token`);
        navigate(`/${company}/login`);
      }
      setOrders(res.data.orders);
      setLoading(false);
      console.log(res.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  }
  useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

  useEffect(() => {
    getOrders();
  }, []);

  const getFilteredOrders = useMemo(() => {
    if (loading) {      
      return [];
    }
    switch (activeTab) {
      case 'pending':
        return orders.filter(order => order.status < 10);
      case 'completed':
        return orders.filter(order => order.status === 10);
      default:
        return orders;
    }
  }, [activeTab, orders, loading]);

  const handleFileUpload = async (orderId: string) => {
    if (!fileUpload) {
      alert('Please select a file first');
      return;
    }
    const res = await axios.post(`${BACKEND_URL}/api/order/uploadpaymentproof?company=${company}`, {
      token: localStorage.getItem(`${company}_token`),
      orderId: orderId,
      paymentFile: fileUpload,
      company: company?.toUpperCase()
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if(res.data.msg==='Unauthorized'){
      localStorage.removeItem(`${company}_token`);
      navigate(`/${company}/login`);
    }
    setFileUpload(null);
    alert('File uploaded successfully');
  };

  const handleStatusUpdate = (orderId: string, newStatus: number) => {
    // Simulate status update
    console.log(orderId, newStatus);
    alert('Order status updated successfully');
  };

  const getStatusProgress = (status: number) => {
    const totalSteps = 10;
    return (status / totalSteps) * 100;
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto mt-8 p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-2xl font-semibold text-${companyMap[company as keyof typeof companyMap].color}-600`}>Your Orders</h2>
                <p className="text-gray-600 mt-2">Track and manage your orders</p>
              </div>
              <div className="flex items-center gap-2">
                <ListFilter className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                <span className="text-gray-600">Filter by status</span>
              </div>
            </div>

            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'all'
                    ? `bg-white text-${companyMap[company as keyof typeof companyMap].color}-600 shadow`
                    : `text-gray-600 hover:text-${companyMap[company as keyof typeof companyMap].color}-600`
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'pending'
                    ? `bg-white text-${companyMap[company as keyof typeof companyMap].color}-600 shadow`
                    : `text-gray-600 hover:text-${companyMap[company as keyof typeof companyMap].color}-600`
                }`}
              >
                Pending Orders
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'completed'
                    ? `bg-white text-${companyMap[company as keyof typeof companyMap].color}-600 shadow`
                    : `text-gray-600 hover:text-${companyMap[company as keyof typeof companyMap].color}-600`
                }`}
              >
                Completed Orders
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {getFilteredOrders.map((order, index) => (
                <motion.div
                  key={order.orderNo}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.orderNo ? null : order.orderNo)}
                    className={`w-full bg-white border border-${companyMap[company as keyof typeof companyMap].color}-200 rounded-lg p-4 hover:bg-${companyMap[company as keyof typeof companyMap].color}-50 transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Package className={`w-6 h-6 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">{order.orderNo}</h3>
                          <p className="text-sm text-gray-500">
                            {format(new Date(order.orderDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${statusMap[order.status as keyof typeof statusMap].color}`}>
                          {React.createElement(statusMap[order.status as keyof typeof statusMap].icon, { className: 'w-4 h-4' })}
                          {statusMap[order.status as keyof typeof statusMap].label}
                        </span>
                        <span className="font-medium text-gray-900">₹{order.totalPrice}</span>
                        {selectedOrder === order.orderNo ? (
                          <ChevronUp className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getStatusProgress(order.status)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${companyMap[company as keyof typeof companyMap].color}-600`}
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {selectedOrder === order.orderNo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 bg-blue-50 rounded-lg p-6 border border-blue-100">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <MapPin className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600 mt-1`} />
                                <div>
                                  <p className="font-medium text-gray-700">Shipping Address</p>
                                  <p className="text-gray-600">{order.shippingAddress.address}</p>
                                  <p className="text-gray-600">{order.shippingAddress.contactName} • {order.shippingAddress.phone}</p>
                                  <p className="text-gray-600 text-sm">{order.shippingAddress.type}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <Building className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600 mt-1`} />
                                <div>
                                  <p className="font-medium text-gray-700">GSTIN</p>
                                  <p className="text-gray-600">{order.gstin}</p>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 border border-blue-100">
                                <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                                  <Box className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600`} />
                                  Order Details
                                </h4>
                                <div className="space-y-3">
                                  {order.orderDetails.map((product) => (
                                    <div key={product.id} className="p-3 bg-gray-50 rounded-lg">
                                      <div className="space-y-2">
                                        <p className="font-medium text-gray-800">{product.modelNumber}</p>
                                        <div className="space-y-1 text-sm text-gray-600">
                                          <p>Unit Price: ₹{product.unitPrice}</p>
                                          <p>Quantity: {product.quantity}</p>
                                          <p>CGST: {product.cgst}%</p>
                                          <p>SGST: {product.sgst}%</p>
                                          <p className="text-blue-600 font-medium">Total: ₹{product.totalAmount}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                                  <span className="font-medium text-gray-700">Total Amount</span>
                                  <span className="font-bold text-blue-600 flex items-center gap-1">
                                    <IndianRupee className="w-4 h-4" />
                                    {order.totalPrice}
                                  </span>
                                </div>
                              </div>

                              {order.vehicleRegNo && order.vehicleRegNo !== "null" && (
                                <div className="flex items-start gap-3">
                                  <Truck className={`w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600 mt-1`} />
                                  <div>
                                    <p className="font-medium text-gray-700">Vehicle Registration</p>
                                    <p className="text-gray-600">{order.vehicleRegNo}</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              {order.status === 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">Payment Required</span>
                                  </div>
                                  <p className="text-sm text-yellow-700 mb-4">
                                    Please upload your payment proof to proceed with the order.
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="file"
                                      onChange={(e) => setFileUpload(e.target.files?.[0] || null)}
                                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <button
                                      onClick={() => handleFileUpload(order.orderNo)}
                                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                    >
                                      Upload Payment Proof
                                    </button>
                                  </div>
                                </div>
                              )}

                              {order.status === 2 && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                                    <FileText className="w-5 h-5" />
                                    <span className="font-medium">Payment Proof Uploaded</span>
                                  </div>
                                  <p className="text-sm text-blue-700">
                                    Awaiting verification from sales team.
                                  </p>
                                </div>
                              )}

                              {order.status === 4 && (
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-purple-800 mb-2">
                                    <Truck className="w-5 h-5" />
                                    <span className="font-medium">Vehicle Details Required</span>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Enter vehicle registration number"
                                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setVehicleRegNo(e.target.value)}
                                  />
                                  <button
                                    onClick={() => handleStatusUpdate(order.orderNo, 6)}
                                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                  >
                                    Submit Vehicle Details
                                  </button>
                                </div>
                              )}

                              {order.status === 6 && (
                                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-indigo-800">
                                    <Package className="w-5 h-5" />
                                    <span className="font-medium">Processing in Warehouse</span>
                                  </div>
                                  <p className="text-sm text-indigo-700">
                                    Your order is being prepared for shipping.
                                  </p>
                                </div>
                              )}

                              {order.status === 8 && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-green-800">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Order Ready for Shipping</span>
                                  </div>
                                  <p className="text-sm text-green-700">
                                    Your order is packed and ready for shipment.
                                  </p>
                                </div>
                              )}

                              {order.status === 10 && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-gray-800">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Order Shipped</span>
                                  </div>
                                  <p className="text-sm text-gray-700">
                                    The order has been dispatched to the customer.
                                  </p>
                                </div>
                              )}

                              {order.paymentFile && order.paymentFile !== "null" && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <div className="flex items-center gap-2 text-green-800">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Payment Proof Uploaded</span>
                                  </div>
                                  <p className="text-sm text-green-700 mt-2">
                                    File: {order.paymentFile}
                                  </p>
                                </div>
                              )}

                              <div className="bg-white rounded-lg p-4 border border-blue-100">
                                <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                                  <Building className="w-5 h-5 text-blue-600" />
                                  Billing Address
                                </h4>
                                <div className="space-y-2 text-gray-600">
                                  <p>{order.billingAddress.address}</p>
                                  <p>{order.billingAddress.contactName} • {order.billingAddress.phone}</p>
                                  <p className="text-sm">{order.billingAddress.type}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default OrdersPage;