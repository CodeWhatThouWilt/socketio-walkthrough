const { Message } = require("../db/models");

const handleChat = (io, socket) => {
    socket.on("chat", async (message) => {
        const { content } = message;

        const newMessage = await Message.create({
            userId: socket.user.id,
            content,
        });

        newMessage.dataValues.User = socket.user;

        io.emit("chat", newMessage);
    });
};

const handleUserOnline = (io, socket) => {
    socket.on("online", () => {
        const payload = {
            content: `${socket.user.username} is online!`,
            User: {
                username: "System",
            },
        };

        io.emit("chat", payload);
    });
};

module.exports = {
    handleChat,
    handleUserOnline,
};
