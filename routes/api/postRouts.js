const router = require("express").Router();

const { Comment, Post } = require("../../models");

const helpers = require("../../utils/helpers");
const errorMessage500 = "Whoops status 500. Try again soon";
router.get("/:id", async (req, res) => {
    try {
        const { id: postId } = req.params;
        const post = await Post.findOne({
            where: { id: postId },
            include: { model: Comment },
        });
        console.log(post);
    } catch (err) {
        res.status(500).send(errorMessage500);
    }
});

module.exports = router;
