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
const { validateSession } = require('../middlewares/auth.middleware');

//Utils
const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/', getAllMovies);

// GET http://localhost:4000/movies/:id
router.get('/:id', getMovieById);

// POST http://localhost:4000/movies
router.post('/', upload.single('imgUrl'), validateSession, createMovie);

// PATCH http://localhost:4000/movies/:id
router.patch('/:id', updateMoviePatch);

// DELETE http://localhost:4000/movies/:id
router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
// module.exports = router // export default router