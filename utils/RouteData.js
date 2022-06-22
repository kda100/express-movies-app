class RouteData {
    constructor (pageRoute, pageTitle, navTitle, authed) {
        this.pageRoute = pageRoute;
        this.pageTitle = pageTitle;
        this.navTitle = navTitle;
        this.authed = authed;
    }
}

module.exports = RouteData;