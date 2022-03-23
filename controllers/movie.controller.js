const { ref, uploadBytes } = require('firebase/storage');

//Models
const { Movie } = require('../models/movie.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

exports.getAllMovies = catchAsync(async (req, res, next) => {

  const db = getDatabase();
  const ref = db.ref('server/saving-data/fireblog/posts');
  //const ref = db.ref('server/saving-data/fireblog/posts');

  ref.on('value', (snapshot) => {
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
  
  const movies = await Movie.findAll({
    where: { status: 'active' }
  });

  if (movies.length === 0) {
    return next(new AppError(404, 'There are not movies until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      movies
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

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre} =
    req.body;

  if (
    !title ||
    !description ||
    !duration ||
    !rating ||  
    !genre   
  ) {
    return next(
      new AppError(400, 'Must provide a valid title, description')
    );
  }

  // Upload img to Cloud Storage (Firebase)
  const imgRef = ref(storage, `imgs/${Date.now()}-${req.file.originalname}`);

  const result = await uploadBytes(imgRef, req.file.buffer);

  const movie = await Movie.create({
    title: title,
    description: description,
    duration: duration,
    rating: rating,
    imgUrl: result.metadata.fullPath,
    genre: genre,
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
