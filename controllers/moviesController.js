const axios = require("axios");
const RouteData = require("../models/routeData");

const baseUrl = "https://api.themoviedb.org/3/movie/";

function reduceMovieData(movieData, selectedProperties) {
    return selectedProperties.reduce(function (newMovieData, key) {
        if (key in movieData) {
            if (key === "poster_path") {
                newMovieData[key] = `https://image.tmdb.org/t/p/original${movieData[key]}`;
            } else {
                newMovieData[key] = movieData[key];
            }
            return newMovieData;
        }
    }, {});
}

async function getMoviesList(request) {
    const res = await axios.get(`${baseUrl}${request}?api_key=${process.env.API_KEY}`);
    const selectedProperties = ["id", "overview", "poster_path", "title", "vote_average"];
    const moviesList = res.data.results.map(movieData => {
        return reduceMovieData(movieData, selectedProperties);
    });
    return moviesList;
}

async function getMovie(id) {
    const res = await axios.get(`${baseUrl}${id}?api_key=${process.env.API_KEY}`);
    const selectedProperties = ["adult", "poster_path", "homepage", "title", "overview", "release_date", "vote_average"];
    return reduceMovieData(res.data, selectedProperties);
}

exports.renderMoviesNowPlaying = async (req, res) => {
    const movies = (await getMoviesList("now_playing"));
    console.log(movies);
    res.render("movies/index", { currRouteData: res.locals.routes.nowPlaying, movies });
}

exports.renderMoviesPopular = async (req, res) => {
    const movies = (await getMoviesList("popular"));
    console.log(movies);
    res.render("movies/index", { currRouteData: res.locals.routes.popular, movies });
}

exports.renderMoviesTopRated = async (req, res) => {
    const movies = (await getMoviesList("top_rated"));
    console.log(movies);
    res.render("movies/index", { currRouteData: res.locals.routes.topRated, movies });
}

exports.renderMoviesUpcoming = async (req, res) => {
    const movies = (await getMoviesList("upcoming"));
    console.log(movies);
    res.render("movies/index", { currRouteData: res.locals.routes.upcoming, movies });
}

exports.renderMovie = async (req, res) => {
    const movie = await getMovie(req.params.id);
    console.log(movie);
    res.render("movies/show", { movie });
}