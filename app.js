const express = require("express"); //express here is function
const bodyParser = require("body-parser"); //middleware for parsing

const placesRoutes = require("./routes/places-routes"); //imported from routes folder

const app = express();

app.use("/api/places", placesRoutes); // => /api/places...

app.use((error, req, res, next) => {
  // this special middleware with 4 arguments runs only when had an error
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message:error.message || "A unkonwn error occurred!"})
});

app.listen(5000); //using port 5000 
