require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const livestockRoutes = require('./routes/livestockRoutes');
const cashRoutes = require('./routes/cashRoutes');
const saleRoutes = require('./routes/saleRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/livestock', livestockRoutes);
app.use('/api/cash', cashRoutes);
app.use('/api/sales', saleRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('--- ERROR DETECTADO ---');
    console.error(err);
    res.status(500).json({
        message: err.message || 'Error interno del servidor',
        error: err
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
