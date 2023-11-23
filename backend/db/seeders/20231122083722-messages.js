"use strict";

const { Message } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const messages = [
            {
                userId: 1,
                content: "Whats goooooood",
            },
            {
                userId: 2,
                content: "Helllllllllooooooo",
            },
            {
                userId: 3,
                content: "HAPPY MONDAY!!!!",
            },
        ];

        await Message.bulkCreate(messages, { validate: true });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Messages", null, {});
    },
};
