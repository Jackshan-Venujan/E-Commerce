import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail, updateOrder } from '../../actions/orderActions';
import { clearOrderUpdated, clearError } from '../../slices/orderSlice';
import { toast } from 'react-toastify';
import Loader from '../layouts/Loader';

export default function OrderDetail({ orderId, onClose }) {
    const { orderDetail, loading, isOrderUpdated, error } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [updatedItems, setUpdatedItems] = useState([]);
    const [comment, setComment] = useState('');
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetail(orderId));
        }
    }, [dispatch, orderId]);

    useEffect(() => {
        if (orderDetail && orderDetail.orderItems) {
            setUpdatedItems(orderDetail.orderItems.map(item => ({
                ...item,
                quantity: item.quantity
            })));
            setComment(orderDetail.comment || '');
        }
    }, [orderDetail]);

    useEffect(() => {
        if (isOrderUpdated) {
            toast.success('Order updated successfully!');
            dispatch(clearOrderUpdated());
            setEditMode(false);
            dispatch(getOrderDetail(orderId));
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isOrderUpdated, error, dispatch, orderId]);

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const newItems = [...updatedItems];
        newItems[index].quantity = parseInt(newQuantity);
        setUpdatedItems(newItems);
    };

    const handleSaveChanges = () => {
        const orderData = {
            orderItems: updatedItems,
            comment: comment,
            totalPrice: updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
        };
        dispatch(updateOrder(orderId, orderData));
    };

    const handleCancelOrder = () => {
        const orderData = {
            orderStatus: 'Cancelled',
            comment: comment || 'Order cancelled by user'
        };
        dispatch(updateOrder(orderId, orderData));
        setShowCancelConfirm(false);
    };

    if (loading || !orderDetail || !orderDetail.orderItems) {
        return (
            <div className="modal-backdrop fade show" style={{ display: 'block' }}>
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center p-5">
                                <Loader />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isCancellable = orderDetail.orderStatus !== 'Delivered' && 
                         orderDetail.orderStatus !== 'Cancelled' &&
                         orderDetail.orderStatus !== 'Shipped';

    return (
        <Fragment>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header" style={{ backgroundColor: '#232f3e', color: 'white' }}>
                            <h5 className="modal-title">Order Details - {orderDetail._id}</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body">
                            {/* Order Status Badge */}
                            <div className="mb-4">
                                <span className={`badge ${
                                    orderDetail.orderStatus === 'Delivered' ? 'bg-success' :
                                    orderDetail.orderStatus === 'Cancelled' ? 'bg-danger' :
                                    orderDetail.orderStatus === 'Processing' ? 'bg-warning' :
                                    'bg-info'
                                } fs-6`}>
                                    {orderDetail.orderStatus}
                                </span>
                            </div>

                            {/* Shipping Information */}
                            <div className="card mb-4">
                                <div className="card-header text-white" style={{ backgroundColor: '#232f3e' }}>
                                    <h6 className="mb-0">Shipping Information</h6>
                                </div>
                                <div className="card-body">
                                    <p><strong>Name:</strong> {orderDetail.shippingInfo?.name || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {orderDetail.shippingInfo?.phoneNo || 'N/A'}</p>
                                    <p><strong>Address:</strong> {orderDetail.shippingInfo?.address || 'N/A'}</p>
                                    <p><strong>City:</strong> {orderDetail.shippingInfo?.city || 'N/A'}</p>
                                    <p><strong>Postal Code:</strong> {orderDetail.shippingInfo?.postalCode || 'N/A'}</p>
                                    <p className="mb-0"><strong>Country:</strong> {orderDetail.shippingInfo?.country || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="card mb-4">
                                <div className="card-header text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#232f3e' }}>
                                    <h6 className="mb-0">Order Items</h6>
                                    {isCancellable && !editMode && orderDetail.orderStatus === 'Processing' && (
                                        <button className="btn btn-sm" style={{ backgroundColor: '#febd69', color: '#232f3e', fontWeight: 'bold' }} onClick={() => setEditMode(true)}>
                                            <i className="fa fa-edit me-1"></i> Edit Quantities
                                        </button>
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Image</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(editMode ? updatedItems : orderDetail.orderItems).map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                            />
                                                        </td>
                                                        <td>${item.price}</td>
                                                        <td>
                                                            {editMode ? (
                                                                <div className="input-group" style={{ width: '120px' }}>
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <input 
                                                                        type="number" 
                                                                        className="form-control form-control-sm text-center"
                                                                        value={item.quantity}
                                                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                                        min="1"
                                                                    />
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-success"
                                                                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                item.quantity
                                                            )}
                                                        </td>
                                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {editMode && (
                                        <div className="alert alert-info mt-3">
                                            <i className="fa fa-info-circle me-2"></i>
                                            <strong>New Total:</strong> ${updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment & Price Information */}
                            <div className="card mb-4">
                                <div className="card-header text-white" style={{ backgroundColor: '#232f3e' }}>
                                    <h6 className="mb-0">Payment Information</h6>
                                </div>
                                <div className="card-body">
                                    <p><strong>Payment Method:</strong> {orderDetail.paymentInfo?.type || 'N/A'}</p>
                                    <p><strong>Payment Status:</strong> 
                                        <span className={`badge ${orderDetail.paymentInfo?.status === 'succeeded' ? 'bg-success' : 'bg-warning'} ms-2`}>
                                            {orderDetail.paymentInfo?.status || 'Pending'}
                                        </span>
                                    </p>
                                    <hr />
                                    <p><strong>Items Price:</strong> ${orderDetail.itemsPrice || '0.00'}</p>
                                    <p><strong>Tax Price:</strong> ${orderDetail.taxPrice || '0.00'}</p>
                                    <p><strong>Shipping Price:</strong> ${orderDetail.shippingPrice || '0.00'}</p>
                                    <h5 style={{ color: '#232f3e' }}><strong>Total Price:</strong> ${orderDetail.totalPrice}</h5>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="card mb-4">
                                <div className="card-header text-white" style={{ backgroundColor: '#232f3e' }}>
                                    <h6 className="mb-0">Comments / Notes</h6>
                                </div>
                                <div className="card-body">
                                    <textarea 
                                        className="form-control" 
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add any special instructions or notes for this order..."
                                        disabled={!isCancellable}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Order Timeline */}
                            {orderDetail.createdAt && (
                                <div className="card">
                                    <div className="card-header text-white" style={{ backgroundColor: '#232f3e' }}>
                                        <h6 className="mb-0">Order Timeline</h6>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Order Placed:</strong> {new Date(orderDetail.createdAt).toLocaleString()}</p>
                                        {orderDetail.deliveredAt && (
                                            <p className="mb-0"><strong>Delivered At:</strong> {new Date(orderDetail.deliveredAt).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                            {editMode ? (
                                <Fragment>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setEditMode(false);
                                            setUpdatedItems(orderDetail.orderItems.map(item => ({...item})));
                                        }}
                                    >
                                        Cancel Edit
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn"
                                        style={{ backgroundColor: '#febd69', color: '#232f3e', fontWeight: 'bold' }}
                                        onClick={handleSaveChanges}
                                    >
                                        <i className="fa fa-save me-1"></i> Save Changes
                                    </button>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {comment !== (orderDetail.comment || '') && isCancellable && (
                                        <button 
                                            type="button" 
                                            className="btn"
                                            style={{ backgroundColor: '#febd69', color: '#232f3e', fontWeight: 'bold' }}
                                            onClick={() => dispatch(updateOrder(orderId, { comment }))}
                                        >
                                            <i className="fa fa-save me-1"></i> Save Comment
                                        </button>
                                    )}
                                    
                                    {isCancellable && (
                                        <button 
                                            type="button" 
                                            className="btn btn-danger"
                                            onClick={() => setShowCancelConfirm(true)}
                                        >
                                            <i className="fa fa-times me-1"></i> Cancel Order
                                        </button>
                                    )}
                                    <button 
                                        type="button" 
                                        className="btn"
                                        style={{ backgroundColor: '#232f3e', color: 'white' }}
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelConfirm && (
                <Fragment>
                    <div className="modal-backdrop fade show" style={{ zIndex: 1060 }}></div>
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1061 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header text-white" style={{ backgroundColor: '#dc3545' }}>
                                    <h5 className="modal-title">Confirm Cancellation</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close btn-close-white" 
                                        onClick={() => setShowCancelConfirm(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to cancel this order?</p>
                                    <p className="text-muted">Order ID: {orderDetail._id}</p>
                                    <p className="text-muted mb-0">This action cannot be undone.</p>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => setShowCancelConfirm(false)}
                                    >
                                        No, Keep Order
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={handleCancelOrder}
                                    >
                                        Yes, Cancel Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
