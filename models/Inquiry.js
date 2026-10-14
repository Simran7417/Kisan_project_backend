const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Pending'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Inquiry', inquirySchema)