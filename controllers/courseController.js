const courseModel = require('../models/course-model');

exports.createCourse = async function (req, res) {
  try {
    let { department_name, year, subject_name, bgcolor, panelcolor, textcolor } = req.body;
    let course = await courseModel.create({
      image:req.files?.image?.[0]?.buffer,
      file:req.files?.file?.[0]?.buffer,
      department_name,
      year,
      subject_name,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "course created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.message);
  }
};
exports.downloadCourseFile = async function (req, res) {
  try {
    const { subject_name } = req.params;

   
    const course = await courseModel.findOne({ subject_name });

    if (!course || !course.file) {
      req.flash("error", "File not found for this course");
      return res.redirect("/homeUser"); 
    }
    res.set({
      "Content-Disposition": `attachment; filename="${subject_name}.pdf"`, 
      "Content-Type": "application/pdf", 
    });

    // Send the file buffer
    res.send(course.file);
  } catch (error) {
    console.error("Error downloading file:", error.message);
    res.status(500).send("Error downloading file");
  }
};
