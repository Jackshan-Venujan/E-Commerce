const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controllers/productController');
const { get } = require('mongoose');
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

// isAuthenticatedUser, authorizeRoles these middlewares handling the roles and permission
router.route('/products').get(getProducts);     //isAuthenticatedUser,
router.route('/product/:id')                                
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)
router.route('/review').put(isAuthenticatedUser, createReview)
                       .delete(deleteReview);
router.route('/reviews').get(getReviews);




//Admin routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

module.exports = router;
