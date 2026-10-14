require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const Crop = require('./models/Crop')
const Inquiry = require('./models/Inquiry')

const app = express()

app.use(cors())
app.use(express.json())

const crops = [
  { name: 'Wheat', mandi: 'Meerut', price: 2450 },
  { name: 'Rice', mandi: 'Ghaziabad', price: 3100 },
  { name: 'Mustard', mandi: 'Hapur', price: 5680 }
]

// Home route
app.get('/', (req, res) => {
  res.send('AgriLink Backend is running!')
})

// Get all crops
app.get('/api/crops', async (req, res) => {
  try {
    const savedCrops = await Crop.find()

    if (savedCrops.length === 0) {
      return res.json(crops)
    }

    res.json(savedCrops)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add crop to MongoDB
app.post('/api/crops', async (req, res) => {
  try {
    const { name, mandi, price } = req.body

    if (!name || !mandi || price == null || Number(price) <= 0) {
      return res.status(400).json({
        message: 'Please enter valid crop details'
      })
    }

    const newCrop = await Crop.create({
      name,
      mandi,
      price: Number(price)
    })

    res.status(201).json({
      message: 'Crop added successfully!',
      crop: newCrop
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Save buyer inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { cropName, buyerName, message } = req.body

    if (!cropName || !buyerName) {
      return res.status(400).json({
        message: 'Crop name and buyer name are required'
      })
    }

    const inquiry = await Inquiry.create({
      cropName,
      buyerName,
      message
    })

    res.status(201).json({
      message: 'Buyer inquiry saved successfully!',
      inquiry
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all buyer inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)