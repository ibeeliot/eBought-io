// for usage of dotenv
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
// const bodyParser = require('body-parser');

// import routes
const userRouters = require('./routes/userRoute');

// database
const mongoose = require('mongoose');
// parsing request bodies
app.use(express.json());

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

app.use('/api', userRouters);

// ROUTES: END

app.listen(PORT, () => {
	console.log(`Server is listening to ${PORT}...`);
});
