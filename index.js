const express = require("express")
const app = express()
require("ejs")
const mongoose = require("mongoose")
require("dotenv").config()
const connect = require("./database/db.connect")
const usermodel = require("./model/user.model")
const todomodel = require("./model/todo.model")
const userrouter = require("./route/user.route")



app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use("/" , userrouter)


let username = ""
const userarray = []

// CRUD operation with mongoose  CREATE READ UPDATE DELETE
// CREATE 
// FINDONE FINDBYID FIND. to read data on mongodb


app.get("/",(request , response)=>{
//    response.send("Welcome to your node class")
  response.render("index",{username,gender:"female"})
})

// controller the whole function


// app.get("/user",(req, res)=>{
//      res.json({
//       user:[
//             {"id":1 ,"name":"David","class":"Nodejs", "favouriteFood":"pasta"},
//             {"id":2 ,"name":"Abayomi","class":"Nodejs", "favouriteFood":"Rice"},
//             {"id":3,"name":"Emeka","class":"Nodejs", "favouriteFood":"Noodles"},
//             {"id":4,"name":"Victoria","class":"Nodejs", "favouriteFood":"Pounded yam and egusi with goatmeat"},
//             {"id":5,"name":"Emmanuel","class":"Nodejs", "favouriteFood":"yam and egg"},
//         ]
//      })
// })

app.get("/signup",(req, res)=>{
  res.render("signup")
})

app.get("/login",(req , res)=>{
    res.render("login")
})

app.get("/dashboard", async (req ,res)=>{
  try {
   const alltodo =  await todomodel.find({user:username})
   console.log(alltodo);
   
   if (alltodo) {
    return res.render("dashboard",{username,alltodo})
   }
   
  } catch (error) {
    console.log(error);
    
  }
   
})


// app.post("/user/signup", async(req ,res)=>{
//   try {
//      console.log(req.body);
//    const {username , email , password} = req.body
//    if (!username || !email || !password) {
//      return res.send("All fields are mandatory")
//    }
//    const newuser =  await usermodel.create(req.body)
//     console.log(newuser);

//     if (newuser) {
//       return res.redirect("/login")
//     }
    
//   } catch (error) {
//     console.log(error);
//     if (error.message.includes("E11000 duplicate key error collection:")) {
//       return res.send("email already exist")
//     }
    
//   }
//   //  userarray.push(req.body)
//   //  console.log(userarray)
//   //   res.redirect("/login")
// })


app.post("/user/login", async(req, res)=>{
   try {
    console.log(req.body);
   const {email , password}= req.body
   
   if (!email || !password) {
     return res.send("All fields are mandatory")
   }
    const existuser = await usermodel.findOne({email})
    console.log(existuser);
    if (existuser && existuser.password == password) {
      username = existuser.username
      return res.redirect("/dashboard")
    } 

    return res.send("Invalid user ")
   } catch (error) {
    console.log(error);
    
   }
})

app.post("/user/addtodo", async(req , res)=>{
try {
  console.log(req.body);
  const {title , description} = req.body
  if (!title || !description) {
    return res.send("All fields are mandatory")
  }

const newtodo =  await todomodel.create({...req.body , user:username})
  console.log(newtodo);
  if (newtodo) {
    return res.redirect("/dashboard")
  }
 
} catch (error) {
  console.log(error);
   return res.send(error.message)
}
})



app.post("/todo/delete/:id", async (req, res)=>{
   try {
    console.log(req.params);
    const {id} = req.params
    
   const deletedtodo = await todomodel.findByIdAndDelete(id)
   console.log(deletedtodo);
    if (deletedtodo) {
      res.redirect("/dashboard")
    }
   } catch (error) {
    console.log(error);
    
   }
})

app.post("/todo/update/:id", async(req, res)=>{
  console.log(req.params);
  const {id} = req.params
  try {
   const updatedtodo = await todomodel.findByIdAndUpdate(id,
     {completed:true},
     {new:true}
    )
   console.log(updatedtodo);
   if (updatedtodo) {
    res.redirect("/dashboard")
   }
   
  } catch (error) {
    console.log(error);
    
  }
})


connect()



const port = 8004
app.listen(port,()=>{
   console.log(`app started at port ${port}`);
   
})