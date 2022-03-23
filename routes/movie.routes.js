const express = require('express');
const { 
    getAllMovies, 
    getMovieById, 
    createMovie, 
    updateMoviePatch,
    deleteMovie
} = require('../controllers/movie.controller');

const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', upload.single('postImg'), createMovie);

router.patch('/:id', updateMoviePatch);

router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };