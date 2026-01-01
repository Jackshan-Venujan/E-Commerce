import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../slices/cartSlice';
import { toast } from 'react-toastify';

export default function Shipping() {
    const { shippingInfo = {} } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address || '');
    const [city, setCity] = useState(shippingInfo.city || '');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || '');
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || '');
    const [country, setCountry] = useState(shippingInfo.country || '');
    const [state, setState] = useState(shippingInfo.state || '');

    const submitHandler = (e) => {
        e.preventDefault();

        if (!address || !city || !phoneNo || !postalCode || !country || !state) {
            toast.error('Please fill all fields');
            return;
        }

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        toast.success('Shipping info saved!');
        navigate('/order/confirm');
    };

    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <input
                                type="text"
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
