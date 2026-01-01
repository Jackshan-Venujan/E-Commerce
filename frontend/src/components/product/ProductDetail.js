import { Fragment, useEffect, useState } from 'react';
import { getProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../layouts/Loader';
import {Carousel} from 'react-bootstrap';
import MetaData from '../layouts/MetaData';
import { addCartItem } from '../../actions/cartActions';
import { toast } from 'react-toastify';

export default function ProductDetail() {
    const { loading, product } = useSelector((state) => state.productState);
    const { isAuthenticated } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (product.stock === 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber === 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }
        dispatch(addCartItem(product._id, quantity));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                product && (  // Ensure product is loaded
                    <Fragment>
                        <MetaData title={product.name}/>
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause="hover">
                                    {product.images && product.images.map(image => 
                                        <Carousel.Item key={image._id}>
                                             <img className="d-block w-100" src= {image.image} alt={product.name} height="500" width="500" />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                                
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3>{product.name}</h3>
                                <p id="product_id">Product #{product._id}</p>

                                <hr />

                                <div className="rating-outer">
                                    <div className="rating-inner" style={{width:`${product.ratings/5 * 100}%`}}></div>
                                </div>
                                <span id="no_of_reviews">{product.numOfReviews} Reviews</span>
                                <hr />

                                <p id="product_price">${product.price}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                </div>

                                <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0 || !isAuthenticated} onClick={handleAddToCart}>
                                    {!isAuthenticated ? 'Login to Add to Cart' : 'Add to Cart'}
                                </button>

                                <hr />

                                <p>
                                    Status: <span id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                </p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>Processor: Intel i5-1235U (3.30 GHz up to 4.40 GHz), 10 Cores & 12MB Cache RAM & Storage: 8GB, 8Gx1, DDR4, 2666MHz Ach & 512GB SSD Display & Graphics: 15.6" FHD WVA AG 120Hz 250 nits Narrow Border & Integrated Graphics</p>
                                <hr />
                                <p id="product_seller" className="mb-3">
                                    Sold by: <strong style={{ color: 'black' }}>{product.seller}</strong>
                                </p>

                                <div className="rating w-50"></div>
                            </div>
                        </div>
                    </Fragment>
                )
            )}
        </Fragment>
    );
}





















/*import {Fragment, useEffect} from 'react'
import { getProduct } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';

export default function ProductDetail () {
    const {loading,product} = useSelector((state) => state.productState);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() =>{
        dispatch(getProduct(id))
    },[dispatch, id])


    return(
        <Fragment>
            {loading? <Loader/>:
            <Fragment>            
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <img src="/images/products/3.jpg" alt="sdf" height="500" width="500"/>
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product #{product._id}</p>

                        <hr/>

                            <div className="rating-outer">
                                <div className="rating-inner"></div>
                            </div>
                            <span id = "no_of_reviews">{product.numOfReviews} Reviews</span>
                        <hr/>

                        <p id="product_price">${product.price}</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus">-</span>
                            <input type="number" className="form-control count d-inline" value="1" readOnly />
                            <span className="btn btn-primary plus">+</span>
                        </div>

                        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                        <hr/>

                        <p>Status: <span className ={product.stock > 0? 'greenColor':'redColor'} id="stock_status">{product.stock > 0? 'In Stock': 'Out of Stock'}</span></p>

                        <hr/>

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <hr/>
                        <p id="product_seller" className="mb-3">Sold by: <strong>{product.seller}</strong></p>
                        
                        <div className="rating w-50"></div>           
                    </div>
                </div>
            </Fragment>}
        </Fragment>


    )
}*/