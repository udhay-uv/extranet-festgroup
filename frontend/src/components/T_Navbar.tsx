import { motion } from "framer-motion";
import { Home, Settings, LineChart, ShoppingCart, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const T_Navbar = () => {
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: "HOME", redirect: "/t/home", disabled: false },
    { icon: Settings, label: "SETTING", redirect: "/t/setting", disabled: false },
    { icon: ShoppingCart, label: "ORDER", redirect: "/t/order", disabled: true },
    { icon: Truck, label: "SHIPMENT", redirect: "/t/shipment", disabled: true },
    { icon: LineChart, label: "REPORT", redirect: "/t/report", disabled: true },
  ];

  return (
    <div className="px-4 py-2">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-5xl mx-auto bg-white text-gray-800 rounded-full border border-blue-200 shadow-lg"
      >
        <div className="flex justify-between items-center px-6 py-3">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-blue-600"
          >
            Feston
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
                  localStorage.removeItem("t_token");
                  navigate("/t/login");
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
