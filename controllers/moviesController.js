const moviesApi = require("../services/moviesApi");

exports.renderMoviesNowPlaying = async (req, res) => {
  const movies = await moviesApi.getMoviesList("/now_playing");
  console.log(movies);
  res.render("movieViews/index", {
    currRouteData: res.locals.movieRoutes.nowPlaying,
    movies,
  });
};

exports.renderMoviesPopular = async (req, res) => {
  const movies = await moviesApi.getMoviesList("/popular");
  console.log(movies);
  res.render("movieViews/index", {
    currRouteData: res.locals.movieRoutes.popular,
    movies,
  });
};

exports.renderMoviesTopRated = async (req, res) => {
  const movies = await moviesApi.getMoviesList("/top_rated");
  console.log(movies);
  res.render("movieViews/index", {
    currRouteData: res.locals.movieRoutes.topRated,
    movies,
  });
};

exports.renderMoviesUpcoming = async (req, res) => {
  const movies = await moviesApi.getMoviesList("/upcoming");
  console.log(movies);
  res.render("movieViews/index", {
    currRouteData: res.locals.movieRoutes.upcoming,
    movies,
  });
};

exports.renderMovie = async (req, res) => {
  const movie = await moviesApi.getMovie(`/${req.params.id}`);
  console.log(movie);
  res.render("movieViews/show", { currRouteData: null, movie });
};
