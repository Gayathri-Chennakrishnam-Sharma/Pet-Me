const express = require('express');
const morgan = require('morgan');

const petRouter = require('./routes/petRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARES:
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) =>{
    console.log('Hello from the middleware stack...');
    next();
});

app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
});

//SIMPLIFIED ROUTES:
app.use('/api/v1/pets' , petRouter);
app.use('/api/v1/users' , userRouter);

module.exports = app;