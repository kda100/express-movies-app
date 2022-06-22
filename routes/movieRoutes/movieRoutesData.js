const RouteData = require("../../utils/RouteData");

const nowPlayingRouteData = new RouteData("/movies/now_playing", "Now In Cinema", "Now Playing");
const popularRouteData = new RouteData("/movies/popular", "Current Most Popular", "Popular");
const topRatedRouteData = new RouteData("/movies/top_rated", "All Time Top Rated", "Top Rated");
const upcomingRouteData = new RouteData("/movies/upcoming", "Coming Soon...", "Upcoming");

module.exports = { nowPlayingRouteData, popularRouteData, topRatedRouteData, upcomingRouteData };