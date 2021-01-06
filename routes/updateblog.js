const express = require('express')
const router = express.Router()
const bodyParser = require('../node_modules/body-parser')
const mongoose=require('mongoose')

var app=express();

app.use(bodyParser.json())

const auth=require('../middleware/auth')
const {Blogs,blogValidate} = require('../models/blog')

router.put('/',auth,async(req,res) => {

    var det = {
        'title' : req.body.title,
        'tags' : req.body.tags,
        'content' : req.body.content
    }
    const { error } = blogValidate(det)
    if (error) {
        const errdet = {
            message: error.details[0].message,
            count: 1
        }
        console.log(error.details[0].message)
        return res.status(404).send(errdet)
    }
    let details =await Blogs.findById(req.body._id);
    if(details){
        details.content = req.body.content;
        if(req.body.tags.length != 0)
            details.tags = req.body.tags;
        console.log(details);
        await details.save();
        return res.status(200).send(details);
    }
    else{
        res.status(400).send("No Such Blog Exists")
    }
    
})
module.exports = router;
