const express = require('express');
const { 
    getAllActor, 
    getActorById, 
    createActor,
    updateActorPatch,
    deleteActor, 
} = require('../controllers/actor.controller');

const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/', getAllActor);

router.get('/:id', getActorById);

router.post('/', upload.single('pictureProfile'), createActor)

router.patch('/:id', updateActorPatch);

router.delete('/:id', deleteActor)

module.exports = { actorsRouter: router };