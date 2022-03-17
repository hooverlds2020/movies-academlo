const express = require('express');

const { 
    getAllActorinmovie, 
    getActorinmovieById, 
    createActorinmovie 
} = require('../controllers/actorinmovie.controller');

const router = express.Router();

router.get('/', getAllActorinmovie);

router.get('/:id', getActorinmovieById);

router.post('/', createActorinmovie);

module.exports = { actorinmoviesRouter: router };