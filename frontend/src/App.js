import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/layouts/Header';
import {BrowserRouter as Router,Route, Routes, useLocation} from 'react-router-dom';
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
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import OrderList from './components/admin/OrderList';
import UserList from './components/admin/UserList';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateUser from './components/admin/UpdateUser';
import UpdateOrder from './components/admin/UpdateOrder';
import NewUser from './components/admin/NewUser';
import ReviewList from './components/admin/ReviewList';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-wrapper">
      {!isAdminRoute && <Header/>}
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      {!isAdminRoute ? (
        <div className="container container-fluid main-content">
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
      ) : (
        <Routes>
          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/products' element={<ProductList/>}/>
          <Route path='/admin/product/new' element={<NewProduct/>}/>
          <Route path='/admin/product/:id' element={<UpdateProduct/>}/>
          <Route path='/admin/orders' element={<OrderList/>}/>
          <Route path='/admin/order/:id' element={<UpdateOrder/>}/>
          <Route path='/admin/users' element={<UserList/>}/>
          <Route path='/admin/user/new' element={<NewUser/>}/>
          <Route path='/admin/user/:id' element={<UpdateUser/>}/>
          <Route path='/admin/reviews' element={<ReviewList/>}/>
        </Routes>
      )}
      {!isAdminRoute && <Footer/>}
    </div>
  );
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser)  
  }, [])

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <AppContent />
        </HelmetProvider>
      </div>
    </Router>
  
  );
}

export default App;
