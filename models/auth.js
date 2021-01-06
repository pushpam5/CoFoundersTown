const Joi=require('joi');
const passwordComplexity=require('joi-password-complexity').default

function validateLogin(input){
    const complexityOptions = {
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 3,
    };
    const Schema=Joi.object({
        email:Joi.string().required(),
        password:new passwordComplexity(complexityOptions).required()
    });
    return Schema.validate(input);
}

exports.validateLogin=validateLogin