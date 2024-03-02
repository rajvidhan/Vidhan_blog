const express = require('express')

const router = express.Router();

// import function 
const {signUp, login, google} = require("../controllers/auth.controller")




router.post("/signup",signUp);
router.post("/login",login);
router.post("/google",google);




module.exports = router 