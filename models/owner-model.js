const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: {
        type:String,
        minlength:3,
        trim:true
    },
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'admin'], default: 'Admin' } 
});

module.exports=mongoose.model("owner",ownerSchema);