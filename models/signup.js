const mongoose = require('mongoose')
const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity').default

const signupSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
        minlength: 3

    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    username : {
        type:String,
        required : true,
        minlength : 3
    },
    age : {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },


});

const SignUp = mongoose.model('SignUp',signupSchema);
function signupValidate(input) {
    const complexityOptions = {
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
    };
    const Schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required(),
        username:Joi.string().required().min(3),
        age:Joi.required(),
        password : new PasswordComplexity(complexityOptions).required()
    });
    return Schema.validate(input);
}
exports.signupValidate = signupValidate;
exports.SignUp = SignUp;