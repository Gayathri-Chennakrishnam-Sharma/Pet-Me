const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const golbalErrorHandler = require('./controllers/errorHandler');
const petRouter = require('./routes/petRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARES:
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware stack...');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//SIMPLIFIED ROUTES:
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));
});

app.use(golbalErrorHandler);

module.exports = app;
