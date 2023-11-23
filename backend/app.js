const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");
const { environment } = require("./config");
const isProduction = environment === "production";
const { createServer } = require("http");
const { Server } = require("socket.io");
const { authenticateSocket } = require("./utils/socket-auth.js");
const { Message } = require("./db/models");

const routes = require("./routes");
const app = express();
const server = createServer(app);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

const socketCors = isProduction && {
    cors: {
        origin: "whatever production frontend url is",
    },
};

app.use(routes);

const io = new Server(server, {
    ...socketCors,
});

io.use((socket, next) => authenticateSocket(socket, next));

io.on("connection", (socket) => {
    socket.on("chat", async (message) => {
        const { content } = message;

        const newMessage = await Message.create({
            content,
            userId: socket.user.id,
        });

        newMessage.dataValues.User = socket.user;

        io.emit("chat", newMessage);
    });

    socket.on("disconnect", () => {
        console.log("User diconnected");
    });
});

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = "Validation error";
        err.errors = errors;
        err.status = 400;
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = {
    app,
    server,
};
