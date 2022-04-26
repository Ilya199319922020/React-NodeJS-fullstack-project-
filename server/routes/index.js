const Router = require('express');
const router = new Router();
const ordersRouter = require('./ordersRouter');
const orderDetailRouter = require('./orderDetailRouter');
const meRouter = require('./meRouter');

router.use('/orders', ordersRouter);
router.use('/orderDetail', orderDetailRouter);
router.use('/me', meRouter)

module.exports = router;