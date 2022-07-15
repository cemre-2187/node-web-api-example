const router = require('express').Router();
// Controllers
const { error } = require('../../controllers/errorController');
// Middlewares
const checkReqBody = require('../../middlewares/checkReqBody');

// Log Errors
router.post('/', checkReqBody(['errorMessage']), error);

module.exports = router;