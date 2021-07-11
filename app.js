const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));





mongoose.connect("mongodb://localhost:27017/esterDB" ,{useNewUrlParser:true});

const customerSchema = new mongoose.Schema({
  fname:String,
  lname:String,
  email:String,
  password:String
},
{ typeKey: '$type' }
);



const customer = mongoose.model("customer",customerSchema);


app.get("/",function(req,res){
  res.render("login");
})

app.get("/signup",function(req,res){
  res.render("Signup");
})



app.post("/signup",function(req,res){

   const newCustomer = new customer({
      fname:req.body.firstName,
      lname:req.body.lasttName,
      email:req.body.email,
      password:req.body.password


   });
   newCustomer.save();
   res.redirect("/signup");

   app.post("/",function(req,res){
     const Email = req.body.email;
     const Password = req.body.password;

     customer.findOne({email: Email},function(err,foundUser){
       if(err){
         console.log(err);
       }
       else{
         if(foundUser){
           if(foundUser.password == Password){
             res.render("dashboard");
           }
         }
       }
     })
   })


});

app.listen(3000,function(){
  console.log("Server is running on PORT 3000");
})
