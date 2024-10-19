import { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsAction";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast, ToastContainer } from 'react-toastify';


export default function Home(){
    const dispatch =useDispatch();
    const { products, loading,error} = useSelector((state) => state.productsState)
    useEffect(() => {
        if(error){
            return toast.error(error, {
                position: "bottom-center"
            })      //toast position is not working
        }
        dispatch(getProducts);

    }, [error, dispatch])

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
                                <Product product={product}/>
                            ))}
                        </div>
                    </section>

                    </Fragment>
                }
        </Fragment>

    )

}