const express = require('express');
const moviesController = require("../controllers/moviesController");
const catchAsync = require('../utils/catchAsync');
const movieRoutesData = require("../constants/movieRoutesData");

const router = express.Router();

router.use(function (req, res, next) {
    res.locals.routes = {
        nowPlaying: movieRoutesData.nowPlayingRouteData,
        popular: movieRoutesData.popularRouteData,
        topRated: movieRoutesData.topRatedRouteData,
        upcoming: movieRoutesData.upcomingRouteData
    };
    next();
});

router.route("/now_playing").get(catchAsync(moviesController.renderMoviesNowPlaying));

router.route("/popular").get(catchAsync(moviesController.renderMoviesPopular));

router.route("/top_rated").get(catchAsync(moviesController.renderMoviesTopRated));

router.route("/upcoming").get(catchAsync(moviesController.renderMoviesUpcoming));

router.route("/:id").get(catchAsync(moviesController.renderMovie))

module.exports = router;