//import modules
const exp=require('express');
const mclient=require('mongodb').MongoClient
const userApi=require('./apis/userApi');
const newsApi = require('./apis/newsApi');
require('dotenv').config()
const app=exp();
app.use(exp.json())


//connect to database
mclient.connect(process.env.DATABASE_URL)
.then((client)=>{
    let database=client.db('frontlinenews');
    let usercollection=database.collection('usercollection');
    app.set('usercollection',usercollection)
    console.log("Database connection Success")
})
.catch((error)=>{
    console.log("Error in connecting to database",error)
})

app.use('/users',userApi);
app.use('/news',newsApi)

app.use((request,response,next)=>{
    response.send({message:"Invalid/Bad Request"})
})
app.use((error,request,response,next)=>{
    response.send({message:`Error occurred : ${error.message}`})
})
app.listen(process.env.PORT,()=>{
    console.log("Server listening to port:",process.env.PORT)
})