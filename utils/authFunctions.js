let crypto = require("crypto");
const { promisify } = require('util');
// Models
const User = require('../models/userModel');
const Wishlist = require('../models/wishListModel');

// Generate a random string
const getRandomBytes = async (size) => {
  const key = await promisify(crypto.randomBytes)(size);
  return key.toString('hex');
};

exports.encryptToken = async (token) => {
  try {
    // check if token exists and is a string
    if (!token || typeof (token) !== 'string') {
      return null;
    };
    // encrypt the token with Base64
    const encryptedToken = Buffer.from(token).toString('base64');
    // create a random string and encrypt to prefix the encrypted token
    const randomStringPrefix = await getRandomBytes(10);
    const encryptedPrefix = Buffer.from(randomStringPrefix).toString('base64');
    const configuredPrefix = encryptedPrefix.slice(0, encryptedPrefix.length - 1); // 27 chars long
    // create a random string and encrypt to inject in the middle of the encrypted token
    const randomStringMiddle = await getRandomBytes(20);
    const encryptedMiddle = Buffer.from(randomStringMiddle).toString('base64');
    const configuredMiddle = encryptedMiddle.slice(0, encryptedMiddle.length - 2); // 54 chars long
    // create seesion cookie
    const cookie = `${configuredPrefix}${encryptedToken.slice(0, 15)}${configuredMiddle}${encryptedToken.slice(15, encryptedToken.length)}`;
    // return the session cookie
    return cookie;
  } catch (e) {
    return null;
  }
};

exports.decryptToken = (cookie) => {
  try {
    // check if token exists and is a string, and has the min length to be decrypted
    if (typeof (cookie) !== 'string' || cookie.length < 43) {
      return null;
    };
    // extract encrypted token from the cookie
    const unprefixedCookie = cookie.slice(27, cookie.length);
    const sanitizedCookie = unprefixedCookie.slice(0, 15) + unprefixedCookie.slice(69, unprefixedCookie.length);
    // decrypt the token to ascii
    const token = Buffer.from(sanitizedCookie, 'base64').toString('ascii');
    // return the session cookie
    return token;
  } catch (e) {
    return null;
  }
};

// Generates a password for the user
exports.generatePassword = () => {
  //chars for password generator
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //password length
  const passwordLength = 12;
  let password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

// Returns user's info to stored in the context at the frontend
exports.getUserInfo = async (userId) => {
  let info = await User.findById(userId).select('-password -__v -createdAt -updatedAt -_id -passwordChangedAt');
  let wishlistRaw = await Wishlist.find({ userId: userId }).select('-userId -__v -createdAt -updatedAt');
  // Returns an array of product codes with the wishlist items
  let wishlist = wishlistRaw.map(item => item.productCode);
  let userInfo = {
    info,
    wishlist
  };
  return userInfo;
}
