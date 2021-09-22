const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect()

// console.log(process.env.NODE_ENV);

//SERVER INTIALIZATION:
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on server port ${port}...`);
});
