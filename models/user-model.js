const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: Number,
    picture: String,
    role: { type: String, enum: ['student', 'admin'], default: 'student' } 
});

module.exports = mongoose.model("user", userSchema);
