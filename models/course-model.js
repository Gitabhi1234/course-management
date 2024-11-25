const mongoose = require('mongoose');

const subSchema = mongoose.Schema({
  image: Buffer,
  file: Buffer, 
  year: String,
  department_name:String,
  subject_name: { type: String, required: true },
  bgcolor: { type: String, required: false },
  panelcolor: { type: String, required: false },
  textcolor: { type: String, required: false }
});

module.exports = mongoose.model("Course", subSchema);
