const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pet = require('../../models/petModel');

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
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected!');
  });

//read json file

const pets = JSON.parse(
  fs.readFileSync(`${__dirname}/pets-simple.json`, 'utf8')
);

//import data into database
// eslint-disable-next-line no-unused-vars
const importData = async () => {
  try {
    await Pet.create(pets);
    console.log('Data successfully loaded to DB!!!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete data from collection/database
// eslint-disable-next-line no-unused-vars
const deleteData = async () => {
  try {
    await Pet.deleteMany();
    console.log('Data successfully deleted from DB!!!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
