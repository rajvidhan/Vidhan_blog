//Import the require modules
const express = require("express");
const { updateProfile, deleteUser, GetUsers, DeleteUserByAdmin } = require("../controllers/user.controller");
const router = express.Router();
const {auth} = require("../middleware/auth")

router.put("/update-profile",auth,updateProfile);
router.delete("/delete-profile",auth,deleteUser);
router.get("/getUsers",auth,GetUsers);
router.delete("/deleteUser",auth,DeleteUserByAdmin);




module.exports = router