/* eslint-disable node/no-unsupported-features/es-syntax */
const Pet = require('../models/petModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

exports.getAllPets = catchAsync(async (req, res, next) => {
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
});

exports.getAPet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return next(new AppError('No Pet found with that ID!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      pet,
    },
  });
});

exports.createAPet = catchAsync(async (req, res, next) => {
  const newPet = await Pet.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      pet: newPet,
    },
  });
});

exports.updateAPet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pet) {
    return next(new AppError('No Pet found with that ID!', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      pet,
    },
  });
});

exports.deleteAPet = catchAsync(async (req, res, next) => {
  const pet = await Pet.findByIdAndDelete(req.params.id);

  if (!pet) {
    return next(new AppError('No Pet found with that ID!', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.getPetStats = catchAsync(async (req, res, next) => {
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
});
