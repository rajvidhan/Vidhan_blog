
const express = require('express')

const router = express.Router();
const { createComment, AllComments, UserData, likeComment, EditComment, DeleteComment, AllCommentsofPost } = require('../controllers/comment-controller');
const {auth} = require("../middleware/auth");


router.post("/create-comment",auth,createComment)
router.get("/allcomments/:postId",AllCommentsofPost)
router.get("/userdetails/:userId",UserData);
router.put("/likeComment/:commentId",auth,likeComment)
router.put("/edit-comment",auth,EditComment)
router.delete("/delete-comment",DeleteComment)
router.get("/All-comments",AllComments)




module.exports = router;








