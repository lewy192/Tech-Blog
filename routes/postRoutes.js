const router = require("express").Router();

const { Comment, Post, User } = require("../models");
const errorMessage500 = "Whoops status 500. Try again soon";
router.get("/:id", async (req, res) => {
    try {
        console.log(req.session);
        const { loggedIn, userId: sessiondUserId } = req.session;
        const { id: postId } = req.params;
        const requestedPost = await Post.findOne({
            where: { id: postId },
            include: [
                { model: User, attributes: ["username"] },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ["username"] }],
                },
            ],
        });
        const post = requestedPost.get({ plain: true });

        const { Comments: comments } = post;
        // console.log(post);
        const { userId } = requestedPost;

        const isPostOwner = sessiondUserId === userId;
        res.status(200);
        res.render("post", { post, comments, isPostOwner, loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});

module.exports = router;
