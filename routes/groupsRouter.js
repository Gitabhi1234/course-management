 const express = require('express');
 const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedin');
 const { createGroup, joinGroup ,chatgroup} = require('../controllers/groupController');


 router.post("/add", isLoggedIn, createGroup); 
 router.post("/join", isLoggedIn,joinGroup); 
 router.get('/:groupname', chatgroup);

 module.exports = router;
