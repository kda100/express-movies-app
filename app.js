if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const ejsmate = require("ejs-mate");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const sassMiddleware = require("node-sass-middleware");
const movieRoutes = require('./routes/movieRoutes');

const app = express();

const port = process.env.PORT || 3000;

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(sassMiddleware({
    src: path.join(__dirname, "bootstrap"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true,
    sourceMap: true,
    debug: true,
    prefix: "/"
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', movieRoutes);

app.get("/", (req, res, next) => {
    res.redirect("/movies/now_playing");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Something went wrong!";
    }
    console.log(err.message);
    res.status(statusCode).render("error", { err });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
