const router = require('express').Router();
// Controllers
const {
    updateUserPassword,
    updateUserInfo,
    forgotPassword,
    verifyPassword,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} = require('../../controllers/userController');
// Middlewares
const checkTokenValidty = require('../../middlewares/checkTokenValidty');
const checkReqBody = require('../../middlewares/checkReqBody');

// Update User Password
router.put('/updatePassword', checkTokenValidty, checkReqBody(['currentPassword', 'newPassword', 'newPasswordConfirm']), updateUserPassword);

// Update User Info
router.put('/updateInfo', checkTokenValidty, checkReqBody(['firstName', 'lastName']), updateUserInfo);

// Forgot Password
router.post('/forgotPassword', checkReqBody(['email']), forgotPassword);

// Verify new password
router.get('/forgotPassword/:token', verifyPassword);

// Get Wishlist
router.get('/wishlist', checkTokenValidty, getWishlist);

// Add to Wishlist
router.post('/wishlist', checkTokenValidty, checkReqBody(['productCode']), addToWishlist);

// Remove from Wishlist
router.delete('/wishlist', checkTokenValidty, removeFromWishlist);


module.exports = router;
