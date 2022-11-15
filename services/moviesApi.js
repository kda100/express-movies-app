const axios = require("axios");

const baseUrl = "https://api.themoviedb.org/3/movie";
const baseImageUrl = "https://image.tmdb.org/t/p/original";

const singleMovieProperties = ["id", "adult", "poster_path", "homepage", "title", "overview", "release_date", "vote_average"];
const multiMovieProperties = ["id", "overview", "poster_path", "title", "vote_average"];

function reduceMovieData(movieData, selectedProperties) {
    return selectedProperties.reduce(function (newMovieData, key) {
        if (key in movieData) {
            if (key === "poster_path") {
                newMovieData[key] = `${baseImageUrl}${movieData[key]}`;
            } else {
                newMovieData[key] = movieData[key];
            }
            return newMovieData;
        }
    }, {});
}

exports.getMoviesList = async (request) => {
    const res = await axios.get(`${baseUrl}${request}?api_key=${process.env.API_KEY}`);
    const moviesList = res.data.results.map(movieData => {
        return reduceMovieData(movieData, multiMovieProperties);
    });
    return moviesList;
}

exports.getMovie = async (id) => {
    const res = await axios.get(`${baseUrl}${id}?api_key=${process.env.API_KEY}`);
    return reduceMovieData(res.data, singleMovieProperties);
}

exports.getFavouriteMovie = async (id) => {
    const res = await axios.get(`${baseUrl}${id}?api_key=${process.env.API_KEY}`);
    return reduceMovieData(res.data, multiMovieProperties);
}
