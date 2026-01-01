import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderActions';
import { clearOrderCreated } from '../../slices/orderSlice';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';

export default function Payment() {
    const { items, shippingInfo } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const { isOrderCreated, error } = useSelector(state => state.orderState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    useEffect(() => {
        if (isOrderCreated) {
            toast.success('Order placed successfully!');
            // Clear cart
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            dispatch(clearOrderCreated());
            navigate('/orders/success');
        }
        if (error) {
            toast.error(error);
        }
    }, [isOrderCreated, error, dispatch, navigate]);

    const paymentHandler = async (e) => {
        e.preventDefault();
        
        // Create order object
        const order = {
            orderItems: items,
            shippingInfo,
            itemsPrice: orderInfo.itemsPrice,
            shippingPrice: orderInfo.shippingPrice,
            taxPrice: orderInfo.taxPrice,
            totalPrice: orderInfo.totalPrice,
            paymentInfo: {
                id: 'SAMPLE_PAYMENT_' + Date.now(),
                status: 'succeeded'
            }
        };

        dispatch(createOrder(order));
    };

    return (
        <Fragment>
            <MetaData title={'Payment'} />
            
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={paymentHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <input
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                placeholder="4242 4242 4242 4242"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <input
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                placeholder="MM/YY"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <input
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                placeholder="123"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_name_field">Name on Card</label>
                            <input
                                type="text"
                                id="card_name_field"
                                className="form-control"
                                defaultValue={user.name}
                                required
                            />
                        </div>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay ${orderInfo && orderInfo.totalPrice}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
