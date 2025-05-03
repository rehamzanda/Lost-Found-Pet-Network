const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const petRoutes = require('./routes/petRoutes');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true})); // middleware to parse URL-encoded data
app.use(express.json());

connectDB();

// Use pet routes
app.use('/api/pets', petRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
