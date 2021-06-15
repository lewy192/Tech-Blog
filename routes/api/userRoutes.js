const router = require("express").Router();
const bcrypt = require("bcryptjs");
const errLoggger = require("../utils/errlog");
const User = require("../../models/User");
const { log } = require("handlebars/runtime");
require("dotenv").config();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userLogin = await User.findOne({
            where: { usernamme: username },
        });
        const { password: userPassword } = userLogin;
        if (!userLogin.checkPassword(userPassword)) {
            correctDetails = false;
            res.render("login", { correctDetails });
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            loggedIn = true;
            res.render("homepage", { loggedIn });
        });
    } catch (err) {
        errLoggger.errorLogging(err);
        res.status(500);
    }
});

router.post("signup", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            username,
            enteredPassword,
            confirmPassword,
        } = req.body;

        const password = bcrypt.hashSync(enteredPassword, 10);

        const newUser = await User.create(
            username,
            email,
            firstName,
            lastName,
            password
        );
        req.session.save(() => {
            req.session.loggedIn = true;
            loggedIn = true;
            res.status(200).render("homepage", { loggedIn });
        });
    } catch (err) {
        errLoggger.errorLogging(err);
        res.status(500);
    }
});
