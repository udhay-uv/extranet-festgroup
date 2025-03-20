
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { FestaLogin } from './pages/a/Login';
import { FestaRegister } from './pages/a/Register';
import { SemiconLogin } from './pages/s/Login';
import { SemiconRegister } from './pages/s/Register';
import { FestonLogin } from './pages/t/Login';
import { FestonRegister } from './pages/t/Register';
import { FestaSolarHome } from './pages/a/Home';
import { SemiconHome } from './pages/s/Home';
import { FestonHome } from './pages/t/Home';

import {OrdersPage} from './pages/a/OrderDetails';
import { ProductsPage } from './pages/a/Products';
import { BookPage } from './pages/a/Book';
function App() {

  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Navigate to="/a/login" />} />
        <Route path="/a/login" element={<FestaLogin />} />
        <Route path="/a/register" element={<FestaRegister />} />
        <Route path="/a/home" element={<FestaSolarHome />} />
        <Route path="/a/orders" element={<OrdersPage />} />
        <Route path="/a/products" element={<ProductsPage />} />
        <Route path="/a/book" element={<BookPage />} />


        <Route path="/s" element={<Navigate to="/s/login" />} />
        <Route path="/s/login" element={<SemiconLogin />} />
        <Route path="/s/register" element={<SemiconRegister />} />
        <Route path="/s/home" element={<SemiconHome />} />

        <Route path="/t" element={<Navigate to="/t/login" />} />
        <Route path="/t/login" element={<FestonLogin />} />
        <Route path="/t/register" element={<FestonRegister />} />
        <Route path="/t/home" element={<FestonHome />} />

        
        

        
        
       
       




      </Routes>
    
    
    </BrowserRouter>
   
    
  ) 
}

export default App;
