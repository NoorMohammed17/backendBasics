const express = require("express");
const placeControllers = require("../controllers/places-controllers");

const router = express.Router();
// Router method with a capital R which exists on the imported Express object.
// This gives us a special object on which we can also register middleware which is filtered by HTTP method
// in path but the interesting thing is that we then can export our configured router by the end of this
// file and import it in app.js and register this entire configured router as one single middleware in app.js

router.get("/", placeControllers.getPlaces)

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.post('/',placeControllers.createPlace);

router.patch('/:pid',placeControllers.updatePlace);

router.delete("/:pid",placeControllers.deletePlace)

module.exports = router;
