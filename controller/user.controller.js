const usermodel = require("../model/user.model")


const userSignup = async(req, res) => {
   try {
     console.log(req.body);
   const {username , email , password} = req.body
   if (!username || !email || !password) {
     return res.send("All fields are mandatory")
   }
   const newuser =  await usermodel.create(req.body)
    console.log(newuser);

    if (newuser) {
      return res.redirect("/login")
    }
    
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key error collection:")) {
      return res.send("email already exist")
    }
    
  }
}

const renderuserpage = (req ,res) =>{
     res.json({
      user:[
            {"id":1 ,"name":"David","class":"Nodejs", "favouriteFood":"pasta"},
            {"id":2 ,"name":"Abayomi","class":"Nodejs", "favouriteFood":"Rice"},
            {"id":3,"name":"Emeka","class":"Nodejs", "favouriteFood":"Noodles"},
            {"id":4,"name":"Victoria","class":"Nodejs", "favouriteFood":"Pounded yam and egusi with goatmeat"},
            {"id":5,"name":"Emmanuel","class":"Nodejs", "favouriteFood":"yam and egg"},
        ]
     })
}



module.exports = {userSignup,renderuserpage}