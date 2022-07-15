const router = require('express').Router();
// Controllers
const { sendContactMail } = require('../../controllers/contactController');
// Middlewares
const checkReqBody = require('../../middlewares/checkReqBody');
const validateEmail = require('../../middlewares/validateEmail');

// Send contact mail
router.post('/', checkReqBody([ 'name', 'email', 'subject', 'message' ]), validateEmail, sendContactMail);


module.exports = router;
