const router = require("express").Router();

const errLoggger = require("../utils/errlog");

const errorMessage500 = "Whoops status 500. Try again soon";
router.get("/", (req, res) => {
    try {
        const { loggedIn } = req.session;
        res.status(200);
        res.render("homepage", { loggedIn });
    } catch (err) {
        // errLoggger.errorLogging(err);.

        res.status(500).send(errorMessage500);
    }
});

router.get("/login", (req, res) => {
    try {
        const { loggedIn } = req.session;
        if (loggedIn) {
            res.status(200).render("homepage", { loggenIn });
        }
        res.status(200);
        res.render("login", { loggedIn });
    } catch (err) {
        // errLoggger.errorLogging(err);
        res.status(500).send(errorMessage500);
    }
});

router.get("/signup", (req, res) => {
    try {
        const { loggedIn } = req.session;
        if (loggedIn) {
            res.status(200).render("homepage", { loggenIn });
        }
        res.status(200);
        res.render("signup");
    } catch (err) {
        // errLoggger.errorLogging(err);
        res.status(500).send(errorMessage500);
    }
});

module.exports = router;
