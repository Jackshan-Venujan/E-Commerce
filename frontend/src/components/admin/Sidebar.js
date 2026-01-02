import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const { products = [] } = useSelector(state => state.productState || {});
    
    return (
        <div className="sidebar-wrapper">
            <Nav className="flex-column">
                <Nav.Item>
                    <Link to="/" className="nav-link">
                        <i className="fa fa-home"></i> Back to Shop
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link to="/admin/dashboard" className="nav-link">
                        <i className="fa fa-tachometer"></i> Dashboard
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link to="/admin/products" className="nav-link">
                        <i className="fa fa-shopping-basket"></i> All Products
                        {products.length > 0 && <span className="badge badge-primary ml-1">{products.length}</span>}
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link to="/admin/product/new" className="nav-link">
                        <i className="fa fa-plus"></i> Create Product
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link to="/admin/orders" className="nav-link">
                        <i className="fa fa-shopping-cart"></i> Orders
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link to="/admin/users" className="nav-link">
                        <i className="fa fa-users"></i> Users
                    </Link>
                </Nav.Item>

                <Nav.Item>
                    <Link to="/admin/reviews" className="nav-link">
                        <i className="fa fa-star"></i> Reviews
                    </Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}
