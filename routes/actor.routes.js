const express = require('express');
const { body } = require('express-validator');

const {
  getAllActor,
  getActorById,
  createActor,
  updateActorPatch,
  deleteActor,

} = require('../controllers/actor.controller');

const { actorExists } = require('../middlewares/actor.middleware');
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');

const { upload } = require('../utils/multer');

const router = express.Router();

router.use(validateSession);

router
  .get('/', getAllActor)
  .get('/:id', actorExists, getActorById)
  .post('/', protectAdmin, upload.single('pictureProfile'), createActor);

router
  .use('/:id', protectAdmin, actorExists)
  .route('/:id')
  .patch(protectAdmin, updateActorPatch)
  .delete(protectAdmin, deleteActor);

module.exports = { actorsRouter: router };
