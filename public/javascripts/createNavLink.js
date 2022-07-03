module.exports = function (routeData, currRouteData, currUser) {
    if (typeof routeData.authed === 'undefined' || (routeData.authed && currUser) || (!routeData.authed &&
        !currUser)) {
        return `<a class="nav-item nav-link ${typeof currRouteData !== 'undefined' && currRouteData === routeData
            ? " active" : ""}"
            href="${routeData.pageRoute}">
                ${routeData.navTitle}
        </a>`
    }
}