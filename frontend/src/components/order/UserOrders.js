import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userOrders } from '../../actions/orderActions';
import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';
import OrderDetail from './OrderDetail';

export default function UserOrders() {
    const { userOrders: orders, loading } = useSelector(state => state.orderState);
    const dispatch = useDispatch();
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        dispatch(userOrders);
    }, [dispatch]);

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <h1 className="mt-5">My Orders</h1>
            {loading ? <Loader /> :
                <Fragment>
                    {orders && orders.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Number of Items</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.orderItems.length}</td>
                                            <td>${order.totalPrice}</td>
                                            <td className={order.orderStatus && order.orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}>
                                                {order.orderStatus}
                                            </td>
                                            <td>
                                                <button 
                                                    onClick={() => setSelectedOrderId(order._id)} 
                                                    className="btn"
                                                    style={{ backgroundColor: '#febd69', color: '#232f3e' }}
                                                    title="View Order Details"
                                                >
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <h3>No orders yet</h3>
                            <p>You haven't placed any orders. Start shopping!</p>
                            <Link to="/" className="btn btn-primary mt-3">
                                Browse Products
                            </Link>
                        </div>
                    )}
                </Fragment>
            }
            
            {/* Order Detail Modal */}
            {selectedOrderId && (
                <OrderDetail 
                    orderId={selectedOrderId} 
                    onClose={() => setSelectedOrderId(null)}
                />
            )}
        </Fragment>
    );
}
