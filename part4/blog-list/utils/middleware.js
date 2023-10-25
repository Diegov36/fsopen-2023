const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')    
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
      return authorization.substring(7)
    }
    
    return null
  }


const tokenExtractor = (request, response, next) => {
    if(request.get('authorization')){
        request.token = getTokenFrom(request)
        request.decodedToken = jwt.verify(request.token, process.env.SECRET)
    }    
    next()
}

const userExtractor = async (request, response, next) =>{  
    if(request.decodedToken){
        request.user = await User.findById(request.decodedToken.id)
    }      
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
