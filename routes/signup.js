const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()
const bodyParser = require('../node_modules/body-parser')
const passwordhash = require('../node_modules/password-hash')

const { signupValidate,SignUp} = require('../models/signup');
var app = express();
app.use(bodyParser.json())

router.post('/',async(req,res) => {
    console.log(req.body);

    const { error } = signupValidate(req.body)
    if (error) {
        const errdet = {
            message: error.details[0].message,
            count: 1
        }
        console.log(error.details[0].message)
        return res.status(404).send(errdet)
    }
    let details = await SignUp.findOne({email:req.body.email})
    if (details) {
        console.log("User Already Exist")
        return res.status(400).json({ message: 'User Already Exist' })
    }
    let usrnamedet = await SignUp.findOne({username : req.body.username});
    if(usrnamedet){
        console.log("Username Already Exist")
        return res.status(400).json({message: 'Username Already Exist'})
    }
    const customerdet = new SignUp({
        name: req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        age : req.body.age
    });
    customerdet.password = await passwordhash.generate(customerdet.password);
    await customerdet.save().then().catch(
        err => console.log(err)
    );
    res.status(200).send(customerdet);

});

module.exports = router;
