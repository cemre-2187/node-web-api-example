const router = require('express').Router();
// Controllers
const {
    getRecords,
    searchProducts,
    searchHistogram,
    getBrandSuggestions,
    getProductCategories,
    getWishlistProducts,
    getProductsInfo,
    getProductInfo,
    getProductInfos,
    getCategoryInfo,
    getCategory,
    getCategoryById
} = require('../../controllers/productController');

// Get Records (for searchbar)
router.get('/records', getRecords);

// Search Products
router.get('/search', searchProducts);

// Search Histogram
router.get('/histogram/:productCode', searchHistogram);

// Get Product Categories
router.get('/categories', getProductCategories);

// Get Wishlist Products
router.get('/wishlist', getWishlistProducts);

// Get Specific Products Info
router.get('/productsInfo', getProductsInfo);

// Get Specific Product Info
router.get('/productInfo', getProductInfo);

// Get category info
router.get('/category', getCategoryInfo);

router.get('/categoryName', getCategory);

router.get('/category/:id', getCategoryById);

module.exports = router;