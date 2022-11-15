const mongoose = require("mongoose");
const Schema = mongoose.Schema;

["id", "adult", "poster_path", "homepage", "title", "overview", "release_date", "vote_average"];

const movieSchema = new Schema({
    _id: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    adult: {
        type: Boolean,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    homepage: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    vote_average: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("Movie", movieSchema);

