const router = require('express').Router();
// Controllers
const {
    login,
    register,
    logout,
    checkAuth,
    verifyAccount,
    initialLogin
} = require('../../controllers/authController');
// Middlewares
const checkReqBody = require('../../middlewares/checkReqBody');
const validateEmail = require('../../middlewares/validateEmail');

// Login
router.post('/login', checkReqBody(['email', 'password']), validateEmail, login);

// Register
router.post('/register', checkReqBody(['email', 'password', 'passwordConfirm', 'firstName', 'lastName']), validateEmail, register);

// Logout
router.get('/logout', logout);

// Check Auth
router.get('/checkAuth', checkAuth);

// Verify account
router.get('/verify/:token', verifyAccount);

// Get initial context after activation
router.get('/initialLogin/:token', initialLogin)


module.exports = router;