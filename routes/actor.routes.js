const express = require('express');
const { 
    getAllActor, 
    getActorById, 
    createActor,
    updateActorPatch,
    deleteActor, 
} = require('../controllers/actor.controller');

const router = express.Router();

router.get('/', getAllActor);

router.get('/:id', getActorById);

router.post('/', createActor);

router.patch('/:id', updateActorPatch);

router.delete('/:id', deleteActor)

module.exports = { actorsRouter: router };