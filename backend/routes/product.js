const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '..', 'public/images/products'))
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
});

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts, getAdminReviews } = require('../controllers/productController');
const { get } = require('mongoose');
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

// isAuthenticatedUser, authorizeRoles these middlewares handling the roles and permission
router.route('/products').get(getProducts);     //isAuthenticatedUser,

//Admin routes (Must come BEFORE dynamic :id routes to avoid conflicts)
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10), newProduct);
router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminReviews);

router.route('/product/:id')                                
                            .get(getSingleProduct)
                            .put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10), updateProduct)
                            .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
router.route('/review').put(isAuthenticatedUser, createReview)
                       .delete(deleteReview);
router.route('/reviews').get(getReviews);

module.exports = router;
