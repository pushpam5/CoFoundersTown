const mongoose=require('mongoose')
const express=require('express')
const app=express.Router()
const router=express.Router()
const bodyParser=require('body-parser')

app.use(bodyParser.json())

const {Blogs} = require('../models/blog');
router.get('/',async(req,res) => {
    const details = await Blogs.find().sort({Date : - 1});
    
    res.send(details);
});

module.exports = router;