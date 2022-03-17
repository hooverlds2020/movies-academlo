const express = require('express');
const { 
    getAllReviews, 
    getReviewById, 
    createReview 
} = require('../controllers/review.controller');


const router = express.Router();

router.get('/', getAllReviews);

router.get('/:id', getReviewById);

router.post('/', createReview);

module.exports = { reviewsRouter: router };