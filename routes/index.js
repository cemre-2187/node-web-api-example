// Modules
const router = require('express').Router();
// Routes
const authRouter = require('./authRoutes/authRouter');
const contactRouter = require('./contactRoutes/contactRouter');
const errorRouter = require('./errorRoutes/errorRouter');
const productRouter = require('./productRoutes/productRouter');
const userRouter = require('./userRoutes/userRouter');

router.use('/auth', authRouter);
router.use('/error', errorRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/contact', contactRouter);

module.exports = router;