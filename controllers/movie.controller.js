const { Movie } = require('../models/movie.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' }
  });

  if (movies.length === 0) {
    return next(new AppError(404, 'There are not users until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createMovie = catchAsync(async (req, res) => {
  const { title, description, duration, rating, img, genre, userId, movieId } =
    req.body;

  if (
    !title ||
    !description ||
    !duration ||
    !rating ||
    !img ||
    !genre ||
    !userId ||
    !movieId
  ) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  const movie = await Movie.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    img: img,
    genre: genre,
    userId: userId,
    movieId: movieId
  });

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.updateMoviePatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'img',
    'genre'
  ); // { title } | { title, author } | { content }

  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'Cant update movie, invalid ID'));
  }

  await movie.update({ ...data }); // .update({ title, author })

  res.status(204).json({ status: 'success' });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id: id, status: 'active' }
  });

  if (!movie) {
    return next(new AppError(404, 'Cant delete movie, invalid ID'));
  }

  // Soft delete
  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
