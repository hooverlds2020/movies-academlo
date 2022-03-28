const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }],
   
  });

  // Promise[]
  const moviesPromises = movies.map(
    async ({
      id,
      title,
      description,
      duration,
      rating,
      imgUrl,
      genre,
      createdAt,
      updatedAt,
      actors,
      reviews
    }) => {
      const imgRef = ref(storage, imgUrl);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        title,
        description,
        duration,
        rating,
        imgUrl: imgDownloadUrl,
        genre,
        createdAt,
        updatedAt,
        actors, 
        reviews
      };
    }
  );

  const resolvedMovies = await Promise.all(moviesPromises);

  res.status(201).json({
    status: 'success',
    data: {
      movies: resolvedMovies
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre } = req.body;

  // Upload img to firebase
  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    imgUrl: imgUploaded.metadata.fullPath,
    genre
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    // Assign actors to newly created movie
    return await ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(201).json({
    status: 'success',
    data: {
      newMovie
    }
  });
});

exports.updateMoviePatch = catchAsync(async (req, res, next) => {
  const { movie } = req;

  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'imgUrl',
    'genre'
  );

  await movie.update({ ...data });

  res.status(204).json({ status: 'success' });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { movie } = req;

  // Soft delete
  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
