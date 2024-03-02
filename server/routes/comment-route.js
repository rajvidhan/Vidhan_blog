
const express = require('express')

const router = express.Router();
const { createComment, AllComments, UserData } = require('../controllers/comment-controller');
const {auth} = require("../middleware/auth");


router.post("/create-comment",auth,createComment)
router.get("/allcomments/:postId",AllComments)
router.get("/userdetails/:userId",UserData);

module.exports = router;








