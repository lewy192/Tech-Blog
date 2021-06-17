const router = require("express").Router();
const bcrypt = require("bcrypt");
const errLoggger = require("../../utils/errlog");
const User = require("../../models/User");
require("dotenv").config();

router.post("/login", async (req, res) => {
    const { username, password: passwordToCheck } = req.body;
    try {
        const userLogin = await User.findOne({
            where: { username: username },
        });
        if (!userLogin.checkPassword(passwordToCheck)) {
            detailsIncorrect = true;
            res.render("login", { detailsIncorrect });
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            loggedIn = true;
            res.render("homepage", { loggedIn });
        });
    } catch (err) {
        // errLoggger.errorLogging(err);
        console.log(err);
        res.status(500);
    }
});

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const {
            firstName,
            lastName,
            email,
            username,
            enteredPassword,
            confirmPassword,
        } = req.body;
        console.log([firstName, lastName, enteredPassword, email, username]);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(enteredPassword, salt);

        const newUser = await User.create({
            username,
            email,
            firstName,
            lastName,
            password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            loggedIn = true;
            res.status(200).render("homepage", { loggedIn });
        });
    } catch (err) {
        console.log(err);
        // errLoggger.errorLogging(err);
        res.status(500);
    }
});

module.exports = router;
