const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllReviews =  catchAsync(async (req, res, next) => {
  
    const reviews = await Review.findAll({
      where: { status: 'active' }
    });

    if (reviews.length === 0) {
      return next(new AppError(404, 'There are not reviews until'));
    }

    res.status(201).json({
      status: 'success',
      data: {
        review
      }
    });
  }) 

exports.getReviewById = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const review = await Review.findOne({
      where: { id: id, status: 'active' }
    });

    if (!review) {
      return next(new AppError(404, `The id ${id} selected was not found`));
    }

    res.status(200).json({
      status: 'success',
      data: {
        review
      }
    });
  }) 

exports.createReview = catchAsync(async (req, res, next) => {
    const { title, comment, rating, userId, movieId } = req.body;
    
    if (!title || !comment || !rating || !userId || !movieId) {
      return next(
        new AppError(
          400,
          'Must provide a valid name, email and password'
        )
      );
    }
    const review = await Review.create({
      title: title,
      comment: comment,
      rating: rating,
      userId: userId,
      movieId: movieId
    });

    res.status(200).json({
      status: 'success',
      data: {
        review
      }
    });
  }) 
