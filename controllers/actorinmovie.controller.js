const { Actorinmovie } = require('../models/actorinmovie.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllActorinmovie = catchAsync(async (req, res, next) => {
    const actorinmovie = await Actorinmovie.findAll({
      // where: { status: 'active' }
    });

    if (actorinmovie.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'There are not users until'
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      data: {
        actorinmovie
      }
    });
  }) 

exports.getActorinmovieById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const actorinmovie = await Actorinmovie.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actorinmovie) {
      res.status(404).json({
        status: 'error',
        message: `The id ${id} selected was not found`
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        actorinmovie
      }
    });
  }) 

exports.createActorinmovie = catchAsync(async (req, res, next) => {
    const { actorId, movieId } = req.body;

    if (!actorId || !movieId) {
      return next(
        new AppError(
          400,
          'Must provide a valid name, email and password'
        )
      );
    }

    const actorinmovie = await Actorinmovie.create({
      actorId: actorId,
      movieId: movieId
    });

    res.status(200).json({
      status: 'success',
      data: {
        actorinmovie
      }
    });
  }) 