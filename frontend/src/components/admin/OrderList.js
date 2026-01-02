import { Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { adminOrders, deleteOrder } from '../../actions/orderActions';
import { clearOrderDeleted, clearError } from '../../slices/orderSlice';

export default function OrderList() {
    const { adminOrders: orders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState || {});
    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p>,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button onClick={() => deleteHandler(order._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteOrder(id));
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
            return;
        }
        if(isOrderDeleted) {
            toast.success('Order deleted successfully!');
            dispatch(clearOrderDeleted());
        }
        dispatch(adminOrders);
    }, [dispatch, error, isOrderDeleted])

    return (
        <Fragment>
            <MetaData title={'Order List'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Order List</h1>
                    <Fragment>
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setOrders()}
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
