const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
var uniqueValidator = require('mongoose-unique-validator')

console.log(`Conecting to ${url}`)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  }).catch(error => {
    console.log('Error ')
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,  
    required: true,
    minlength: 8
  }   
})

personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

