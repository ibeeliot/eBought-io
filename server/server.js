// for usage of dotenv
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const app = express();
// const bodyParser = require('body-parser');

// import routes
const userAuthRouter = require('./routes/userAuthRoutes');
const userRouter = require('./routes/userRoutes');

// database
const mongoose = require('mongoose');
// parsing request bodies
app.use(express.json());

//cookie parsing
app.use(cookieParser());

// morgan used for watch routes
app.use(morgan('dev'));

// express validation
app.use(expressValidator());

// database connections: START

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('DB has connected...');
	});

mongoose.connection.on('error', () => {
	console.log(`DB connection error: ${err.message}`);
});

// database connections: END

// ROUTES: START
app.get('/', (req, res) => {
	res.status(200).json('HELLO');
});

app.use('/api', userAuthRouter);

app.use('/api', userRouter);

// ROUTES: END

app.listen(PORT, () => {
	console.log(`Server is listening to ${PORT}...`);
});
