 const express =require('express');
 const router=express.Router();
 const isLoggedin=require('../middlewares/isLoggedin');
const ownerModel = require('../models/owner-model');
const userModel = require('../models/user-model');
const groupModel = require("../models/group-model");
const {downloadCourseFile}=require("../controllers/courseController")




 router.get("/",function(req,res){
  let error=req.flash("error");
  res.render("index",{error});
 });
 router.get("/home",async function(req,res){
    let groups = await groupModel.find();
    let user = await ownerModel.findOne();
    let success=req.flash("success");
    return res.render("home", {user,success, groups});

});
 
router.get("/homeUser",async function(req,res){
    let groups = await groupModel.find();
    let user = await userModel.findOne();
    let success=req.flash("success");
    
    return res.render("home", {user,success, groups});

});
 
 router.get("/users/logout", isLoggedin ,function(req,res){
    let error=req.flash("error");
     res.render("index",{error});
 });
 router.get("/courses/download/:subject_name",downloadCourseFile);

 

 

 module.exports=router;