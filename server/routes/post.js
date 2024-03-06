const express = require('express')

const router = express.Router();
const {auth} = require("../middleware/auth");
const { createPost, uploadimage, fetchAllPosts, deletePost, fetchPreData, updatepost } = require('../controllers/post.controller');




router.post("/create-post",auth,createPost);
router.post("/upload-image",uploadimage);
router.get("/getAllPosts",auth,fetchAllPosts);
router.delete("/deletePost",auth,deletePost);
router.post("/fetchpredata",auth,fetchPreData);
router.put("/updatePost",auth,updatepost);







module.exports = router