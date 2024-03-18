const jwt=require('jsonwebtoken')
require('dotenv').config();

let verifyToken=(request,response,next)=>{
    let userObject=request.body;
    let token=userObject.token;
    try{
        jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch(err){
        response.send({message:"Session Expired"});
    }
}
module.exports=verifyToken;