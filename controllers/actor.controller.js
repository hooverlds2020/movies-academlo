const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

exports.getAllActor = catchAsync(async (req, res) => {
  const actor = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movie, through: ActorInMovie }],
  });

  // Promise[]
const actorsPromises = actor.map(
    async ({
      id,
      name,
      country,
      rating,
      profilePic,
      age,
      createdAt,
      updatedAt,
      movies
    }) => {
      const imgRef = ref(storage, profilePic);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        name,
        country,
        rating,
        profilePic: imgDownloadUrl,
        age,
        createdAt,
        updatedAt,
        movies
      };
    }
  );

  const resolvedActors = await Promise.all(actorsPromises);

  res.status(201).json({
    status: 'success',
    data: {
      actor: resolvedActors
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { actor } = req;

  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age } = req.body;

  // Upload img to firebase
  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name: name,
    country: country,
    rating: rating,
    age: age,
    profilePic: imgUploaded.metadata.fullPath
  });

  res.status(200).json({
    status: 'success',
    data: {
      newActor
    }
  });
});

exports.updateActorPatch = catchAsync(async (req, res, next) => {
  const { actor } = req;

  const data = filterObj(req.body, 'name', 'country', 'rating', 'age');

  await actor.update({ ...data }); // .update({ title, author })

  res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  // Soft delete
  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
