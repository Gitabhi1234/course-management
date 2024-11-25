const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const courseModel = require("../models/course-model");
const groupModel = require("../models/group-model"); 

exports.allCourses = async function (req, res) {
    try {
        const year = req.params.year;
        let groups=await groupModel.find();
        let courses = await courseModel.find({ year: year });;
        let user = await ownerModel.findOne();
        
        if (!courses) {
            req.flash("success",'Year not found');
            return res.redirect("/home");
        }
        res.render('year', { year, courses,groups,user});
    } catch (error) {
        res.send(error.message);
    }
};



