const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const { join } = require('lodash');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: false
  },
  numberInStock: { 
    type: Object,

  },
  dailyRentalRate: { 
    type: Array,
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50),
    genreId: Joi.objectId(),
    // numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.array(),
    numberInStock: Joi.object(),

  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;