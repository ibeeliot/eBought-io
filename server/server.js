// for usage of dotenv
require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8000;
const app = express();

// import routes
const userRouters = require('./routes/user');

// database
const mongoose = require('mongoose');
// parsing request bodies
app.use(express.json());

// database connections: START

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`DB has connected...`);
  });

mongoose.connection.on('error', () => {
  console.log(`DB connection error: ${err.message}`);
});

// database connections: END

// ROUTES: START
app.use('/api', userRouters);

app.post('/login', userRouters);

// ROUTES: END
app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}...`);
});
