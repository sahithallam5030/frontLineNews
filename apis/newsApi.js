const exp=require('express');
const expressAsyncHandler = require('express-async-handler');
const newsApp=exp.Router();
require('dotenv').config();
const newsApi=require('newsapi')
const newsApiApp=new newsApi(process.env.NEWSAPIKEY);


newsApp.get('/getnews/:id',expressAsyncHandler(async(request,response)=>{
    let query=request.params;
    let newsResponse=await newsApiApp.v2.everything({q:query.id,sortBy:'publishedAt'});
    let articles=newsResponse.articles;
    response.send({message:"Success",payload:articles})
}))
module.exports=newsApp;