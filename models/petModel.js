/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const fosterContact = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Foster person name must be defined!'],
    unique: false,
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: [true, 'A Foster person must have a contact number!'],
    trim: true,
    maxLength: [10, 'Provide a Contact Number with 10 digits'],
    minLength: [0, 'Provide a Contact Number with 10 digits'],
  },
});

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A pet must have a name!'],
      unique: true,
      trim: true,
      // validate: [validator.isAlpha, 'Pet name must only contain Alphabets.'],
    },
    slug: String,
    age: {
      type: Number,
      default: 1.5,
      required: [true, 'Age must be defined!'],
    },
    gender: {
      type: String,
      required: [true, 'A pet must have a gender!'],
      enum: {
        values: ['Male', 'Female'],
        message: 'Gender can be either Male or Female',
      },
    },
    breed: {
      type: String,
      required: [true, 'A pet must be specified of its breed!'],
    },
    details: {
      type: String,
      trim: true,
    },
    vaccinationStatus: {
      type: String,
      trim: true,
    },
    availabilityStatus: {
      type: String,
      required: [true, 'A pet must be specified of its availability status!'],
    },
    imageCover: {
      type: String,
      required: [true, 'A pet must have a image cover!'],
    },
    images: [String],
    fosterContact: [fosterContact],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretPet: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// petSchema.virtual('durationWeeks').get(function () {
//   return this.createdAt / 7;
// });

//DOCUMENT MIDDLEWARE that runs before .save() and .create()
petSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// // eslint-disable-next-line prefer-arrow-callback
// petSchema.post('save', function (doc, next) {
//   // eslint-disable-next-line no-console
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE that runs before/after find() findById() etc.
petSchema.pre(/^find/, function (next) {
  this.find({ secretPet: { $ne: true } });
  next();
});

//AGGREGATION MIDDLEWARE that runs before/after .aggregate()
petSchema.pre('aggregate', function (next) {
  // eslint-disable-next-line no-console
  this.pipeline().unshift({ $match: { secretPet: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
