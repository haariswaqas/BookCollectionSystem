const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors package
const path = require('path'); // Import path for serving React files
const sequelize = require('./database'); // Sequelize for database connection
const bookRoutes = require('./routes/bookRoutes'); // Import book routes
const genreRoutes = require('./routes/genreRoutes'); // Import genre routes

dotenv.config(); // Load environment variables from .env

const app = express();

// Enable CORS
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3000',
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Serve static files from the public directory
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

// API Routes
app.use('/api', bookRoutes);
app.use('/api', genreRoutes);

// React fallback route (for SPA navigation)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Database connected successfully');

        // Synchronize models with the database schema
        await sequelize.sync({ alter: true }); // Update the schema without dropping data
        console.log('Database models synchronized');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();
