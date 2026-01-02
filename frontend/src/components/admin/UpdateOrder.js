import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { getOrderDetail, updateOrder } from '../../actions/orderActions';
import { clearOrderUpdated, clearError } from '../../slices/orderSlice';
import { Link } from 'react-router-dom';

export default function UpdateOrder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [orderStatus, setOrderStatus] = useState('');

    const { loading, orderDetail = {}, error, isOrderUpdated } = useSelector(state => state.orderState);
    const { shippingInfo = {}, user = {}, orderStatus: currentStatus, orderItems = [], totalPrice, paymentInfo = {} } = orderDetail;

    useEffect(() => {
        dispatch(getOrderDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (orderDetail._id) {
            setOrderStatus(currentStatus || '');
        }
        
        if (isOrderUpdated) {
            toast.success('Order updated successfully!');
            dispatch(clearOrderUpdated());
            navigate('/admin/orders');
        }
        
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [orderDetail, currentStatus, isOrderUpdated, error, dispatch, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('orderStatus', orderStatus);
        
        dispatch(updateOrder(id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update Order'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-8 mt-5 order-details">
                                <h1 className="my-5">Order # {orderDetail._id}</h1>

                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user.name}</p>
                                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>

                                <hr />

                                <h4 className="my-4">Payment</h4>
                                <p className={paymentInfo && paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'}><b>{paymentInfo && paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}</b></p>

                                <h4 className="my-4">Order Status:</h4>
                                <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}><b>{orderStatus}</b></p>

                                <h4 className="my-4">Order Items:</h4>

                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div className="row my-5" key={item.product}>
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>

                            <div className="col-12 col-lg-3 mt-5">
                                <h4 className="my-4">Update Status</h4>

                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <select 
                                            className="form-control" 
                                            onChange={e => setOrderStatus(e.target.value)}
                                            value={orderStatus}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={loading}
                                    >
                                        Update Status
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
