import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PiSolarPanelBold } from "react-icons/pi";
import { GiSteelClaws } from "react-icons/gi";
import { 
  Battery, 
  Zap,
  Search,
  SunMedium,
  Package,
  Cable,
  CircuitBoard,
  Palette,
  LayoutList,
  Grid
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { Spinner } from '@/components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { companyMap } from '@/lib/config';
import useFavicon from '@/lib/faviconhook';

type Product = {
  brand: string;
  company: string;
  family?: string;
  mn: string;
  type: string;
  power: number | string;
  description: string;
  quantity: number;
};


type ProductType = 'all' | 'G' | 'H' | 'B' | 'M' | 'P' | 'S';
type ViewMode = 'grid' | 'list';

const productTypeInfo = {
  'all': { label: 'All Products', icon: Package },
  'G': { label: 'On-Grid Inverters', icon: Zap },
  'H': { label: 'Hybrid Inverters', icon: CircuitBoard },
  'B': { label: 'Batteries', icon: Battery },
  'M': { label: 'Accessories', icon: Cable },
  'P': { label: 'Module', icon: PiSolarPanelBold },
  'S': { label: 'Mounting', icon: GiSteelClaws }
};

export const ProductsPage = () => {
  const [activeType, setActiveType] = useState<ProductType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [products,setProducts]=useState<Product[] | null>(null);
  const [loading,setLoading]=useState<boolean>(true);
  const navigate = useNavigate();
  const {company} = useParams();

  const filteredProducts = useMemo(()=>{
      if(!products)
      {
         return null;
      }
      return products.filter(product => {
    const matchesType = activeType === 'all' || product.type === activeType;
    const matchesSearch = product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.mn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });
   

  },[products,activeType,searchQuery]);

  useFavicon(`/${companyMap[company as keyof typeof companyMap].favicon}`);

  async function fetchProducts()
  {
     const res=await axios.post(`${BACKEND_URL}/api/product/list?company=${company}`,{
        company:company?.toUpperCase(),
        token:localStorage.getItem(`${company}_token`)
     });
     if(res.data.msg==='Unauthorized'){
      localStorage.removeItem(`${company}_token`);
      navigate(`/${company}/login`);
     }
     setProducts(res.data.products);
     setLoading(false);
  }

  useEffect(()=>{
     try
     {
        fetchProducts();

     }
     catch
     {
        alert("error");
     }

  },[])
  const getProductIcon = (type: string) => {
    switch (type) {
      case 'G':
        return <Zap className="w-6 h-6" />;
      case 'H':
        return <CircuitBoard className="w-6 h-6" />;
      case 'B':
        return <Battery className="w-6 h-6" />;
      case 'M':
        return <Cable className="w-6 h-6" />;
      case 'P':
        return <Palette className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  
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
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className={`bg-white rounded-xl shadow-lg p-6 border border-${companyMap[company as keyof typeof companyMap].color}-100`}>
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className={`text-2xl font-semibold text-${companyMap[company as keyof typeof companyMap].color}-600 flex items-center gap-2`}>
                  <SunMedium className="w-8 h-8" />
                  Solar Products
                </h2>
                <p className="text-gray-600 mt-2">Browse our range of solar solutions</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-${companyMap[company as keyof typeof companyMap].color}-400 w-5 h-5`} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${companyMap[company as keyof typeof companyMap].color}-500 focus:border-transparent`}
                  />
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow text-${companyMap[company as keyof typeof companyMap].color}-600' : 'text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow text-${companyMap[company as keyof typeof companyMap].color}-600' : 'text-gray-600'}`}
                  >
                    <LayoutList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(Object.keys(productTypeInfo) as ProductType[]).map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeType === type
                      ? `bg-${companyMap[company as keyof typeof companyMap].color}-600 text-white`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {React.createElement(productTypeInfo[type].icon, { className: 'w-5 h-5' })}
                  {productTypeInfo[type].label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType + searchQuery + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={viewMode === 'grid' ? 
                `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` : 
                "space-y-4"
              }
            >
              {filteredProducts?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-gray-500 text-lg">No products found</p>
                </motion.div>
              ) : (
                filteredProducts?.map((product, index) => (
                  <motion.div
                    id={product.mn}
                    key={product.mn}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
                      viewMode === 'list' ? 'p-4' : ''
                    }`}
                  >
                    <div className={viewMode === 'list' ? 'flex items-center justify-between' : 'p-6'}>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          product.type === 'G' ? 'bg-blue-100 text-blue-600' :
                          product.type === 'H' ? 'bg-purple-100 text-purple-600' :
                          product.type === 'B' ? 'bg-green-100 text-green-600' :
                          product.type === 'P' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getProductIcon(product.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-gray-900">{product.mn}</h3>
                            {product.power && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {product.power}kW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                          {viewMode === 'list' && (
                            <p className="text-sm text-gray-500 mt-1">
                              Type: {productTypeInfo[product.type as ProductType]?.label}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 mt-1 font-bold">
                              Quantity: {product.quantity}
                            </p>
                        </div>
                      </div>
                      
                     
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

