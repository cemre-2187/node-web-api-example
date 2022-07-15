// Importing built-in modules
const path = require('path') // getting path of the file

// Importing libraries
const express = require('express'); // express server
const cors = require('cors'); // enabling cors
const cookieParser = require('cookie-parser'); // parsing the cookie
const helmet = require('helmet'); // for securing the server
const dotenv = require('dotenv');
const morgan = require('morgan');

// .env file configuration
dotenv.config({ path: path.resolve(process.cwd(), "./config/.env") });
if (!process.env.NODE_ENV) {
  throw new Error("The .env file is missing");
}

// Import dbs
require('./dbs/postgres');

// Starting express server
const app = express();

// Importing Global Error Handler
const globalErrorHandler = require('./utils/globalErrorHandler');

// Routes
const router = require('./routes/index');

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["x-total-count"],
    domain: 'pintirim.com'
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public/build"))); // serving static files
app.use(helmet());

// Setting up logger&enabling app to trust proxy to make morgan get the client Ip
app.enable("trust proxy");
app.use(morgan(":remote-addr * :remote-user * [:date[clf]] * :method * :url * HTTP/:http-version * :status * :res[content-length] * :response-time ms"));

app.use('/api', router);

// Sending error html if no route matches
app.all('*', (req, res, next) => {
  res
    .status(404)
    .sendFile(
      path.join(__dirname + "/templates/errors/error_page_400.html")
    );
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;