const express = require('express');
const dotenv = require('dotenv');
const data = require('./data/data');
const connectDB = require('./config/db');
const colors = require('colors');


// ROUTES 
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

//Middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    // console.log('Server Running');
    res.send('API is Running');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.get('/api/data', (req, res) => {
    res.send(data)
})
app.use(notFound);
app.use(errorHandler)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Successfully running port : ${PORT}`.yellow.bold)
})