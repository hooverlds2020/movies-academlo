//Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' }
  });

  if (users.length === 0) {
    return next(new AppError(404, 'There are not users until'));
  }

  // if (users.length === 0) {
  //   res.status(400).json({
  //     status: 'error',
  //     message: 'There are not users until'
  //   });
  //   return;
  // }

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

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: `The id ${id} selected was not found`
    });
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
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role
  });

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
