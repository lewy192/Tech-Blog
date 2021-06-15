const router = require("express").Router();

const errLoggger = require("../utils/errlog");

router.get("/", async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render("homepage", { logged_in: true });
        }
        res.status(200);
        res.render("homepage", { logged_in: false });
    } catch (err) {
        errLoggger.errorLogging(err);
        res.status(500);
    }
});
