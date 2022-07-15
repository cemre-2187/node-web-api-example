// Import necessary file(s)
const app = require('./app');

// Handle uncaught exceptions
process.on("uncaughtException", err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.stack);
  process.exit(1);
});


// Assign a value to the PORT variable
const PORT = process.env.PORT || 8003;

// Listen the express server
const server = app.listen(PORT, () => {
    console.log(`Server is awake on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.stack);
  process.exit(1);
});