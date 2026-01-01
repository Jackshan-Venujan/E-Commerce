import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast, ToastContainer } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';


export default function ProductSearch(){
    const dispatch =useDispatch();
    const { products, loading,error,productsCount,resPerPage} = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    const { keyword } = useParams();
    console.log(currentPage)
    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo)
    }


    useEffect(() => {
        if(error){
            return toast.error(error, {
                position: "bottom-center"
            })      //toast position is not working
        }
        dispatch(getProducts(keyword, currentPage));

    }, [error, dispatch, keyword, currentPage])

    return (
        <Fragment>
            <ToastContainer />
                {loading ? <Loader/> :
                    <Fragment>
                    <MetaData title={'Buy Your Electronic Products'}/>
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product}/>
                            ))}
                        </div>
                    </section>
                    {productsCount >0 && productsCount > resPerPage?
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage = {currentPage}
                            onChange={setCurrentPage}
                            totalItemsCount={productsCount}
                            itemsCountPerPage={resPerPage}
                            nextPageText={'Next'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass={'page-item'}
                            linkClass={'page-link'}
                        />
                    </div>: null }
                    </Fragment>
                }
        </Fragment>

    )

}

// Not finished this search and filter options