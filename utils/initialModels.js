// Models
const { User } = require('../models/user.model');


const initModels = () => {
  // 1 User <----> M Post
  User.hasMany(Reviews);
  Reviews.belongsTo(User);  
};

module.exports = { initModels };