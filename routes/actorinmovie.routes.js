const express = require('express');

const { 
    getAllActorInMovie, 
    getActorInMovieById, 
    createActorInMovie 
} = require('../controllers/actorinmovie.controller');

const router = express.Router();

router.get('/', getAllActorInMovie);

router.get('/:id', getActorInMovieById);

router.post('/', createActorInMovie);

module.exports = { actorinmoviesRouter: router };