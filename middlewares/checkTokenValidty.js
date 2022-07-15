// Libraries
const jwt = require("jsonwebtoken");
// Mdels
const User = require('../models/userModel');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const checkTokenValidty = catchAsync(async(req, res, next) => {
    let cookieToken = req.cookies.token;
    // Cookie validation
    if (!cookieToken) {
      return next(new AppError('Geçersiz kullanıcı.', 403));
    } else {
      // Token validation
      const unprefixedCookie = cookieToken.slice(27, cookieToken.length);
      const sanitizedCookie = unprefixedCookie.slice(0, 15) + unprefixedCookie.slice(69, unprefixedCookie.length);
      const token = Buffer.from(sanitizedCookie, 'base64').toString('ascii');
      let decoded = jwt.verify(token, process.env.secret);
      if (!decoded._id) {
        return next(new AppError('Geçersiz kullanıcı.', 403));
      } else {
        const userInfo = await User.findById(decoded._id).select('-password');
        if(!userInfo) return next(new AppError('Kullanıcı bulunamadı.', 401));
        req.userId = userInfo._id;
            next();
      }
    }
  }); 

module.exports = checkTokenValidty;