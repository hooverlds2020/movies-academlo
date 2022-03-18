const express = require('express');

const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUserPatch,
    deleteUser,
    loginUser
 } = require('../controllers/user.controller');

// Middlewares
const {
    validateSession
  } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', createUser);

router.patch('/:id', validateSession, updateUserPatch);

router.delete('/:id', validateSession, deleteUser);

router.post('/login', loginUser)

module.exports = { usersRouter: router };
