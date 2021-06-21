const router = require("express").Router();

const { Comment, Post, User } = require("../../models");

const helpers = require("../../utils/helpers");

const withAuth = require("../../utils/auth");

const errorMessage500 = "Whoops status 500. Try again soon";

router.post("/create", withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const { userId } = req.session;
        const { postTitle, postContent } = req.body;
        const newPost = await Post.create({ postTitle, postContent, userId });
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const { postTitle, postContent } = req.body;
        const { id: postId } = req.params;

        const updatedPost = await Post.update(
            { postTitle, postContent },
            { where: { id: postId } }
        );
        res.redirect(`/post/${postId}`);
        if (!updatedPost) {
            res.status(404).send(
                "You have tried to update a post that doesnt exist, please try anohter id."
            );
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(errorMessage500);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const { id: postId } = req.params;
        const deletedPost = await Post.destroy({ where: { id: postId } });
        if (!deletedPost) {
            res.status(404).send(
                "You have tried to update a post that doesnt exist, please try anohter id."
            );
        }
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(errorMessage500);
    }
});
module.exports = router;
