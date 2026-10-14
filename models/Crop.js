const mongoose = require('mongoose')

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mandi: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Crop', cropSchema)