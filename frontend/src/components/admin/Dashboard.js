import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAdminActions';
import { adminOrders } from '../../actions/orderActions';
import { getUsers } from '../../actions/userActions';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { products = [] } = useSelector(state => state.productState);
    const { adminOrders: orders = [] } = useSelector(state => state.orderState);
    const { users = [] } = useSelector(state => state.userState);
    
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    
    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(adminOrders);
        dispatch(getUsers);
    }, [dispatch]);
    return (
        <Fragment>
            <MetaData title={'Admin Dashboard'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Admin Dashboard</h1>
                    
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white o-hidden h-100" style={{background: '#febd69'}}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Total Amount<br /> <b>${totalAmount.toFixed(2)}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pr-4">
                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card text-white o-hidden h-100" style={{background: '#222e3d'}}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Products<br /> <b>{products.length}</b>
                                    </div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products" style={{background: 'rgba(254, 189, 105, 0.1)'}}>
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card text-white o-hidden h-100" style={{background: '#222e3d'}}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Orders<br /> <b>{orders.length}</b>
                                    </div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders" style={{background: 'rgba(254, 189, 105, 0.1)'}}>
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card text-white o-hidden h-100" style={{background: '#222e3d'}}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">
                                        Users<br /> <b>{users.length}</b>
                                    </div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users" style={{background: 'rgba(254, 189, 105, 0.1)'}}>
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
