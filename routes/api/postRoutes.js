const router = require("express").Router();

const { Comment, Post, User } = require("../../models");

const helpers = require("../../utils/helpers");
const errorMessage500 = "Whoops status 500. Try again soon";

router.post("/create", async (req, res) => {
    try {
        const { userId } = req.session;
        const { postTitle, postContent } = req.body;
        const newPost = await Post.create({ postTitle, postContent, userId });
        res.render("dashboard", { userId });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
