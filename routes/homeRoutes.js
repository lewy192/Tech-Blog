const router = require("express").Router();

const errLoggger = require("../utils/errlog");

router.get("/", (req, res) => {
    try {
        if (req.session.loggedIn) {
            console.log("here");
            res.status(200);
            res.render("homepage", { logged_in: true });
        }
        console.log("here 2");
        res.status(200);
        res.render("homepage");
        res.end();
    } catch (err) {
        // errLoggger.errorLogging(err);
        console.log("here set head");
        res.status(500).send("whoops");
    }
});

router.get("/login", (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.status(200);
            res.render("homepage", { logged_in: loggedIn });
        }
        res.status(200);
        res.render("login", { logged_in: true });
    } catch (err) {
        // errLoggger.errorLogging(err);
        res.status(500).send("whoops");
    }
});

router.get("/signup", (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.status(200);
            res.render("homepage", { logged_in: loggedIn });
        }
        res.status(200);
        res.render("signup");
    } catch (err) {
        // errLoggger.errorLogging(err);
        res.status(500).send("whoops");
    }
});

module.exports = router;
