// Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.actorExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' },
    include: [{ model: Movie }]
  });

  if (!actor) {
    return next(new AppError(404, 'Actor not found with given id'));
  }

  req.actor = actor;
  next();
});