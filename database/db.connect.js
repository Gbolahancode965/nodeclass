const mongoose = require("mongoose")


const uri = process.env.MONGOURI

const connect = async() =>{
  try {
  const connection = await mongoose.connect(uri)
  if (connection) {
    console.log("database connected successfully");
    
  }
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = connect