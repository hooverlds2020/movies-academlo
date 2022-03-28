// Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.movieExists = catchAsync(async (req, res, next) => {
  const movie = await Movie.findOne({
    attributes: { exclude: ['password'] },
    where: { status: 'active' },
    include: [{ model: Actor }]
  });

  if (!movie) {
    return next(new AppError(404, 'Movie not found with given id'));
  }

  req.movie = movie;
  next();
});
