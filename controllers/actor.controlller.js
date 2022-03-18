const { Actor } = require('../models/actor.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllActor = catchAsync(async (req, res) => {
  const actor = await Actor.findAll({
    where: { status: 'active' }
  });

  if (!actor.length === 0) {
    return next(new AppError(404, 'There are not actors until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, '`The id ${id} selected was not found`'));
  }

res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age, profilePic } = req.body;

  if (!name || !country || !rating || !age || !profilePic) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  const actor = await Actor.create({
    name: name,
    country: country,
    rating: rating,
    age: age,
    profilePic: profilePic
  });

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.updateActorPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(
    req.body,
    'name',
    'country',
    'rating',
    'age',
    'profilePic'
  ); // { title } | { title, author } | { content }

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, 'Cant update actor, invalid ID'));
  }

  await actor.update({ ...data }); // .update({ title, author })

  res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id: id, status: 'active' }
  });

  if (!actor) {
    return next(new AppError(404, 'Cant delete actor, invalid ID'));
  }

  // Soft delete
  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
