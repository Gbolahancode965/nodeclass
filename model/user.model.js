const mongoose = require("mongoose")


const usersschema = mongoose.Schema({
 username:{type:String},
 email:{type:String, unique:true},
 password:{type:String}
})

const usermodel = mongoose.model("users_collection", usersschema)


module.exports = usermodel