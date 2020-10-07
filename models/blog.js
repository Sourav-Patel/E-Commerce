const mongoose = require('mongoose');

// Creating blog schema for DB 
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    thumbImage:String,
    Images:[{url: String}],
    body:{
        type:String,
        required:true
    }
});

// exporting model for blogSchema
module.exports =  mongoose.model("Blog", blogSchema);