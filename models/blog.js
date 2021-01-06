const mongoose=require('mongoose')
const Joi=require('../node_modules/joi')

const blogSchema = new mongoose.Schema({

    title : {
        type:String,
        required : true
    },
    tags : {
        type : [],
        required : true
    },
    content : {
        type: String,
        required:true,
        minlength:1
    },
    Date:{
        type:Date,
        default:Date.now()
    }
});

const Blogs = mongoose.model('Blogs',blogSchema);

function  blogValidate(input) {
    const Schema = Joi.object({
        title : Joi.string().required(),
        tags : Joi.required(),
        content :Joi.string().required()        
    });
    return Schema.validate(input)
}
blogSchema.set('timestamps',true);
exports.Blogs = Blogs ;
exports.blogSchema = blogSchema;
exports.blogValidate = blogValidate;