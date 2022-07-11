const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const catchAsync = require('../../utils/catchAsync');
const methodOverride = require('method-override');
const passport = require("passport");
const { validateRegisterDetails, isLoggedIn } = require("../../helpers/middleware");

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'));

router.route("/register")
    .get(userController.renderRegisterForm)
    .post(validateRegisterDetails, catchAsync(userController.register));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/user/login" }),
        catchAsync(userController.login));

router.route("/logout")
    .get(catchAsync(userController.logout));

router.route("/account").get(isLoggedIn, catchAsync(userController.renderAccountDetails));

router.route("/favourites")
    .get(isLoggedIn, catchAsync(userController.renderFavourites))

router.route("/favourites/:id").put(isLoggedIn, catchAsync(userController.toggleFavourite));

module.exports = router;