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

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header/>
            <div class="container container-fluid">
              <ToastContainer theme="dark" />
              <Routes>
                <Route path = '/' element = {<Home/>} />
                <Route path = '/search/:keyword' element = {<ProductSearch/>} />
                <Route path = '/product/:id' element = {<ProductDetail/>} />  
                <Route path='/login' element={<login/>}/>
              </Routes>
            </div>
          <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  
  );
}

export default App;
