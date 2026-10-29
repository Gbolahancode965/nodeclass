const mongoose = require("mongoose")

 const todoschema = mongoose.Schema({
   title:{type:String,required:true,trim:true},
   description:{type:String, required:true,trim:true},
   completed:{type:Boolean,default:false},
   user:{type:String, required:true}
 },{timestamps:true})

const todomodel = mongoose.model("todo_collection", todoschema)

module.exports = todomodel