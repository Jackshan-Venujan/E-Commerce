import { Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import MetaData from '../layouts/MetaData';
import { getReviews, deleteReview } from '../../actions/reviewActions';
import { clearReviewDeleted, clearError } from '../../slices/reviewSlice';

export default function ReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.reviewState || {});
    const dispatch = useDispatch();

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Product',
                    field: 'product',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
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

        reviews.forEach(review => {
            data.rows.push({
                id: review.id,
                product: review.productName,
                rating: review.rating,
                comment: review.comment,
                user: review.user,
                actions: (
                    <Fragment>
                        <Button onClick={() => deleteHandler(review.productId, review.id)} className="btn btn-danger py-1 px-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (productId, id) => {
        if(window.confirm('Are you sure you want to delete this review?')) {
            dispatch(deleteReview(productId, id));
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
            return;
        }
        if(isReviewDeleted) {
            toast.success('Review deleted successfully!');
            dispatch(clearReviewDeleted());
        }
        dispatch(getReviews);
    }, [dispatch, error, isReviewDeleted])

    return (
        <Fragment>
            <MetaData title={'Review List'} />
            <div className="row" style={{margin: 0}}>
                <div className="col-12 col-md-2" style={{padding: 0}}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Review List</h1>
                    <Fragment>
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setReviews()}
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
