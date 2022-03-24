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
    validateSession
  } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', createUser);

router.post('/login', loginUser)

router.use( validateSession )

router.get('/', getAllUsers);

router.get('/check-token', checkToken);

router.get('/:id', getUserById);

router.patch('/:id', updateUserPatch);

router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
