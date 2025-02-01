import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export default function Header () {
    return(
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <img width="150px" alt='ElectronicsShop Logo' src="/images/logo.png" />
                </div>
            </div>
  
            <div className="col-12 col-md-6 mt-2 mt-md-0">
              <Search/>
            </div>
  
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/login"  className="btn" id="login_btn">Login</Link>
                <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
                <span className="ml-1" id="cart_count">2</span>
            </div>
        </nav>
    )
}