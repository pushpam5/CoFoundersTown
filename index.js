const express = require('express')
const app = express()
const mongoose = require('mongoose')

const signup=require('./routes/signup');
const login = require('./routes/login');
const addblog = require('./routes/addblog')
const getblog = require('./routes/getblogs');
const updateblog = require('./routes/updateblog');

app.use(express.json());


app.use('/api/signup',signup);
app.use('/api/login',login);
app.use('/api/publish',addblog);
app.use('/api/getblog',getblog);
app.use('/api/updateblog',updateblog);

mongoose.connect('mongodb+srv://blogger:blogger@cluster0.ja0yh.mongodb.net/blog?retryWrites=true&w=majority',{useNewUrlParser : true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected To Blogger")
}).catch(err=>console.error("Error Connecting Blogger"));

module.exports=mongoose;

var port = process.env.port || 8080;

app.listen(port,()=>{
    console.log(`Connected to ${port}`);
})