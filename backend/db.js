const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectdb;