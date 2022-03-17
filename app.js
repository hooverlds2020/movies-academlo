const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller')

//Routes
const { usersRouter } = require('./routes/user.routes');
const { reviewsRouter } = require('./routes/review.routes');
const { moviesRouter } = require('./routes/movie.routes')
const { actorinmoviesRouter } = require('./routes/actorinmovie.routes');
const { actorsRouter } = require('./routes/actor.routes');

// Utils
const { AppError } = require('./utils/appError');

//init server
const app = express();

//import json
app.use(express.json());

//endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/actorinmovies', actorinmoviesRouter)
app.use('/api/v1/actors', actorsRouter)

app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
  });

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };
