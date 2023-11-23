const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage("Please provide a username with at least 4 characters."),
    check("username")
        .not()
        .isEmail()
        .withMessage("Username cannot be an email."),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    handleValidationErrors,
];

router.post("/", validateSignup, async (req, res) => {
    const { password, username } = req.body;
    const user = await User.signup({ username, password });

    await setTokenCookie(res, user);

    return res.json(user);
});

router.get("/", requireAuth, async (req, res) => {
    const users = await User.findAll();

    return res.json(users);
});

module.exports = router;
