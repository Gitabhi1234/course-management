const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const courseModel = require("../models/course-model");
const groupModel = require("../models/group-model");
const bcrypt = require("bcrypt");


exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname, role } = req.body;
        if (role === "admin") {
            let owners = await ownerModel.find();
            if (owners>10) {
                req.flash("error","you can not create an account ");
                return res.redirect("/");
            }
            let owner = await ownerModel.findOne({ email: email });
            if (owner) {
                req.flash("error","you have an account please ,login ");
                return res.redirect("/");
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) {
                        return res.send(err.message);
                    }
                    else {
                        let createdOwner = await ownerModel.create({
                            email,
                            password: hash,
                            fullname,
                            role,
                        });

                        let groups=await groupModel.find();
                        let token = generateToken({ user: createdOwner });
                        res.cookie("token", token);
                        return res.redirect("/home");
                    }
                });
            });
        }
        else {
            let user = await userModel.findOne({ email: email });
            if (user) {
                req.flash("you have an account please ,login ");
                return res.redirect("/homeUser");
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) {
                        return res.send(err.message);
                    }
                    else {
                        let user = await userModel.create({
                            email,
                            password: hash,
                            fullname,
                        });


                        let token = generateToken(user);
                        res.cookie("token", token);
                         return res.redirect("/homeUser");
                    }
                });
            });
        }

        } catch (err) {
            res.send(err.message);
        }
    };

exports.loginUser = async function (req, res) {
    try {
        let { email, password,role } = req.body;
        if (role === "admin") {
        let groups=await groupModel.find();
        let user = await ownerModel.findOne({ email: email });
        if (!user) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect('/');
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true });
                req.flash("success","owner login successfully")
                return res.redirect("/home");
            }
            else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect('/');
            }
        });
    }
    else{
        let groups=await groupModel.find();
        let user = await userModel.findOne({ email: email });
        if (!user) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect('/');
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true });
                req.flash("success","user login successfully")
                return res.redirect("/homeUser");
            }
            else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect('/');
            }
        });
    }
    } catch (err) {
        res.send(err.message);
    }
};
exports.logoutUser = async function (req, res) {
    res.cookie("token", "");
    res.redirect('/');
};
exports.allCourses = async function (req, res) {
    try {
        const year = req.params.year;
        let groups=await groupModel.find();
        let courses = await courseModel.find({ year: year });;
        let user = await userModel.findOne();
        if (!courses) {
            req.flash("success",'Year not found');
            return res.redirect("/home");
        }
        res.render('year', { year, courses,groups,user });
    } catch (error) {
        res.send(error.message);
    }
};



