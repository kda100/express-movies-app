const RouteData = require("../../utils/RouteData");

const registerRouteData = new RouteData("/register", "Register", "Register", false);
const loginRouteData = new RouteData("/login", "Login", "Login", false);
const logoutRouteData = new RouteData("/logout", "Logout", "Logout", true);
const accountRouteData = new RouteData("/account", "My Account Details", "My Account", true);

module.exports = { registerRouteData, loginRouteData, logoutRouteData, accountRouteData: accountRouteData };