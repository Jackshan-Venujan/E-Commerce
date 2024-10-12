const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);

//Admin Routes - /api/v1/orders
router.route('/orders').get(isAuthenticatedUser,authorizeRoles('admin'),orders);
router.route('/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateOrder);


module.exports = router;
