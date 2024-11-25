 const express = require('express');
 const router = express.Router();
 const upload=require("../config/multer-config");
 const {createCourse}=require("../controllers/courseController")

 router.post('/create',upload.fields([{name:"image"},{name:"file"}]),createCourse);
 

 module.exports = router;
