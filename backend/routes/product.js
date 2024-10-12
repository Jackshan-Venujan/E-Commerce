const express = require('express');
const router = express.Router();
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { get } = require('mongoose');
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');


router.route('/products').get(isAuthenticatedUser,getProducts);

// isAuthenticatedUser, authorizeRoles these middlewares handling the roles and permission
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)


//Admin routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);


module.exports = router;
