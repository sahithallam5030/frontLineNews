//import modules 
const exp=require('express');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler');
const verifyToken=require('../middleware/verifyToken')
const nodemailer=require('nodemailer');
const userApp=exp.Router();
require('dotenv').config();
userApp.use(exp.json())

const transporter=nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    auth:{
        user:process.env.USER,
        pass:process.env.PASSWORD
    }
});



userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
let usercollection=request.app.get('usercollection')
let userObject=request.body;
let userOfDatabase=await usercollection.findOne({email:userObject.email});
if(userOfDatabase!==null){
    //already a user
    response.send({message:"Email Already exists"})
}
else{
    //not a user
    let name=userObject.firstname+" "+userObject.lastname;
    const mailOptions={
        from:{
            name:"FrontLine-News",
            address:process.env.USER
        },
        to:userObject.email,
        subject:"Welcome to FrontLine-News- Your Breaking News Experience Begins Now!",
        html:`
            <h3>Dear ${name},</h3>
            <p>We are delighted to welcome you to the FrontLine-News!</p>
            <p>Thank you for entrusting Frontline-News. We're excited to contribute to your success, and we look forward to providing you with the news that keeps you stay updated.</p>
            <div>
                <div>Regards,</div>
                <div><b>Allam Sahith</b></div>
                <div>Founder | FrontLine-News</div>
            </div>`
    }


    let hashedPassword=await bcryptjs.hash(userObject.password,6);
    userObject.password=hashedPassword;
    //add user to database
    await usercollection.insertOne(userObject);
    try{
        await transporter.sendMail(mailOptions);
        console.log("Email has sent")
    }
    catch(error){
        console.log("Error in sending mail",error);
    }
    response.send({message:"Account Created Successfully"})
}
}))

userApp.post('/relogin',verifyToken,expressAsyncHandler(async(request,response)=>{
let usercollection=request.app.get('usercollection')    
let userObject=request.body;
let userOfDatabase=await usercollection.findOne({email:userObject.email});
if(userOfDatabase!==null){
    //already a user
    response.send({message:"Success",userObject:userOfDatabase});
}
}))


userApp.post('/login',expressAsyncHandler(async(request,response)=>{
let usercollection=request.app.get('usercollection')    
let userObject=request.body;
let userOfDatabase=await usercollection.findOne({email:userObject.email});
if(userOfDatabase!==null){
    //already a user
    let passwordMatch=await bcryptjs.compare(userObject.password,userOfDatabase.password);
    if(passwordMatch===true){
        //password is matched then generate token
        let token=jwt.sign(userOfDatabase,process.env.SECRET_KEY,{expiresIn:"1h"});
        response.send({message:"Success",payload:token,userObject:userOfDatabase});
    }
    else{
        response.send({message:"Incorrect password"})
    }
}
else{
    //not a user
    response.send({message:"Invalid User"})
}
}))

userApp.put('/update-user',expressAsyncHandler(async(request,response)=>{
 let usercollection=request.app.get('usercollection')   
 let userObject=request.body;
 let userOfDatabase=await usercollection.findOne({email:userObject.email});
 if(userOfDatabase!==null){
    //already a user
    let updates=userObject.updates;
    await usercollection.updateOne({email:userObject.email},{$set:updates});
    userOfDatabase=await usercollection.findOne({email:userObject.email})
    response.send({message:"Data Updated Successfully",userObject:userOfDatabase})
 }
 else{
    //not a user
    response.send({message:"Invalid User"});
 }
}))

userApp.delete('/delete-user',expressAsyncHandler(async(request,response)=>{
 let usercollection=request.app.get('usercollection')   
 let userObject=request.body;
 let userOfDatabase=await usercollection.findOne({email:userObject.email});
 if(userOfDatabase!==null){
    //already a user
    await usercollection.deleteOne({email:userObject.email});
    response.send({message:"Account Deleted Successfully"});
 }
 else{
    //not a user
    response.send({message:"Invalid User"});
 }
}))
module.exports=userApp;