// Models
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');


const initModels = () => {
  // 1 User <----> M Post
  User.hasMany(Review);
  Review.belongsTo(User);
  
  Movie.hasMany(Actor)
  Actor.belongsTo(Movie)
};

module.exports = { initModels };