const router = require("express").Router();

const errLoggger = require("../utils/errlog");

router.get("/", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render("homepage", { logged_in: true });
        }
        res.status(200);
        res.render("homepage", { logged_in: false });
    } catch (err) {
        errLoggger.errorLogging(err);
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
        res.render("login");
    } catch (err) {
        errLoggger.errorLogging(err);
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
        errLoggger.errorLogging(err);
        res.status(500).send("whoops");
    }
});

module.exports = router;
