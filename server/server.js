const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const petRoutes = require('./routes/petRoutes');
const path = require('path');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', petRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});