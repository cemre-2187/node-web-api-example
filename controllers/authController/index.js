// Models
const User = require("../../models/userModel");
// Libraries
const jwt = require("jsonwebtoken");
// utils
const catchAsync = require("../../utils/catchAsync");
const { sendActivationMail } = require("../../utils/mailFunctions");
const {
    encryptToken,
    decryptToken,
    getUserInfo,
} = require("../../utils/authFunctions");
const AppError = require("../../utils/appError");
const MailService = require('../../services/mailService');

// This function is used only here so defined here
function createToken(user) {
    let payload = JSON.stringify({
        _id: user._id,
        role: user.role,
    });
    return jwt.sign(payload, process.env.secret);
}

exports.login = catchAsync(async (req, res, next) => {
    // Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("Kullanıcı bulunamadı.", 400));
    }
    // Check if user is verified
    if (!user.isVerified) {
        return next(new AppError("Kullanıcı aktif değil.", 400));
    }
    // Check password
    let validPassword = await user.isPasswordCorrect(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        return next(new AppError("Şifre yanlış.", 400));
    }

    //? TODO: Learn what is this ///////////////////////////////////////////////
    // // let ipAddress = req.ip;
    // // let min_user = User.hidePrivateFields(user);
    // // delete min_user.img;
    // // es.index({
    // //     index: elasticsearchPrefix + "login",
    // //     body: {
    // //         createdBy: req.body.id,
    // //         createdAt: new Date(),
    // //         userIp: ipAddress,
    // //         rowData: min_user,
    // //         useragent: {
    // //             browser: req.useragent.browser,
    // //             version: req.useragent.version,
    // //             os: req.useragent.os,
    // //             platform: req.useragent.platform,
    // //             geoIp: req.useragent.geoIp,
    // //             source: req.useragent.source,
    // //         },
    // //     },
    // // });
    ///////////////////////////////////////////////////////////////////////////////

    // Create and set token
    let token = createToken(user);
    token = await encryptToken(token);
    res.cookie("token", token, {
        httpOnly: true,
        // expires: new Date(Date.now()),
        secure: true,
        SameSite: "Strict",
        // maxAge : new Date(Date.now())
    });
    // Return token and user info
    let userInfo = await getUserInfo(user._id);
    return res.status(200).send({ status: "success", message: "Giriş başarılı.", token: token, user: userInfo, });
});

exports.register = catchAsync(async (req, res, next) => {
    // Control if they match
    const { email, password, passwordConfirm, firstName, lastName, phoneNumber } = req.body;
    const isMatched = password == passwordConfirm;
    if (!isMatched) {
        return next(new AppError("Şifreler uyuşmuyor.", 400));
    }
    // Control if email is already in use
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        return next(new AppError("Kullanıcı zaten kayıtlı.", 400));
    }
    if (phoneNumber) {
        const phoneNumberExist = await User.findOne({ phoneNumber: phoneNumber });
        if (phoneNumberExist) {
            return next(new AppError("Telefon numarası zaten kayıtlı.", 400));
        }
    }
    const userInfo = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    }
    phoneNumber ? userInfo.phoneNumber = phoneNumber : null;
    // Create a new user
    const user = await User.create(userInfo);
    // create activation URL
    let token = createToken(user);
    const activationURL = process.env.backendURL + `/api/auth/verify/${token}`;
    // Send activation mail
    new MailService(userInfo, activationURL).sendEmailVerification()
        .then((response) => {
            console.log(response);
            return res.status(200).send({ status: 'success', message: 'Mail başarıyla gönderildi.' })
        }
        )
        .catch((err) => {
            console.log(err);
            return next(new AppError('Mail gönderirken hata oluştu.', 400));
        })
});

exports.logout = catchAsync(async (req, res, next) => {
    // Clear cookie
    res.clearCookie("token");
    // console.log(res.socket);
    // res.cookie('token', req.cookies.token,{
    //     httpOnly : true,
    //     secure: true,
    //     SameSite: "Strict",
    //     // expires : new Date(Date.now())
    // })
    return res.status(200).send({ status: "success", message: "Çıkış Başarılı" });
});

exports.checkAuth = catchAsync(async (req, res, next) => {
    // Check if token is exist
    let cookieToken = req.cookies.token;
    // console.log(req.cookies);
    if (!cookieToken) return next(new AppError("Yetkilendirme başarısız.", 400));
    // Decrypt token
    let token = decryptToken(cookieToken);
    if (!token) return next(new AppError("Yetkilendirme başarısız.", 400));
    // Check if token is valid
    let decoded = await jwt.verify(token, process.env.secret);
    if (!decoded) return next(new AppError("Yetkilendirme başarısız.", 400));
    // Check if user exist
    let user = await User.findById(decoded._id);
    if (!user) {
        return next(new AppError("Kullanıcı bulunamadı.", 400));
    }
    // Return user info
    let userReturn = await getUserInfo(user._id);
    return res.status(200).send({ status: "success", message: "Kullanıcı onaylandı.", user: userReturn });
});

exports.verifyAccount = catchAsync(async (req, res, next) => {
    // Check if token exists
    if (!req.params.token) return next(new AppError("Token bulunamadı.", 400));
    // Decrypt token
    let decoded = jwt.verify(req.params.token, process.env.secret);
    // Check the user
    let user = await User.findOne({ _id: decoded._id });
    if (!user) {
        return next(new AppError("Kullanıcı bulunamadı.", 400));
    }
    // Check if user is already verified
    if (user.isVerified) {
        return res.redirect(process.env.frontendURL + `/uyelik/hosgeldiniz`);
    }
    // Update the user
    await User.updateOne({ _id: user._id }, { isVerified: true });
    // TODO: Redirect to frontend login page
    // Create token for client validation
    const clientToken = createToken(user)
    return res.redirect(process.env.frontendURL + `/uyelik/hosgeldiniz?token=${clientToken}`);
    // res.status(200).send('successs')
});

exports.initialLogin = catchAsync(async (req, res, next) => {
    // Check if token exists
    if (!req.params.token) return next(new AppError("Token bulunamadı.", 400));
    // Decrypt token
    let decoded = jwt.verify(req.params.token, process.env.secret);
    // Check the user
    let user = await User.findOne({ _id: decoded._id });
    if (!user) {
        return next(new AppError("Kullanıcı bulunamadı.", 400));
    }
    // Create and set token
    let sendToken = createToken(user);
    sendToken = await encryptToken(sendToken);
    res.cookie("token", sendToken, {
        httpOnly: true,
        // expires: new Date(Date.now()),
        secure: true,
        SameSite: "Strict",
        // maxAge : new Date(Date.now())
    });
    // Return token and user info
    let userInfo = await getUserInfo(user._id);
    return res.status(200).send({ status: "success", token: sendToken, user: userInfo, });
});
