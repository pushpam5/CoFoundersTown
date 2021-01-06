const mongoose=require('mongoose')
const express=require('express')
const app=express.Router()
const router=express.Router()
const bodyParser=require('body-parser')

app.use(bodyParser.json())

const auth=require('../middleware/auth')
const {Blogs,blogValidate} = require('../models/blog')

router.post('/',auth,async(req,res)=>{
    var det = {
        'title' : req.body.title,
        'tags' : req.body.tags,
        'content' : req.body.content
    }
    console.log(det);
    const { error } = blogValidate(det)
    if (error) {
        const errdet = {
            message: error.details[0].message,
            count: 1
        }
        console.log(error.details[0].message)
        return res.status(404).send(errdet)
    }
    let details = new Blogs({
        title: req.body.title,
        tags : req.body.tags,
        content : req.body.content
    });
    await details.save();
    return res.status(200).send(details);
});

module.exports=router;
