import { motion } from "framer-motion";
import { Home, Package, ShoppingCart, BookOpen, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const A_Navbar = () => {
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: "HOME", redirect: "/a/home", disabled: false },
    { icon: Package, label: "PRODUCTS", redirect: "/a/products", disabled: false },
    { icon: ShoppingCart, label: "ORDERS", redirect: "/a/orders", disabled: false },
    { icon: BookOpen, label: "BOOK ORDER", redirect: "/a/book", disabled: false },
    { icon: Truck, label: "SHIPMENT", redirect: "/a/shipment", disabled: true },
  ];

  return (
    <div className="px-4 py-2">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-7xl mx-auto bg-white text-gray-800 rounded-full border border-blue-200 shadow-lg"
      >
        <div className="flex justify-between items-center px-6 py-3">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-blue-600"
          >
            Festa Solar
          </motion.h1>
          <div className="flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-2 transition-colors ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed opacity-50" 
                    : "cursor-pointer hover:text-blue-600"
                }`}
                onClick={() => {
                  if (!item.disabled) navigate(item.redirect);
                }}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
            <div className="flex items-center space-x-4 ml-6 border-l pl-6 border-gray-200">
              <div className="w-8 h-8 rounded-full bg-blue-600"></div>
              <button
                className="px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                onClick={() => {
                  localStorage.removeItem("a_token");
                  navigate("/a/login");
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};
