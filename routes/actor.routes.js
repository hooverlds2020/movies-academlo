const express = require('express');
const { body } = require('express-validator')

const { 
    getAllActor, 
    getActorById, 
    createActor,
    updateActorPatch,
    deleteActor, 
} = require('../controllers/actor.controller');

const { actorExists } = require('../middlewares/actor.middleware');
const { validateSession } = require('../middlewares/auth.middleware');

const { upload } = require('../utils/multer');

const router = express.Router()

router.use(validateSession)

router
    .get('/', getAllActor)
    .post('/', upload.single('pictureProfile'), 
    [
        body('name').isString().notEmpty(),
        body('country').isString().notEmpty(),
        body('rating')
        .isNumeric()
        .custom((value) => value > 0 && value <= 5),
        body('age')
        .isNumeric()
        .custom((value) => value > 0)
    ],
    createActor)


router
    .use('/:id', actorExists)
    .route('/:id')
    .get(getActorById)
    .patch(updateActorPatch)
    .delete(deleteActor)

module.exports = { actorsRouter: router };