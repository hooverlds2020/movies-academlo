const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' }
  });

  if (users.length === 0) {
    return next(new AppError(404, 'There are not users until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return next(
      new AppError(
        400,
        'Must provide a valid username, email, password and role'
      )
    );
  }

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(
    password,
    salt
  );

  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role
  });

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateUserPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(
    req.body,
    'username',
    'email',
    'password',
    'role'    
  ); // { title } | { title, author } | { content }

  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'Cant update user, invalid ID'));
  }

  await user.update({ ...data }); // .update({ title, author })

  res.status(204).json({ status: 'success' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id: id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'Cant delete user, invalid ID'));
  }

  // Soft delete
  await user.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user given an email and has status active
  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  // Compare entered password vs hashed password
  if (
    !user ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return next(
      new AppError(400, 'Credentials are invalid')
    );
  }

  // Create JWT
  const token = await jwt.sign(
    { id: user.id }, // Token payload
    process.env.JWT_SECRET, // Secret key
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});

