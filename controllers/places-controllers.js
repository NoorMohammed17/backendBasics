const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
    {
      id: "p1",
      name: "New York City",
      country: "United States",
      population: 8398748,
      famousLandmarks: ["Statue of Liberty", "Central Park", "Times Square"],
      creator: "u4",
    },
    {
      id: "p2",
      name: "Paris",
      country: "France",
      population: 2140526,
      famousLandmarks: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
      creator: "u1",
    },
    {
      id: "p3",
      name: "Tokyo",
      country: "Japan",
      population: 13929286,
      famousLandmarks: ["Tokyo Tower", "Asakusa Temple", "Shibuya Crossing"],
      creator: "u2",
    },
    {
      id: "p4",
      name: "Sydney",
      country: "Australia",
      population: 5312163,
      famousLandmarks: [
        "Sydney Opera House",
        "Sydney Harbour Bridge",
        "Bondi Beach",
      ],
      creator: "u3",
    },
  ];

  const getPlaceById = (req, res, next) => {
    // console.log('GET REquest in Places routes');
    // res.json({message:'It works!'})
  
    const placeId = req.params.pid; // {pid : 'p1'}

    const place = DUMMY_PLACES.find((p) => {
      return p.id === placeId;
    });
  
    if(!place){
      throw new HttpError('Could not find a place for the provided id.', 404)
    }
    res.json({ place: place });
  }

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
  
    const place = DUMMY_PLACES.find((p) => {
      return p.creator === userId;
    });
    if(!place){
       return next (new HttpError('Could not find a place for the provided user id.', 404))
    }
    res.json({ creator: place });
  }

  exports.getPlaceById = getPlaceById ; // here we need to just point to funtion and express will execute on behalf of us

  exports.getPlaceByUserId = getPlaceByUserId;