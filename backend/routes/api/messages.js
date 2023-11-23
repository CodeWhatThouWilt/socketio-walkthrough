const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Message, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateMessage = [
    check("content")
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage("Cannot send an empty message"),
    handleValidationErrors,
];

router.post("/", requireAuth, validateMessage, async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    const message = await Message.create({
        userId,
        content,
    });

    message.dataValues.User = req.user;

    return res.json(message);
});

router.get("/", requireAuth, async (req, res) => {
    const messages = await Message.findAll({
        include: {
            model: User,
        },
    });

    res.json(messages);
});

module.exports = router;
