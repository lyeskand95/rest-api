const express = require('express');
const app = express();
var Mongoose=require('mongoose');
let port=8000 || env.PORT ;
require('dotenv').config({path:'./config/.env'})
var user=require('./model/user.model');
app.use(express.json())


app.listen(port,()=>{
    Mongoose.connect( process.env.DATABASE )
    .then(()=>{
        console.log(" connected to db :" + process.env.DATABASE)
    })
    .catch((error)=>{
        console.log(error.message)
    });
    console.log('the server has started');
    //************************************************************************************/
    //GET :  RETURN ALL USERS 
    app.get('/users',(req,res)=>{
        console.log("list users")
        user.find().exec((err,user)=>{
            if(err) res.status(400).send(err);
            else res.status(200).json(user);
        })
    }) 

//*****************************************************************************************/
//POST :  ADD A NEW USER TO THE DATABASE 
app.post('/adduser',(req,res)=>{

    // const body=req.body
    let newuser=new user({lastname: req.body.lastname,firstname: req.body.firstname ,age:req.body.age })
    console.log("new user");
    
    newuser.save((err,user)=>{
        if(err) res.status(400).send(" error adding");
        else res.status(200).json(user);
    })
})
//*******************************************************************************************/
//  PUT : EDIT A USER BY ID 
app.put('/updateById',(req,res)=>{
    console.log("update person by ID")
    user.findById("6352815f6c7631e9648bb65a")
    .then(userId=>{
        userId.lastname = 'zaki'
        userId.save().then(user=>res.send(user))
    })
})
//*********************************************************************************************/
//DELETE : REMOVE A USER BY ID 
app.delete('/remove',(req,res)=>{
    console.log("remove")    
    user.deleteMany({_id:"6352815f6c7631e9648bb65a"}).exec((err,user)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(user);
    })
})

})
