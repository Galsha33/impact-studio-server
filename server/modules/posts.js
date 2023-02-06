const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    imageUrl:{
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 2,
    }
    
});

const Posts = new mongoose.model("Posts", schema);


function validatePost(posts) {
    const schema = {
      groupName: Joi.string().required()
    };
    return Joi.validate(posts, schema);
  };