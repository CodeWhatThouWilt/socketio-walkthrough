"use strict";
const bcrypt = require("bcryptjs");

const { User } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = [
            {
                username: "Yake",
                hashedPassword: bcrypt.hashSync("password"),
            },
            {
                username: "Shmake",
                hashedPassword: bcrypt.hashSync("password2"),
            },
            {
                username: "YakeyPoo",
                hashedPassword: bcrypt.hashSync("password3"),
            },
            {
                username: "Demo",
                hashedPassword: bcrypt.hashSync("password"),
            },
        ];

        await User.bulkCreate(users, { validate: true });
    },

    down: async (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        await queryInterface.bulkDelete(
            "Users",
            {
                username: {
                    [Op.in]: ["Yake", "Schmake", "YakeyPoo"],
                },
            },
            {}
        );
    },
};
