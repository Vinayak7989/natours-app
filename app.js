const express = require('express');
const morgan =  require('morgan');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log('Hello from middleware');
    const requestTime = new Date.toISOString();
    next();
})

// Routes
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
