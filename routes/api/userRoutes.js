const router = require("express").Router();
const bcrypt = require("bcryptjs");
const errLoggger = require("../utils/errlog");
const User = require("../../models/User");
require("dotenv").config();

router.post("/login", (req, res) => {});

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
            res.status(200).render("homepage", { loggedIn });
        });
    } catch (err) {
        errLoggger.errorLogging(err);
        res.status(500);
    }
});
