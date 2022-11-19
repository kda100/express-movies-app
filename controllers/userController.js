const User = require("../models/user");
const moviesApi = require("../services/moviesApi");

exports.renderRegisterForm = async (req, res) => {
  res.render("userViews/register", {
    currRouteData: res.locals.userRoutes.register,
  });
};

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Registration successful");
      res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect(res.locals.userRoutes.register.pageRoute);
  }
};

exports.renderLoginForm = async (req, res) => {
  res.render("userViews/login", { currRouteData: res.locals.userRoutes.login });
};

exports.login = async (req, res) => {
  req.flash("success", "Login successful");
  res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
};

exports.logout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout successful");
    res.redirect(res.locals.movieRoutes.nowPlaying.pageRoute);
  });
};

exports.renderAccountDetails = async (req, res) => {
  res.render("userViews/account", {
    currRouteData: res.locals.userRoutes.account,
  });
};

exports.toggleFavourite = async (req, res) => {
  const favouriteMovies = req.user.favouriteMovies;
  const movieId = req.body.id;
  favouriteMovies.indexOf(movieId) === -1
    ? favouriteMovies.push(movieId)
    : favouriteMovies.remove(movieId);
  await req.user.save();
  console.log(req.user);
  res.redirect(`/movies/${req.body.id}`);
};

exports.renderFavourites = async (req, res) => {
  const movies = [];
  const favouriteMoviesIds = req.user.favouriteMovies;
  for (let i = 0; i < favouriteMoviesIds.length; i++) {
    const movieId = favouriteMoviesIds[i];
    const movie = await moviesApi.getFavouriteMovie(`/${movieId}`);
    movies.push(movie);
  }
  res.render("movieViews/index", {
    currRouteData: res.locals.userRoutes.favourites,
    movies,
  });
};
