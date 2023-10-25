const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRoutes = require('./controllers/blogs')
const userRoutes = require('./controllers/users')
const loginRoutes = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
require('express-async-errors')

mongoose.connect(config.MongoURI).then(console.log("Connected to mongoDB URL: ", config.MongoURI))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use('/api/login', loginRoutes)


module.exports = app
