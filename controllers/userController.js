const User = require("../models/user");

exports.renderRegisterForm = async (req, res) => {
    res.render("userViews/register", { currRouteData: res.locals.userRoutes.register });
}

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Registration successful");
            res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect(res.locals.userRoutes.register.pageRoute);
    }
}

exports.renderLoginForm = async (req, res) => {
    res.render("userViews/login", { currRouteData: res.locals.userRoutes.login });
}

exports.login = async (req, res) => {
    req.flash("success", "Login successful");
    res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
}

exports.logout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout successful");
        res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
    });
}

exports.account = async (req, res) => {
    if (req.user) {
        res.render("userViews/account", { currRouteData: res.locals.userRoutes.account.pageRoute });
    } else {
        res.redirect(res.locals.userRoutes.login.pageRoute);
    }
}