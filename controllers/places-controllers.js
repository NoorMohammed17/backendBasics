const {validationResult} = require('express-validator')
const uuid = require("uuid").v4; //v4 here represents version

const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  // console.log('GET Request in Places routes');
  // res.json({message:'It works!'})
  const placeId = req.params.pid; // {pid : 'p1'} //params is added by express.js
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place: place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator.id === userId;
  });
  if (!places) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }
  res.json({ creatorVisitedPlaces: places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //if fields are empty
    console.log(errors);
    throw new HttpError('Invalid inputs passed, Please check your data',422)
  }
  const { title, address, coordinates, description, creator } = req.body;
  //in req.body we have the objects
  //title=req.body.title (the above is de-structured)
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ newplace: createdPlace }); //201 status code whenever we created new one.
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //if fields are empty
    console.log(errors);
    throw new HttpError('Invalid inputs passed, Please check your data',422)
  }
  const { title, description } = req.body; //only changing the title and description here
  const placeId = req.params.pid; // to get the id
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  //here spread operator is used to not directly change the fileds
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if(!DUMMY_PLACES.find(p => p.id === placeId)){
    throw new HttpError('Could not find a place for that id.',404)
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: `Deleted place with id ${placeId}` });
};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById; // here we need to just point to funtion and express will execute on behalf of us
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
