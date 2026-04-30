
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Header from './components/Header';
import './App.css'

function App() {
  return (
    <>
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders/:orderId' element={<Order />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </main>
    </>
  );
}

export default App;
