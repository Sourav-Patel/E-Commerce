const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    address:[
        {
            address_line_1:{
                type:String,
                required:true
            },
            address_line_2:{
                type:String
            },
            landmark:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            pincode:{
                type:Number,
                required:true
            },
            default:{
                type:Boolean,
                unique:true
            }
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


module.exports =  mongoose.model("Customer", customerSchema);