
// Libraries
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// Models
const User = require('../../models/userModel');
const Wishlist = require('../../models/wishListModel');
// Utils
const { sendPasswordResetMail } = require('../../utils/mailFunctions');
const { generatePassword } = require('../../utils/authFunctions');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EmailService = require('../../services/mailService');

exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  if (req.userId) {
    if (newPassword != newPasswordConfirm) return next(new AppError('Şifreler uyuşmuyor.', 400));
    // Find the user
    let user = await User.findById(req.userId);
    if (!user) return next(new AppError('Kullanıcı bulunamadı.', 400));
    // Control the password
    let isValid = bcrypt.compareSync(currentPassword, user.password);
    if (isValid) {
      // Change the password and save
      user.password = newPassword;
      // Before saving, the password is hashed by the model
      user.save()
        .then(() => {
          return res
            .status(200)
            .send({ status: 'success', message: "Şifre güncellendi." });
        })
        .catch((err) => {
          return next(new AppError(err.message, 400))
        })
    } else {
      return next(new AppError('Yanlış şifre.', 400))
    }
  } else {
    return next(new AppError('Kullanıcı yetkisiz.', 400));
  }
});

exports.updateUserInfo = catchAsync(async (req, res, next) => {
  const { firstName, lastName, phoneNumber } = req.body;
  if (req.userId) {
    // Find the user
    let user = await User.findById(req.userId);
    if (!user) return next(new AppError('Kullanıcı bulunamadı.', 400));
    // Change the info and save
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber || null;
    user.save();
    let userInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    }
    return res.status(200).send({ status: 'success', message: "Kullanıcı bilgileri güncellendi.", userInfo });
  } else {
    return next(new AppError('Kullanıcı yetkisiz.', 400));
  }
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user by email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('Kullanıcı bulunamadı.', 400))
  // Generate random password
  let newPassword = generatePassword();
  // Create a token with user id and password and create an url to reset password
  let payload = {
    _id: user._id,
    password: newPassword,
  };
  let token = jwt.sign(payload, process.env.secret);
  // token validation
  if (!token) return next(new AppError('Kullanıcı tanımlanamadı.', 400));
  // Create URL
  let url = process.env.backendURL + "/api/user/forgotPassword/" + token;
  new EmailService(user, url, newPassword).sendForgotPasswordEmail()
    .then((response) => {
      return res.status(200).send({ status: 'success', message: "Mail gönderildi." })
    })
    .catch((err) => {
      console.log(err);
      return next(new AppError('Mail gönderilemedi.', 400))
    })
  // if (mailSent.success) {
  //   return res.status(200).send({ status: 'success', message: "Mail gönderildi." })
  // } else {
  //   return next(new AppError('Mail gönderilemedi.', 400))
  // }
});

exports.verifyPassword = catchAsync(async (req, res, next) => {
  // Decode token
  let token = req.params.token;
  if (!token) return next(new AppError('Kullanıcı yetkisiz.', 400));
  let decoded = jwt.verify(token, process.env.secret);
  if (!decoded) return next(new AppError('Kullanıcı tanımlanamadı.', 400));
  // Find user by id
  let user = await User.findOne({ _id: decoded._id });
  if (!user)
    return next(new AppError('Kullanıcı bulunamadı.', 400));
  // Set new password
  user.password = decoded.password;
  user.save()
    .then(() => {
      // TODO: Redirect to login page
      return res.redirect(process.env.frontendURL)
    })
    .catch((err) => {
      return next(new AppError('Şifre güncellenemedi.', 400));
    })
});

exports.getWishlist = catchAsync(async (req, res, next) => {
  // Get wishlist by userId
  let wishlist = await Wishlist.find({ userId: req.userId });
  if (wishlist) {
    return res.status(200).send({ status: 'success', message: wishlist });
  } else {
    return next(new AppError('Favoriler bulunamadı.', 400));
  }
});

exports.addToWishlist = catchAsync(async (req, res, next) => {
  // Get wishlist
  let storedItem = await Wishlist.findOne({
    userId: req.userId,
    productCode: req.body.productCode,
  });
  // If the product is already added to the wishlist
  if (storedItem) {
    return next(new AppError('Ürün zaten favorilerinizde.', 400));
  } else {
    // Create a new wishlist item
    let wishlist = await Wishlist.create({
      userId: req.userId,
      productCode: req.body.productCode
    });
    if (wishlist) {
      // Push new item to the wishlist
      let userList = await Wishlist.find({ userId: req.userId });
      let newWishlist = [];
      userList.forEach(function (item) {
        newWishlist.push(item.productCode);
      });
      return res
        .status(200)
        .send({ status: 'success', message: wishlist, newWishlist });
    } else {
      return next(new AppError('Ürün favorilerinize eklenemedi.', 400));
    }
  }
});

exports.removeFromWishlist = catchAsync(async (req, res, next) => {
  if (req.userId) {
    // Find and delete the item from the wishlist of the user
    let wishlist = await Wishlist.findOneAndRemove({
      userId: req.userId,
      productCode: req.query.productCode,
    });
    if (wishlist) {
      // Find and generate the wishlist again
      let userList = await Wishlist.find({ userId: req.userId });
      let newWishlist = [];
      userList.forEach(function (item) {
        newWishlist.push(item.productCode);
      });
      return res.status(200).send({
        success: true,
        message: "Ürün favorilerinizden kaldırıldı.",
        newWishlist,
      });
    } else {
      return next(new AppError(400, 'Ürün favorilerinizde değil.'));
    }
  } else {
    return next(new AppError(400, 'Ürün favorilerinizden kaldırılamadı.'));
  }
});