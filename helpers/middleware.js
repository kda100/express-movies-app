const { registerSchema } = require("./schemas");
const ExpressError = require("../utils/ExpressError");


exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to do that");
        console.log(res.locals.userRoutes.login);
        return res.redirect(res.locals.userRoutes.login.pageRoute);
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