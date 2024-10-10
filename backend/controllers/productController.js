const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

// Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async(req, res, next) => {
    const resPerPage = 8 ;
    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);
   // const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter();

     const products = await apiFeatures.query;
     res.status(200).json({
        success : true,
        count: products.length,
        products
     })
    
   /* try {
        const product = await Product.find();
        res.status(200).json({
            success: true,
            count: product.length,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }*/
})


// Create Products - /api/v1/product/new
exports.newProduct = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user.id;`q`
    const Products = await Product.create(req.body);
    res.status(201).json({
        success: true,
        Products
    })
});


// Get Single Product - /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async(req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
           return next(new ErrorHandler('Product not Found',400));
        }

        res.status(201).json({
            success: true,
            product
        });

});



/*
//Get single Products
exports.getSingleProduct = async(res,req,next) => {
    const product = await Product.findById(req.params.id);

-------------------    The primary reason why the second snippet does not work is due to a mix-up in the order of the res and req parameters. --------------------
     In Express.js, the order of parameters for middleware functions is always req, res, next.
------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
*/


//Update Product
/*
exports.updateProduct = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body, { 
        new : true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
}
    -----------------------------------------------------------------------------------------------------------------------------
    problem : 
The problem in your code is that you are attempting to send multiple responses within the same request handler. 
Specifically, you are sending a response before and after updating the product.
Key Changes:
Removed the first res.status(200).json block: This was sending a response before updating the product.
Moved the update logic (findByIdAndUpdate) inside the try block: This ensures the update happens before sending the final response.
Explanation:
Check if the product exists: If the product is not found, send a 404 response and exit the function using return.
Update the product: If the product is found, proceed to update it using findByIdAndUpdate.
Send the final response: After updating, send the response with the updated product data.
Error Handling: If any error occurs, send a 500 response with the error message.
This ensures that your response is sent only once, avoiding the ERR_HTTP_HEADERS_SENT error.
    ------------------------------------------------------------------------------------------------------------------------------
*/

// Update Product -/api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete product
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();   
        //The error "product.remove is not a function" suggests that the product object returned by Mongoose does not have a remove method. 
        //This is because Mongoose models no longer include the remove method. Instead, you should use deleteOne or delete methods.
        
        res.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};











