const mongoose=require('mongoose')
const express=require('express')
const hashpassword=require('../node_modules/password-hash')
const config=require('../node_modules/config')
const jwt=require('../node_modules/jsonwebtoken')
const router=express.Router()
const bodyparser=require('../node_modules/body-parser')

const {SignUp}=require('../models/signup');
const {validateLogin} =require('../models/auth')
var app=express();

// mongoose.set('useFindAndModify', false);
app.use(bodyparser.json());

router.post('/',async(req,res)=>{
    const {error}=validateLogin(req.body)
    if(error){
        const errdet={
            message:'Credentials Doesn\'t Match',
            count:1
        }
        console.log(errdet.count)
    return res.status(404).send(errdet)
    }
    let details=await SignUp.findOne({email:req.body.email})
    if(!details){
    console.log("User Not Registered");
     return res.status(400).json({message:'User not Registered'})
    }
    // var pass=hashpassword.generate(req.body.password)
    const verifypass=hashpassword.verify(req.body.password,details.password)
    if(verifypass){
        console.log("Logged In")
        const token=jwt.sign({
            _id:details._id
        },config.get('jwtPrivateKey'))
        res.header('x-auth-token',token).status(200).send({token:token,message:"Logged in Successfully"})
    }
    else{
        console.log("Password Doesn't Match");
         return res.status(400).json({message:'Email or Password Incorrect'})
    }   
})
module.exports=router;