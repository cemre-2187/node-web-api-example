const AppError = require("../utils/appError");

// Control the key value pairs of request body
const checkReqBody = (parameters) => {
    return function (req, res, next) {
        try {
            let missingParams = [];
            parameters.map(parameter => {
                if (!req.body[parameter]) 
                    missingParams.push(parameter);
            });
            if (missingParams.length > 0) 
                return next( new AppError(`Eksik veri girildi.`, 400));
            next(); // If all keys have a valid value, continue
        } catch (err) {
            res.status(400).send({ success: false, message: err.message });
        }
    };
}



module.exports = checkReqBody;