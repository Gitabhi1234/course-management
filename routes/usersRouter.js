const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logoutUser,allCourses} = require('../controllers/authController');  

router.get('/',function(req,res){
    res.send("its working");
});
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/:year',allCourses);


module.exports=router;

      