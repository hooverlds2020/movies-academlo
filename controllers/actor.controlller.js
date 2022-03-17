const { Actor } = require('../models/actor.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllActor = catchAsync(async (req, res) => {
    const actor = await Actor.findAll({
      where: { status: 'active' }
    });

    if (actor.length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'There are not actors until'
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      data: {
        actor
      }
    });
  }) 

exports.getActorById = catchAsync( async (req, res, next) => {
    const { id } = req.params;
    const actor = await Actor.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: `The id ${id} selected was not found`
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        actor
      }
    });
  })

exports.createActor = catchAsync(async (req, res, next) => {
    const { name, country, rating, age, profilePic } = req.body;

    if (!name || !country || !rating || !age || !profilePic) {
      return next(
        new AppError(
          400,
          'Must provide a valid name, email and password'
        )
      );
    }

    const actor = await Actor.create({
      name: name,
      country: country,
      rating: rating,
      age: age,
      profilePic: profilePic,
    })

    res.status(200).json({
      status: 'success',
      data: {
        actor
      }
    });
  }) 

  exports.patchActor = catchAsync(async(req, res, next) =>{
    
  })

  exports.deleteActor = catchAsync(async(req, res, next) =>{
    
  })