const express = require("express")
const userrouter = express.Router()
const {userSignup,renderuserpage} = require("../controller/user.controller")


userrouter.get("/user", renderuserpage)


userrouter.post("/user/signup", userSignup)



module.exports = userrouter