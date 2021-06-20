const router = require("express").Router();

const { Comment, User, Post } = require("../../models");
const withAuth = require("../../utils/auth");
const errorMessage500 = "Whoops status 500. Try again soon";
router.post("/create/:id", withAuth, async (req, res) => {
    try {
        const { id: postId } = req.params;
        let { commentContent } = req.body;
        const { userId } = req.session;
        commentContent = commentContent.trim();
        const newComment = await Comment.create({
            commentContent,
            userId,
            postId,
        });
        res.status(200);
        res.redirect(`/post/${postId}`);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(errorMessage500);
    }
});

module.exports = router;
