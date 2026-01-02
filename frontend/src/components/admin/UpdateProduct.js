import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { getProduct } from '../../actions/productAction';
import { updateProduct } from '../../actions/productAdminActions';
import { clearProductUpdated, clearError } from '../../slices/productSlice';

export default function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);

    const { loading, product = {}, error, isProductUpdated } = useSelector(state => state.productState);

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    useEffect(() => {
        // Fetch product data when component mounts or id changes
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        // Populate form fields when product data is loaded
        if (product._id) {
            setName(product.name || '');
            setPrice(product.price || '');
            setDescription(product.description || '');
            setCategory(product.category || '');
            setStock(product.stock || '');
            setSeller(product.seller || '');
            
            let images = [];
            product.images && product.images.forEach(image => {
                images.push(image.image);
            });
            setImagesPreview(images);
        }
    }, [product]);
    
    useEffect(() => {
        if (isProductUpdated) {
            toast.success('Product updated successfully!');
            dispatch(clearProductUpdated());
            navigate('/admin/products');
        }
        
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, error, isProductUpdated, navigate]);

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
        
        files.forEach(file => {
            const reader = new FileReader();
            
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                }
            }
            
            reader.readAsDataURL(file);
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('seller', seller);
        
        images.forEach(image => {
            formData.append('images', image);
        });
        
        if (imagesCleared) {
            formData.append('imagesCleared', imagesCleared);
        }
        
        dispatch(updateProduct(id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        onChange={e => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description_field" 
                                        rows="8"
                                        onChange={e => setDescription(e.target.value)}
                                        value={description}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select 
                                        className="form-control" 
                                        id="category_field"
                                        onChange={e => setCategory(e.target.value)}
                                        value={category}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        onChange={e => setStock(e.target.value)}
                                        value={stock}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        onChange={e => setSeller(e.target.value)}
                                        value={seller}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onImagesChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>

                                    {imagesPreview.length > 0 && <div className="mt-3">
                                        {imagesPreview.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt="Preview"
                                                width="55"
                                                height="52"
                                                className="mr-2"
                                            />
                                        ))}
                                    </div>}
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading}
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
