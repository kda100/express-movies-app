if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const ejsmate = require("ejs-mate");
const sassMiddleware = require("node-sass-middleware");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

const ExpressError = require("./utils/ExpressError");
const mongoInit = require("./databases/mongoInit");
require("./auth/passportInit");

const movieRoutesData = require("./routes/movieRoutes/movieRoutesData");
const userRoutesData = require("./routes/userRoutes/userRoutesData")

const movieRoutes = require('./routes/movieRoutes/movieRoutes');
const userRoutes = require("./routes/userRoutes/userRoutes");

const app = express();

const port = process.env.PORT || 3000;

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.createFormField = require("./public/javascripts/createFormField");
app.locals.createNavLink = require("./public/javascripts/createNavLink");

app.use(sassMiddleware({
    src: path.join(__dirname, "bootstrap"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true,
    sourceMap: true,
    debug: true,
    prefix: "/"
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session(mongoInit.sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
    res.locals.movieRoutes = {
        nowPlaying: movieRoutesData.nowPlayingRouteData,
        popular: movieRoutesData.popularRouteData,
        topRated: movieRoutesData.topRatedRouteData,
        upcoming: movieRoutesData.upcomingRouteData
    };
    res.locals.userRoutes = {
        login: userRoutesData.loginRouteData,
        register: userRoutesData.registerRouteData,
        account: userRoutesData.accountRouteData,
        logout: userRoutesData.logoutRouteData,
    }
    res.locals.currUser = req.user || null;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);
app.use('/movies', movieRoutes);


app.get("/", (req, res) => {
    res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
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
    res.status(statusCode).render("error", { currRouteData: null, err });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

