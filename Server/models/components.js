const mongoose = require('mongoose');

/**
 * components data Schema
 */

const {Schema} = mongoose;
const compData = new Schema(
    {
        name : {
            type: String,
            required: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            max:255,
            min:6,
            trim:true,
        },
        phone:{
            type: String,
            min:10,
            max:12
        },
        compCategory:{
            type:String,
            enum:['cat01','cat02','cat03'],
            default:'cat01'
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('componentsData', compData );