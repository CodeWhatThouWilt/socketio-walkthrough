"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        toSafeObject() {
            const { id, username } = this;
            return { id, username };
        }

        static associate(models) {
            User.hasMany(models.Message, { foreignKey: "userId" });
        }

        validatePassword(password) {
            return bcrypt.compareSync(password, this.hashedPassword.toString());
        }

        static getCurrentUserById(id) {
            return User.scope("currentUser").findByPk(id);
        }

        static async login({ credential, password }) {
            const user = await User.scope("loginUser").findOne({
                where: {
                    username: credential,
                },
            });
            if (user && user.validatePassword(password)) {
                return await User.scope("currentUser").findByPk(user.id);
            }
        }

        static async signup({ username, password }) {
            const hashedPassword = bcrypt.hashSync(password);
            const user = await User.create({
                username,
                hashedPassword,
            });
            return await User.scope("currentUser").findByPk(user.id);
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [4, 30],
                    isNotEmail(value) {
                        if (Validator.isEmail(value)) {
                            throw new Error("Cannot be an email.");
                        }
                    },
                },
            },
            hashedPassword: {
                type: DataTypes.STRING.BINARY,
                allowNull: false,
                validate: {
                    len: [60, 60],
                },
            },
        },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: ["hashedPassword", "createdAt", "updatedAt"],
                },
            },
            scopes: {
                currentUser: {
                    attributes: { exclude: ["hashedPassword"] },
                },
                loginUser: {
                    attributes: {},
                },
            },
        }
    );
    return User;
};
