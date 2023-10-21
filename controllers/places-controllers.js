const { validationResult } = require("express-validator");
//const uuid = require("uuid").v4; //v4 here represents version

const HttpError = require("../models/http-error");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "1",
    title: "Taj Mahal",
    description: "The iconic white marble mausoleum",
    address:
      "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India",
    location: {
      lat: 27.175,
      long: 78.0422,
    },
    creator: {
      id: "101",
      name: "John Doe",
    },
  },
  {
    id: "2",
    title: "Jaipur Palace",
    description: "Historic royal palace in Jaipur",
    address: "Jal Mahal, Amer, Jaipur, Rajasthan 302002, India",
    location: {
      lat: 26.9855,
      long: 75.8513,
    },
    creator: {
      id: "102",
      name: "Jane Smith",
    },
  },
  {
    id: "3",
    title: "Gateway of India",
    description: "Historical monument in Mumbai",
    address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
    location: {
      lat: 18.9217,
      long: 72.8347,
    },
    creator: {
      id: "103",
      name: "Alice Johnson",
    },
  },
];

const getPlaces = (req, res, next) => {
  res.json({ places: DUMMY_PLACES });
};

const getPlaceById = async (req, res, next) => {
  // console.log('GET Request in Places routes');
  // res.json({message:'It works!'})
  const placeId = req.params.pid; // {pid : 'p1'} //params is added by express.js
  let place;
  //as per MongoDb code
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Somethingwent wrong, colud not find a place.",
      500
    );
    return next(error);
  }

  // as per the nodejs code
  // const place = DUMMY_PLACES.find((p) => {
  //   return p.id === placeId;
  // });
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  //as per node code
  // const places = DUMMY_PLACES.filter((p) => {
  //   return p.creator.id === userId;
  // });
  // if (!places || places.length === 0) {
  //   return next(
  //     new HttpError("Could not find a places for the provided user id.", 404)
  //   );
  // }
  //  res.json({ creatorVisitedPlaces: places });

  //as per mongoDb code
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later."
    );
    return next(error);
  }
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json({
    creatorVisitedPlaces: places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, address, coordinates, creator } = req.body;
  // const title = req.body.title;
  let createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
    creator,
  });

  try {
    await createdPlace.save();
    console.log(createdPlace);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true })});
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //if fields are empty
    console.log(errors);
    throw new HttpError("Invalid inputs passed, Please check your data", 422);
  }
  const { title, description } = req.body; //only changing the title and description here
  const placeId = req.params.pid; // to get the id

  //using Node.js code
  // const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // //here spread operator is used to not directly change the fileds
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  // updatedPlace.title = title;
  // updatedPlace.description = description;
  // DUMMY_PLACES[placeIndex] = updatedPlace;
  // res.status(200).json({ place: updatedPlace });

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not  update place",
      500
    );
    return next(error);
  }
  updatedPlace.title = title;
  updatedPlace.description = description;
  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not  update place",
      500
    );
    return next(error);
  }
  res.status(200).json( {updatedPlace: updatedPlace.toObject({ getters: true })});
};

const deletePlace = async(req, res, next) => {
  const placeId = req.params.pid;

  //using Node .js code
  // if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
  //   throw new HttpError("Could not find a place for that id.", 404);
  // }
  // DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  // res.status(200).json({ message: `Deleted place with id ${placeId}` });


  //using Mongodb code
  let place;
  try{
    place= await Place.findById(placeId);
  }
  catch(err){
    const error = new HttpError(
      "Something went wrong, could not  delete place",
      500
    );
    return next(error);
  }
  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not  delete place",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: `Deleted place with id ${placeId}` });

};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById; // here we need to just point to funtion and express will execute on behalf of us
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
