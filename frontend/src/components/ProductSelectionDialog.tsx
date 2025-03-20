import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Battery, 
  Zap,
  Search,
  Package,
  Cable,
  CircuitBoard,
  Palette,
  LayoutList,
  Grid,
  X
} from 'lucide-react';

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

type ProductType = 'all' | 'G' | 'H' | 'B' | 'M' | 'P';
type ViewMode = 'grid' | 'list';

interface ProductSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

const productTypeInfo = {
  'all': { label: 'All Products', icon: Package },
  'G': { label: 'On-Grid Inverters', icon: Zap },
  'H': { label: 'Hybrid Inverters', icon: CircuitBoard },
  'B': { label: 'Batteries', icon: Battery },
  'M': { label: 'Miscellaneous', icon: Cable },
  'P': { label: 'Pallets', icon: Palette }
};

export const ProductSelectionDialog: React.FC<ProductSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  products
}) => {
  const [activeType, setActiveType] = useState<ProductType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesType = activeType === 'all' || product.type === activeType;
      const matchesSearch = product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.mn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [products, activeType, searchQuery]);

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'G': return <Zap className="w-6 h-6" />;
      case 'H': return <CircuitBoard className="w-6 h-6" />;
      case 'B': return <Battery className="w-6 h-6" />;
      case 'M': return <Cable className="w-6 h-6" />;
      case 'P': return <Palette className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Select Product</h2>
              <p className="text-gray-500">Browse and select from our product catalog</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6 flex-1 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(productTypeInfo) as ProductType[]).map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveType(type)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {React.createElement(productTypeInfo[type].icon, { className: 'w-5 h-5' })}
                    {productTypeInfo[type].label}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
                  >
                    <LayoutList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeType + viewMode + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={viewMode === 'grid' ? 
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
                    "space-y-4"
                  }
                >
                  {filteredProducts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-12"
                    >
                      <p className="text-gray-500 text-lg">No products found</p>
                    </motion.div>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <motion.button
                        key={product.mn}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelectProduct(product)}
                        className={`w-full text-left bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
                          viewMode === 'list' ? 'p-4' : 'p-6'
                        }`}
                      >
                        <div className={viewMode === 'list' ? 'flex items-center justify-between' : ''}>
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
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};