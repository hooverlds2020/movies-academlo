const express = require('express');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserPatch,
  deleteUser,
  loginUser,
  checkToken
} = require('../controllers/user.controller');

// Middlewares
const {
  validateSession,
  protectAdmin
} = require('../middlewares/auth.middleware');

const {
  userExists,
  protectAccountOwner
} = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', createUser).post('/login', loginUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers).get('/check-token', checkToken);

router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUserPatch)
  .delete(deleteUser);

module.exports = { usersRouter: router };
