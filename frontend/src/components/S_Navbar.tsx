import { motion } from "framer-motion"
import { Home, LineChart, Settings, Truck, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const S_Navbar=()=>{
  const navigate = useNavigate();
    const navItems = [
        { icon: Home, label: 'HOME', redirect: '/s/home', disabled: false },
        { icon: Settings, label: 'SETTING', redirect: '/s/setting', disabled: false },
        { icon: ShoppingCart, label: 'ORDER', redirect: '/s/order', disabled: true },
        { icon: Truck, label: 'SHIPMENT', redirect: '/s/shipment', disabled: true },
        { icon: LineChart, label: 'REPORT', redirect: '/s/report', disabled: true }
      ];

    return(

        <div className="px-4 py-2">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="max-w-5xl mx-auto bg-white text-gray-800 rounded-full border border-green-200 shadow-lg"
        >
          <div className="flex justify-between items-center px-6 py-3">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-green-600"
            >
              Semicon
            </motion.h1>
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-2 cursor-pointer hover:text-green-600 transition-colors ${
                    item.disabled ? "text-gray-400 cursor-not-allowed opacity-50" : "cursor-pointer hover:text-green-600"
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
                <div className="w-8 h-8 rounded-full bg-green-600"></div>
                <button className="px-4 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm"
                onClick={() => {
                  localStorage.removeItem("s_token");
                  navigate("/s/login");
                }}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>
    )

}