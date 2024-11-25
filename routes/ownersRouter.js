const express = require('express');
const router = express.Router();
const {allCourses} = require('../controllers/ownerController');  
const isLoggedinowner=require('../middlewares/isLoggedinowner');
router.get("/admin",isLoggedinowner, function(req,res){
    let success=  req.flash("success");
    res.render("addMaterial",{success});
    
});
router.get('/:year',allCourses);


 module.exports = router;
