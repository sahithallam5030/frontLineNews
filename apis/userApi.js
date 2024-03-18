//import modules 
const exp=require('express');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler');
const userApp=exp.Router();
userApp.use(exp.json())

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
    let hashedPassword=await bcryptjs.hash(userObject.password,6);
    userObject.password=hashedPassword;
    //add user to database
    await usercollection.insertOne(userObject);
    response.send({message:"Account Created Successfully"})
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