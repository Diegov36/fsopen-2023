require('dotenv').config()

let MongoURI = process.env.MONGO_DB_URI;
if(process.env.NODE_ENV === 'test'){
    MongoURI = process.env.MONGO_DB_TEST
}
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports ={
    MongoURI,
    PORT,
    SECRET
}