const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const axios = require ('axios');

const schema = new mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],

    group:{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },

    date:{
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
              return value > Date.now();
            },
            message: 'The event date is in the past, please enter a valid date'
          }
    },

    location:{
        type: String,
        required: true,
        // validate: {
        //     validator: async (value) => {
        //       try {
        //         const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}`);
        //         if (response.data.status === 'OK') {
        //           return true;
        //         } else {
        //           return false;
        //         }
        //       } catch (error) {
        //         console.error(error);
        //         return false;
        //       }
        //     },
        //     message: 'Invalid location'
        //   }

    },
});

function validateEvent(event) {
    const schema = {
      eventName: Joi.string().required(),  
      participants: Joi.array().items(Joi.string()),
      group: Joi.string().required() ,
      date: Joi.date().min(Date.now()),
    };
    return Joi.validate(event, schema);
  };

  const Event = new mongoose.model('events', schema);

module.exports.Event = Event;
module.exports.validateEvent = validateEvent;