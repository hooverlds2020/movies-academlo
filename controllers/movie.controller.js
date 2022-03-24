const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

exports.getAllMovies = catchAsync(async (req, res, next) => {

  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [
      {
      model: Actor,      
      }       
    ]
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
        actors
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
        };
      }
    );
  
    const resolvedMovies = await Promise.all(moviesPromises);

    

  if (movies.length === 0) {
    return next(new AppError(404, 'There are not movies until'));
  }

  res.status(201).json({
    status: 'success',
    data: {
      movies: resolvedMovies
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id: id, status: 'active' },
    include: [{
      model: Actor
    }]
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

if(("admin") === req.currentUser.role){
  
  const { title, description, duration, rating, genre} =
    req.body;

  if (
    !title||
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
    userId: req.currentUser.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      movie
    }
  });
  }else (
    res.status(404).json({
      status: 'error',
      message: 'The user is not define for add movies'
    })
  )
});

exports.updateMoviePatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'imgUrl',
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
