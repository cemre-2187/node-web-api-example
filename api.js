const api = require("express").Router();
const isLoggedIn = require("./middleware/isLoggedIn");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const tesrRoutes = require("./routes/testRoutes");

api.use('/auth', authRoutes);
api.use('/users', isLoggedIn, userRoutes);
api.use('/skills', isLoggedIn, skillRoutes);
api.use('/test', tesrRoutes);

module.exports = api;