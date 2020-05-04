// for usage of dotenv
require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8000;
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const userModel = require('./models/userModel');

// import routes
const userRouters = require('./routes/userRoute');

// database
const mongoose = require('mongoose');
// parsing request bodies
app.use(bodyParser());

//cookie parsing
app.use(cookieParser());

// morgan used for watch routes
app.use(morgan('dev'));

// database connections: START

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
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

// ROUTES: END

app.listen(PORT, () => {
	console.log(`Server is listening to ${PORT}...`);
});
