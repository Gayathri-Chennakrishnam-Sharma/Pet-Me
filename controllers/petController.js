/* eslint-disable node/no-unsupported-features/es-syntax */
const Pet = require('../models/petModel');
const APIFeatures = require('../utils/apiFeatures');

// const pets = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/pets-simple.json`)
// );

//middleware for checking iD when mongodb was not used
// exports.checkID = (req, res, next, val) => {
//   console.log(`Pet id is : ${val}`);
//   if (req.params.id * 1 > pets.length) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

exports.currentlyAdoptablePups = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'age,availabilityStatus';
  next();
};

exports.getAllPets = async (req, res) => {
  try {
    // console.log(req.query);
    //executing the query
    const features = new APIFeatures(Pet.find(), req.query)
      .filter()
      .sort()
      .limitFileds()
      .paginate();
    const pets = await features.query;

    //one way of querying using mongoose methods
    // const query = Pet.find()
    //   .where('age')
    //   .equals(2)
    //   .where('breed')
    //   .equals('Indie Kombai');

    //sending response
    res.status(200).json({
      status: 'Success',
      results: pets.length,
      data: {
        pets,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getAPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        pet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
  res.status(200).json({
    status: 'Success',
    // data: {
    //   pet,
    // },
  });
};

exports.createAPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        pet: newPet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.updateAPet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        pet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.deleteAPet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getPetStats = async (req, res) => {
  try {
    const stats = await Pet.aggregate([
      {
        $match: { age: { $gte: 1 } },
      },
      {
        $group: {
          _id: { $toUpper: '$breed' },
          numPets: { $sum: 1 },
          avgAge: { $avg: '$age' },
          minAge: { $min: '$age' },
          maxAge: { $max: '$age' },
        },
      },
      // {
      //   $sort: { avgAge: 1 },
      // },
    ]);
    res.status(200).json({
      status: 'Success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
