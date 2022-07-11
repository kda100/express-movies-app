const RouteData = require("../../utils/RouteData");

const register = new RouteData("/user/register", "Register", "Register", false);
const login = new RouteData("/user/login", "Login", "Login", false);
const logout = new RouteData("/user/logout", "Logout", "Logout", true);
const account = new RouteData("/user/account", "My Account Details", "Account", true);
const favourites = new RouteData("/user/favourites", "My Favourites", "Favourites", true);

module.exports = { register, login, favourites, account, logout };