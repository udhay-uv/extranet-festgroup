// by GAETAN
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HomePage } from './pages/Home';
import {OrdersPage} from './pages/OrderDetails';
import { ProductsPage } from './pages/Products';
import { BookPage } from './pages/Book';
import { GSTINTable } from './pages/CustomerTable';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Navigate to="/a/login" />} />
        <Route path="/s" element={<Navigate to="/s/login" />} />
        <Route path="/t" element={<Navigate to="/t/login" />} />

        <Route path="/:company/login" element={<Login />} />
        <Route path="/:company/sales_customer" element={<GSTINTable />} />
        <Route path="/:company/register" element={<Register />} />
        <Route path="/:company/home" element={<HomePage />} />
        <Route path="/:company/orders" element={<OrdersPage />} />
        <Route path="/:company/products" element={<ProductsPage />} />
        <Route path="/:company/book" element={<BookPage />} />


      </Routes>
    
    
    </BrowserRouter>
   
    
  ) 
}

export default App;
