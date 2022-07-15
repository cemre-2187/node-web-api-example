// Models
const es = require("../../dbs/elasticSearch");
const Error = require("../../models/errorModel");
// Utils
const catchAsync = require('../../utils/catchAsync');
const AppError = require("../../utils/appError");

exports.error = catchAsync(async (req, res, next) => {
    // Create a new error
    const error = await Error.create({ errorMessage: req.body.errorMessage });
    if(!error) return next(new AppError('User not found', 400))
    return res.status(200).send({ success: true, message: "Error logged" });
});