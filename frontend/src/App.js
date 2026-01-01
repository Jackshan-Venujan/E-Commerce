import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/layouts/Header';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';

function App() {

  useEffect(() => {
    store.dispatch(loadUser)  
  }, [])

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header/>
            <div class="container container-fluid">
              <ToastContainer theme="dark" position="top-right" autoClose={3000} />
              <Routes>
                <Route path = '/' element = {<Home/>} />
                <Route path = '/search/:keyword' element = {<ProductSearch/>} />
                <Route path = '/product/:id' element = {<ProductDetail/>} />  
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/myprofile' element={<Profile/>}/>
                <Route path='/myprofile/update' element={<UpdateProfile/>}/>
                <Route path='/myprofile/update/password' element={<UpdatePassword/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/shipping' element={<Shipping/>}/>
                <Route path='/order/confirm' element={<ConfirmOrder/>}/>
                <Route path='/payment' element={<Payment/>}/>
                <Route path='/orders/success' element={<OrderSuccess/>}/>
                <Route path='/orders' element={<UserOrders/>}/>
              </Routes>
            </div>
          <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  
  );
}

export default App;
