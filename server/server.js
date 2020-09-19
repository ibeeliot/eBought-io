// for usage of dotenv
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const app = express();
// database
const mongoose = require("mongoose");

// import routes
const userRoutes = require("./Routes/users");

// ** Middleware: START
// cors allow us to trust a specific origin so that we don't have to send preflights during connection request
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// parsing request bodies
app.use(express.json());

//cookie parsing, which allows reading and writing cookies
app.use(cookieParser());

// morgan used for watch routes
app.use(morgan("dev"));

// express validation
app.use(expressValidator());
// ** Middleware: END

// database connections: START
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB has connected...");
  });

mongoose.connection.on("error", () => {
  console.log(`DB connection error: ${err.message}`);
});

// database connections: END

// ROUTES: START
// middleware -> more specific routes up first
app.use("/api/users", userRoutes);

app.use("/api", (req, res) => res.send("HELLO THERE FROM HOME"));

app.use("*", (req, res) => {
  res.send('Looks like you"ve landed somewhere you don"t belong!');
});
// ROUTES: END

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}...`);
});
