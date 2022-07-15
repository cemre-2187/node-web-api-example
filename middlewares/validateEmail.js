const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Control the key value pairs of request body
const validateEmail = catchAsync(async (req, res, next) => {
    try {
        let email = req.body.email;
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return next(new AppError("Geçersiz email.", 400));
        }
        next(); // If email is valid, continue
    } catch (err) {
        res.status(400).send({ success: false, message: err.message });
    }
});

module.exports = validateEmail;