const mongoose = require('mongoose');
const { schema } = require('./blog');

// creating customer schema
const customerSchema = mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    address:[
        {
            address_line_1:{
                type:String,
            },
            address_line_2:{
                type:String
            },
            landmark:{
                type:String,
            },
            city:{
                type:String,
            },
            state:{
                type:String,
            },
            pincode:{
                type:Number,
            },
        }
    ],
    cart:[{
        product_id: mongoose.Schema.Types.ObjectId,
    }],
    orders:[{
        order_id:mongoose.Schema.Types.ObjectId,
    }],
    dob:{
        type:Date
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    }

});

// exporting model for customerSchema
module.exports =  mongoose.model("Customer", customerSchema);