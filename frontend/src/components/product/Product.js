import {Link} from 'react-router-dom';



export default function Product({product}) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].image}
                    alt={product.name}  // Added alt attribute for accessibility
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width:`${product.ratings/5 * 100}%`}}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>    
                    </div>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="">View Details</Link>
                </div>
            </div>
        </div>
    );
}




// Above code is fixed according to the jsx-a11y/alt-text rule 
/*ou need to ensure that the <img> element has an appropriate alt attribute.
 Since product.images[0].image is being used as the source, a meaningful alt text that describes the image should be provided.
  You can use the product.name as the alt value, assuming it represents the product well. 
  Refer Documentation : https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/4925ba8d0bf80a4b1d8e8645d310590bf1b40b64/docs/rules/alt-text.md */

  
/*export default function Product({product}){
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].image}
                    />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                    <a href="">{product.name}</a>
                    </h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                            <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}></div>
                        </div>
                        <span id ="no_of_reviews">({product.numOfReviews} Reviews)</span>    
                    </div>
                    <p className="card-text">${product.price}</p>
                    <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                </div>
            </div>
        </div>
    )
}*/