const Router = require('express');
const router = new Router();
const ordersRouter = require('./ordersRouter');
const meRouter = require('./meRouter');

router.use('/orders', ordersRouter);
router.use('/me', meRouter)

module.exports = router;