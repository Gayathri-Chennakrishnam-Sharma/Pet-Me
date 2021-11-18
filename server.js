/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION 💥 SHUTTING DOWN APPLICATION...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((_con) => {
    // console.log(con.connections);
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected!');
  });

// console.log(process.env.NODE_ENV);

//SERVER INTIALIZATION:
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on server port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 SHUTTING DOWN APPLICATION...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
