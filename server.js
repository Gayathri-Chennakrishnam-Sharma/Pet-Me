/* eslint-disable no-shadow */
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

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
    console.log('MongoDB Connected!');
  });

// console.log(process.env.NODE_ENV);

//SERVER INTIALIZATION:
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on server port ${port}...`);
});
