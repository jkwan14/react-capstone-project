import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Order from './pages/Order';
import Orders from './pages/Orders';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/login' element={<Login />} />
      <Route path='/order' element={<Order />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
  );
}

export default App;
