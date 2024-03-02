
const express = require('express')

const router = express.Router();
const { createComment, AllComments, UserData, likeComment } = require('../controllers/comment-controller');
const {auth} = require("../middleware/auth");


router.post("/create-comment",auth,createComment)
router.get("/allcomments/:postId",AllComments)
router.get("/userdetails/:userId",UserData);
router.put("/likeComment/:commentId",auth,likeComment)



module.exports = router;








