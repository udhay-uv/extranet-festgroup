import  { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Building,
  Plus,
  Minus,
  ShoppingCart,
  Home,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { ProductSelectionDialog } from "@/components/ProductSelectionDialog";
import { StatusDialog, StatusMessage } from "@/components/StatusDialog";
import { ConfirmOrderDialog } from "@/components/ConfirmOrderDialog";
import { Navbar } from "@/components/Navbar";
import { BACKEND_URL, companyMap } from "@/lib/config";
import axios from "axios";
import { Spinner } from "@/components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import useFavicon from "@/lib/faviconhook";
type Product = {
  brand: string;
  company: string;
  family ?: string;
  mn: string;
  type: string;
  power: number | string;
  description: string;
  quantity: number;
};

type Address = {
  id: number;
  gstin: string;
  bs: string;
  type: string;
  address: string;
  phone: number;
  contactName: string;
};

type SelectedProduct = {
  product: Product;
  quantity: number;
  unitPrice: number;
  cgst: number;
  sgst: number;
};



export const BookPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<Address | null>(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<Address | null>(null);



  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  
  
  const [products, setProducts] = useState<Product[] | null>(null);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const {company} = useParams();

  const totalAmount = selectedProducts.reduce((total, item) => {
    return total + item.quantity * item.unitPrice;
  }, 0);

  const handleAddProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const existing = prev.find(
        (p) => p.product.mn === product.mn,
      );
      if (existing) {
        return prev.map((p) =>
          p.product.mn === product.mn
            ? { ...p, quantity: p.quantity + 1 }
            : p,
        );
      }
      return [...prev, { product, quantity: 1, unitPrice: 25000, cgst: 6, sgst: 6 }];
    });
    setIsProductDialogOpen(false);
  };

  const handleQuantityChange = (mn: string, change: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) => {
        if (p.product.mn === mn) {
          const newQuantity = Math.max(1, p.quantity + change);
          return { ...p, quantity: newQuantity };
        }
        return p;
      }),
    );
  };

  const handleUnitPriceChange = (mn: string, newPrice: string) => {
    const price = parseFloat(newPrice) || 0;
    setSelectedProducts((prev) =>
      prev.map((p) => {
        if (p.product.mn === mn) {
          return { ...p, unitPrice: price };
        }
        return p;
      }),
    );
  };

  const handleRemoveProduct = (mn: string) => {
    setSelectedProducts((prev) =>
      prev.filter((p) => p.product.mn !== mn),
    );
  };
  const handleCgstChange = (mn: string, newCgst: string) => {
    const cgst = parseFloat(newCgst) || 0;
    setSelectedProducts((prev) =>
      prev.map((p) => {
        if (p.product.mn === mn) {
          return { ...p, cgst: cgst };
        }
        return p;
      }),
    );
  };
  const handleSgstChange = (mn: string, newSgst: string) => {
    const sgst = parseFloat(newSgst) || 0;
    setSelectedProducts((prev) =>
      prev.map((p) => {
        if (p.product.mn === mn) {
          return { ...p, sgst: sgst };
        }
        return p;
      }),
    );
 
  };
  const handlePlaceOrder = async () => {
    
    try {
      // console.log(selectedProducts);
      // console.log(selectedBillingAddress);
      // console.log(selectedShippingAddress);
      const res = await axios.post(`${BACKEND_URL}/api/order/book?company=${company}`, {
        token: localStorage.getItem(`${company}_token`),
        billingAddressId: selectedBillingAddress?.id,
        shippingAddressId: selectedShippingAddress?.id,
        totalPrice: totalAmount,
        products: selectedProducts,
        company: company?.toUpperCase(),
      });
      console.log(res);
      
      if(res.data.msg){
        setStatusMessage({
          type: 'success',
          message: 'Your order has been placed successfully!'
        });
      }
      else{
        setStatusMessage({
          type: 'error',
          message: 'Failed to place order. Please try again.'
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Failed to place order. Please try again.'
      });
    }
    setIsConfirmDialogOpen(false);
    setSelectedProducts([]);
    setSelectedBillingAddress(null);
    setSelectedShippingAddress(null);
    setStatusMessage(null);

  };

  async function fetchDetails() {
    const res1 = await axios.post(`${BACKEND_URL}/api/product/list?company=${company}`, {
      token: localStorage.getItem(`${company}_token`),
      company: company?.toUpperCase(),
    });
    if(res1.data.msg==='Unauthorized'){
      localStorage.removeItem(`${company}_token`);
      navigate(`/${company}/login`);
    }   
    const res2 = await axios.post(`${BACKEND_URL}/api/user/info?company=${company}`, {
      token: localStorage.getItem(`${company}_token`),
      company: company?.toUpperCase(),
    });
    if(res2.data.msg==='Unauthorized'){
      localStorage.removeItem(`${company}_token`);
      navigate(`/${company}/login`);
    }

    setProducts(res1.data.products);
    setAddresses(res2.data.address);
    console.log(res1.data.products);
    console.log(res2.data.address);
    setLoading(false);
  }

  useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

  useEffect(() => {
    try {
      fetchDetails();
    } catch {
      alert("error");
    }
  }, []);

  if(loading)
    {
      return(
        <div className='flex justify-center items-center h-screen'>
       
        <Spinner />
        
        
        </div>
    )
  
    }
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 border border-${companyMap[company as keyof typeof companyMap].color}-100">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-${companyMap[company as keyof typeof companyMap].color}-600 flex items-center gap-2">
              <ShoppingCart className="w-8 h-8" />
              Book Products
            </h2>
            <p className="text-gray-600 mt-2">
              Select products and delivery details
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Selected Products
                </h3>
                <button
                  onClick={() => setIsProductDialogOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2 bg-${companyMap[company as keyof typeof companyMap].color}-600 text-white rounded-lg hover:bg-${companyMap[company as keyof typeof companyMap].color}-700 transition-colors`}
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>

              <div className="space-y-4">
                {selectedProducts.map(({ product, quantity, unitPrice, cgst, sgst }) => (
                  <motion.div
                    key={product.mn}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-${companyMap[company as keyof typeof companyMap].color}-200"
                  >
                    <div className="flex items-center gap-4">
                      <Package className="w-6 h-6 text-${companyMap[company as keyof typeof companyMap].color}-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {product.description}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {product.mn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.mn,
                              -1,
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.mn,
                              1,
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={unitPrice}
                          onChange={(e) =>
                            handleUnitPriceChange(
                              product.mn,
                              e.target.value
                            )
                          }
                          className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-${companyMap[company as keyof typeof companyMap].color}-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">
                          <input 
                          type="number"
                          value={cgst}
                          onChange={(e) =>
                            handleCgstChange(
                              product.mn,
                              e.target.value
                            )
                          }
                          className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-${companyMap[company as keyof typeof companyMap].color}-500"
                          />
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">
                          <input 
                          type="number"
                          value={sgst}
                          onChange={(e) =>
                            handleSgstChange(
                              product.mn,
                              e.target.value
                            )
                          }
                          className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-${companyMap[company as keyof typeof companyMap].color}-500"
                          />
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{(quantity * unitPrice).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveProduct(product.mn)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {selectedProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No products selected. Click "Add Product" to start.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Billing Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses?.map((address) => (
                  address.bs==="Billing" && (
                  <motion.button
                    key={address.id}
                    onClick={() => setSelectedBillingAddress(address)}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      selectedBillingAddress === address
                        ? "border-${companyMap[company as keyof typeof companyMap].color}-500 ring-2 ring-${companyMap[company as keyof typeof companyMap].color}-200"
                        : "border-gray-200 hover:border-${companyMap[company as keyof typeof companyMap].color}-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {address.type === "Home" ? (
                        <Home className="w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600" />
                      )}
                      <span className="font-medium text-gray-900">
                        {address.type}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Billing Address:
                          </p>
                          <p className="text-sm text-gray-900">
                            {address.billingAddress}
                          </p>
                        </div>
                      </div> */}

                      <div className="flex items-start gap-2">
                        <Building className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">
                            Billing Address:
                          </p>
                          <p className="text-sm text-gray-900">
                              {address.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                  )
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses?.map((address) => (
                  address.bs==="Shipping" && (
                    <motion.button key={address.id} onClick={() => setSelectedShippingAddress(address)} className={`text-left p-4 rounded-lg border transition-all ${
                      selectedShippingAddress === address
                        ? "border-${companyMap[company as keyof typeof companyMap].color}-500 ring-2 ring-${companyMap[company as keyof typeof companyMap].color}-200"
                        : "border-gray-200 hover:border-${companyMap[company as keyof typeof companyMap].color}-200"
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {address.type === "Home" ? (
                          <Home className="w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-${companyMap[company as keyof typeof companyMap].color}-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        {address.type}
                      </span>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Shipping Address:
                        </p>
                        <p className="text-sm text-gray-900">
                          {address.address}
                        </p>
                      </div>

                    </motion.button>
                  )
                ))}
              </div>
            </div>
            

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h3>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-${companyMap[company as keyof typeof companyMap].color}-600">
                    ₹{totalAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
              </div>

              <button
                disabled={selectedProducts.length === 0 || !selectedBillingAddress || !selectedShippingAddress}
                onClick={() => setIsConfirmDialogOpen(true)}
                className={`w-full py-3 bg-${companyMap[company as keyof typeof companyMap].color}-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-${companyMap[company as keyof typeof companyMap].color}-700 transition-colors`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <ProductSelectionDialog
        isOpen={isProductDialogOpen}
        onClose={() => setIsProductDialogOpen(false)}
        onSelectProduct={handleAddProduct}
        products={products || []}
      />

      <AnimatePresence>
        {isConfirmDialogOpen && (
          <ConfirmOrderDialog
            isOpen={isConfirmDialogOpen}
            onClose={() => setIsConfirmDialogOpen(false)}
            onConfirm={handlePlaceOrder}
            totalAmount={totalAmount}
            productCount={selectedProducts.length}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {statusMessage && (
          <StatusDialog
            status={statusMessage}
            onClose={() => setStatusMessage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};