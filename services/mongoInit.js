const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongo");

const dbUrl = process.env.DB_URL;
const sessionSecret = process.env.SESSION_SECRET;

mongoose.connect(dbUrl);

mongoose.connection.on("error", console.error.bind(console, "connection error:"))
    .once("open", () => {
        console.log("Database connected");
    });

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret: sessionSecret,
    touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
    console.log("Session store error", e);
});

exports.sessionConfig = {
    store,
    name: "session",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};