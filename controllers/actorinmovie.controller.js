const { ActorInMovie } = require('../models/actorinmovie.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllActorInMovie = catchAsync(async (req, res, next) => {
    const actorInMovie = await ActorInMovie.findAll({
      // where: { status: 'active' }
    });

    if (actorInMovie.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'There are not users until'
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      data: {
        actorInMovie
      }
    });
  }) 

exports.getActorInMovieById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const actorInMovie = await ActorInMovie.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actorInMovie) {
      res.status(404).json({
        status: 'error',
        message: `The id ${id} selected was not found`
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        actorInMovie
      }
    });
  }) 

exports.createActorInMovie = catchAsync(async (req, res, next) => {
    const { actorId, movieId } = req.body;

    if (!actorId || !movieId) {
      return next(
        new AppError(
          400,
          'Must provide a valid name, email and password'
        )
      );
    }

    const actorInMovie = await ActorInMovie.create({
      actorId: actorId,
      movieId: movieId
    });

    res.status(200).json({
      status: 'success',
      data: {
        actorInMovie
      }
    });
  }) 