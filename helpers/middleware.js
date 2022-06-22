const { registerSchema } = require("./schemas");
const ExpressError = require("../utils/ExpressError");


exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to do that");
        return res.redirect(res.locals.movieRoutes.nowPlaying)
    }
    next();
}

exports.validateRegisterDetails = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError(error.message, 400);
    } else {
        next();
    }
}