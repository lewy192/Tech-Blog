const router = require("express").Router();

const { Comment, Post, User } = require("../models");

router.get("/:id", async (req, res) => {
    try {
        const { id: postId } = req.params;
        const requestedPost = await Post.findOne({
            where: { id: postId },
            include: [{ model: Comment }, { model: User }],
        });
        const post = requestedPost.get({ plain: true });
        const { Comments: comments } = post;
        const { id: sessiondUserId } = req.session;
        const { userId } = requestedPost;
        const isPostOwner = sessiondUserId === userId;
        res.status(200);
        res.render("post", { post, comments, isPostOwner });
    } catch (err) {
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});

router.get("/create", async (req, res) => {
    try {
        const { loggedIn } = req.session;
        req.render("newpost", { loggedIn });
    } catch (err) {}
});

module.exports = router;
