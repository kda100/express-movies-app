const RouteData = require("../../utils/RouteData");

const nowPlaying = new RouteData("/movies/now_playing", "Now In Cinema", "Now Playing");
const popular = new RouteData("/movies/popular", "Current Most Popular", "Popular");
const topRated = new RouteData("/movies/top_rated", "All Time Top Rated", "Top Rated");
const upcoming = new RouteData("/movies/upcoming", "Coming Soon...", "Upcoming");

module.exports = { nowPlaying, popular, topRated, upcoming };