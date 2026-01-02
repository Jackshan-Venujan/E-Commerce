import { Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { getAdminProducts, deleteProduct } from '../../actions/productAdminActions';
import { clearProductDeleted, clearError } from '../../slices/productSlice';

export default function ProductList() {
    const { products = [], loading = true, error, isProductDeleted } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button onClick={() => deleteHandler(product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
            return;
        }
        if(isProductDeleted) {
            toast.success('Product deleted successfully!');
            dispatch(clearProductDeleted());
        }
        dispatch(getAdminProducts);
    }, [dispatch, error, isProductDeleted])

    return (
        <Fragment>
            <MetaData title={'Product List'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Product List</h1>
                    <Link to="/admin/product/new" className="btn btn-primary mb-4">
                        <i className="fa fa-plus"></i> New Product
                    </Link>
                    <Fragment>
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setProducts()}
                                bordered
                                striped
                                hover
                                className="px-3"
                                noBottomColumns
                            />
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
