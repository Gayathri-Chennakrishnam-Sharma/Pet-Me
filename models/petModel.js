const mongoose = require('mongoose');

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
  },
});

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A pet must have a name!'],
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 1.5,
    required: [true, 'Age must be defined!'],
  },
  gender: {
    type: String,
    required: [true, 'A pet must have a gender!'],
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
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
