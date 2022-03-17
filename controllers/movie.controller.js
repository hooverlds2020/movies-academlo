const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movie = await Movie.findAll({
    where: { status: 'active' }
  });

  if (movie.length === 0) {
    res.status(400).json({
      status: 'error',
      message: 'There are not users until'
    });
    return;
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
    res.status(404).json({
      status: 'error',
      message: `The id ${id} selected was not found`
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createMovie = catchAsync(async (req, res) => {
  const { title, description, duration, rating, img, genre } = req.body;

  if (!title || !description || !duration || !rating || !img || !genre) {
    return next(
      new AppError(400, 'Must provide a valid name, email and password')
    );
  }

  const movie = await User.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    img: img,
    genre: genre
  });

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});
