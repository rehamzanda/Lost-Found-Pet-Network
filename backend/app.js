// to save a user token and send it with req/res
const cookieParser = require('cookie-parser')

// define routes
const userRouter = require("./config/userRoutes");

// define mongoose
require("./config/mongoose");

// define body parser to convert data to json (middleware)
const bodyParser = require("body-parser");

// define express in our app
const express = require("express");

// bring API from .env
require("dotenv/config");
const api = process.env.API_URL;

//define cors to connect frontend and backend together
const cors = require('cors');
const app = express();


// middleware
// // CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Must include OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
    credentials: true // If using cookies/sessions
  }));

    
app.use(cookieParser())
app.use(express.json());
// app.use(userRouter);

app.use(`${api}`, userRouter); // Consistent base path


// listen to our port
app.listen(2000, () => console.log("You are listen to port 2000"));
