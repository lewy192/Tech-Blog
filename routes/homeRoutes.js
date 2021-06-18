const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const errLoggger = require("../utils/errlog");

const errorMessage500 = "Whoops status 500. Try again soon";
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["username"] }],
        });
        const { loggedIn } = req.session;
        let posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.status(200);
        res.render("homepage", { loggedIn, posts });
    } catch (err) {
        // errLoggger.errorLogging(err);.
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});

router.get("/login", (req, res) => {
    const login = true;
    try {
        const { loggedIn } = req.session;
        if (loggedIn) {
            res.status(200).redirect("/");
        }
        res.status(200);
        res.render("credentials", { login });
    } catch (err) {
        // errLoggger.errorLogging(err);
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});

router.get("/signup", (req, res) => {
    const login = false;
    try {
        const { loggedIn } = req.session;
        if (loggedIn) {
            res.status(200).redirect("/");
        }
        res.status(200);
        res.render("credentials", { login });
    } catch (err) {
        // errLoggger.errorLogging(err);
        console.log(err);

        res.status(500).send(errorMessage500);
    }
});

router.get("/dashboard", async (req, res) => {
    try {
        const { loggedIn } = req.session;
        const { userId: currentUserId } = req.session;
        const usersPosts = await Post.findAll({
            where: { userId: currentUserId },
            include: [{ model: Comment }, { model: User }],
            // attributes: { exclude: ["password"] },
        });
        const posts = usersPosts.map((post) => post.get({ plain: true }));
        res.status(200);
        res.render("dashboard", { posts, loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});

router.get("/logout", async (req, res) => {
    try {
        const { loggedIn } = req.session;
        if (loggedIn) {
            req.session.destroy();
            res.status(200);
            res.render("homepage", { loggedIn });
        }
        res.status(404);
    } catch (err) {
        console.log(err);
        res.status(500).send(errorMessage500);
    }
});
module.exports = router;
