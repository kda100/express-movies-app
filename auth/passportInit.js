const LocalStrategy = require("passport-local");
const User = require("../models/user");
const passport = require("passport");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());