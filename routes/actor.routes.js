const express = require('express');
const { 
    getAllActor, 
    getActorById, 
    createActor,
    patchActor,
    deleteActor, 
} = require('../controllers/actor.controlller');

const router = express.Router();

router.get('/', getAllActor);

router.get('/:id', getActorById);

router.post('/', createActor);

router.patch('/:id', patchActor);

router.delete('/:id', deleteActor)

module.exports = { actorsRouter: router };