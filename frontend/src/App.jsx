import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Pizza } from './pages/Pizza/Pizza';
import Cart from './pages/Cart/Cart';
import Register_Page from './pages/Register_Page/Register_Page';
import { Login } from './pages/Login_Page/Login_Page';
import { NotFound } from './components/NotFound/NotFound';
import { Profile } from './components/Profile/Profile';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute/ProtectedRoute';
import Swal from 'sweetalert2'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register_Page />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route path="/cart" element={<Cart />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;