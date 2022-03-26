const express = require('express');

// Controllers
// import { getAllMovies } from '../controllers/movies.controller'
const { 
    getAllMovies, 
    getMovieById, 
    createMovie, 
    updateMoviePatch,
    deleteMovie
} = require('../controllers/movie.controller');

// Middlewares
const { validateSession, protectAdmin } = require('../middlewares/auth.middleware');
const { movieExists } = require('../middlewares/movie.middleware');

//Utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.use(validateSession)

router
    .get('/', getAllMovies)
    .post('/', protectAdmin, upload.single('imgUrl'), createMovie)

router
    .use('/:id', movieExists)
    .route('/:id').get(getMovieById)
    .patch(updateMoviePatch)
    .delete(deleteMovie)

module.exports = { moviesRouter: router };
